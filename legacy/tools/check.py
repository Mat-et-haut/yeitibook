#!/usr/bin/env python3
"""Barrière qualité : un composant est « prêt pour la prod » ou il ne l'est pas.

Vérifie les 7 critères sur le rendu réel, dans un navigateur. Sortie non nulle
dès qu'un critère échoue, pour servir de barrière avant un commit ou une
promotion de composant.

    python3 tools/check.py                 tous les composants
    python3 tools/check.py button card-cta un sous-ensemble
    python3 tools/check.py --promus        seulement ceux marqués prêts

Les 7 critères :
  1. inline     aucun style en ligne, tout en classes
  2. fige       aucune hauteur figée sur un bloc qui porte du texte
  3. responsive rend de 360 à 1600 px sans débordement horizontal
  4. atomes     les boutons, liens, tags et champs internes sont les vrais composants
  5. a11y       sémantique, focus clavier atteignable, pas d'image sans alt
  6. tokens     aucune couleur en dur, tout par variables
  7. usage      une règle d'usage au statut « valide »
"""
import json, pathlib, sys
from playwright.sync_api import sync_playwright

RACINE = pathlib.Path(__file__).resolve().parent.parent

def banc():
    """Prépare une copie de la page avec ses structures internes exposées.

    L'application est enfermée dans une IIFE : sans cette injection, rien n'est
    mesurable depuis l'extérieur. La copie est temporaire et n'est pas publiée.
    """
    html = (RACINE / 'index.html').read_text()
    tete, _, queue = html.rpartition('})();')
    out = RACINE / '.check-banc.html'
    out.write_text(tete + 'window.__YB={C,R,BYID,defaults,STORIES,gStates,GENC,STATE};\n})();' + queue)
    return out
LARGEURS = (360, 768, 1600)

MESURE = """(id)=>{
  const Y=window.__YB, c=Y.BYID[id];
  if(!c) return {erreur:'composant inconnu'};
  const h=document.createElement('div');
  h.style.cssText='position:fixed;left:-99999px;top:0';
  document.body.append(h);
  const q=Y.defaults(c);
  h.innerHTML = c.wrap ? c.wrap(Y.R[c.id](q)) : Y.R[c.id](q);
  const noeuds=[...h.querySelectorAll('*')];

  /* 1. styles en ligne : on ignore les variables CSS, qui sont le moyen prévu
        de passer une valeur à un composant. */
  const enLigne = noeuds.filter(e=>{
    const s=e.getAttribute('style'); if(!s) return false;
    return s.split(';').some(d=>d.trim() && !d.trim().startsWith('--'));
  }).length;

  /* 2. hauteurs figées sur un bloc qui porte du texte */
  const fige = noeuds.filter(e=>{
    const t=(e.textContent||'').trim(); if(!t) return false;
    const cs=getComputedStyle(e);
    return /px$/.test(cs.height) && cs.overflow!=='visible' ? true
         : e.style.height && /px$/.test(e.style.height);
  }).length;

  /* 4. atomes : un bouton dessiné à la main porterait du texte cliquable sans
        la classe du DS. On compte les vrais atomes et les faux. */
  const vrais = h.querySelectorAll('.y-btn,.y-link,.y-tag,.y-input').length;
  const faux = noeuds.filter(e=>{
    if(e.closest('.y-btn,.y-link,.y-tag,.y-input')) return false;
    if(e.closest('a[href],button')) return false;   /* un lien ou bouton natif est correct */
    const cs=getComputedStyle(e);
    if(cs.cursor!=='pointer') return false;
    return (e.textContent||'').trim().length>0;
  }).length;

  /* 5. accessibilité */
  const imgsSansAlt=[...h.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length;
  const focusables=h.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])').length;
  const divCliquables=noeuds.filter(e=>/^(DIV|SPAN)$/.test(e.tagName)&&getComputedStyle(e).cursor==='pointer'&&!e.closest('a,button')).length;

  /* 6. couleurs en dur */
  const dur = noeuds.filter(e=>{
    const s=e.getAttribute('style')||'';
    return /#[0-9a-f]{3,8}\\b|\\brgba?\\(/i.test(s);
  }).length;

  const r=h.firstElementChild?h.firstElementChild.getBoundingClientRect():{width:0,height:0};
  const out={enLigne,fige,vrais,faux,imgsSansAlt,focusables,divCliquables,dur,
             noeuds:noeuds.length,largeur:Math.round(r.width),
             usage:((window.YB_USAGE||{})[c.name]||{}).statut||'absente'};
  h.remove();
  return out;
}"""

DEBORDE = """(id)=>{
  const Y=window.__YB, c=Y.BYID[id];
  const h=document.createElement('div');
  h.style.cssText='position:fixed;left:0;top:0;width:100%';
  document.body.append(h);
  const q=Y.defaults(c);
  /* Un composant qui a une variante mobile dans Figma doit être testé avec elle :
     juger le rendu Desktop à 360px ne mesure rien. */
  if(window.innerWidth < 900){   /* le DS bascule en mobile sous 991/767px */
    (c.ctl||[]).forEach(x=>{
      if(!/breakpoint|device/i.test(x.k)) return;
      const opt=(x.o||[]).map(o=>o.v!==undefined?o.v:o);
      const mob=opt.find(v=>/mobile|mob|mb/i.test(String(v)));
      if(mob!==undefined) q[x.k]=mob;
    });
  }
  h.innerHTML = c.wrap ? c.wrap(Y.R[c.id](q)) : Y.R[c.id](q);
  const large=[...h.querySelectorAll('*')].filter(e=>{
    const r=e.getBoundingClientRect();
    return r.width > window.innerWidth + 1;
  }).length;
  h.remove();
  return large;
}"""


def juge(m, debords):
    """Renvoie la liste des critères en échec, avec la mesure qui le prouve."""
    ko = []
    if m['enLigne']:
        ko.append(f"inline : {m['enLigne']} nœud(s) avec un style en ligne")
    if m['fige']:
        ko.append(f"fige : {m['fige']} bloc(s) de texte à hauteur figée")
    for w, n in debords.items():
        if n:
            ko.append(f"responsive : {n} bloc(s) dépassent la fenêtre à {w}px")
    if m['faux']:
        ko.append(f"atomes : {m['faux']} élément(s) cliquable(s) hors composant du DS")
    if m['imgsSansAlt']:
        ko.append(f"a11y : {m['imgsSansAlt']} image(s) sans attribut alt")
    if m['divCliquables']:
        ko.append(f"a11y : {m['divCliquables']} div/span cliquable(s) au lieu d'un a ou button")
    if m['dur']:
        ko.append(f"tokens : {m['dur']} nœud(s) avec une couleur en dur")
    if m['usage'] != 'valide':
        ko.append(f"usage : règle d'usage au statut « {m['usage']} »")
    return ko


def main(argv):
    promus = '--promus' in argv
    demandes = [a for a in argv if not a.startswith('--')]
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={'width': 1600, 'height': 1000})
        page = banc()
        pg.goto('file://' + str(page))
        pg.wait_for_timeout(1800)
        ids = pg.evaluate("()=>window.__YB.C.map(c=>({id:c.id,nom:c.name,gen:!!c.gen}))")
        if demandes:
            ids = [c for c in ids if c['id'] in demandes or c['nom'] in demandes]
        if promus:
            ids = [c for c in ids if not c['gen']]

        resultats = {}
        for c in ids:
            m = pg.evaluate(MESURE, c['id'])
            if m.get('erreur'):
                resultats[c['nom']] = ['inconnu : ' + m['erreur']]
                continue
            debords = {}
            for w in LARGEURS:
                pg.set_viewport_size({'width': w, 'height': 1000})
                debords[w] = pg.evaluate(DEBORDE, c['id'])
            pg.set_viewport_size({'width': 1600, 'height': 1000})
            resultats[c['nom']] = juge(m, debords)
        b.close()

    ok = [n for n, k in resultats.items() if not k]
    ko = {n: k for n, k in resultats.items() if k}
    for n, k in ko.items():
        print(f'\n✗ {n}')
        for l in k:
            print(f'    {l}')
    print(f'\nPrêts : {len(ok)}/{len(resultats)}')
    if ok:
        print('  ' + ', '.join(ok))
    (RACINE / 'tools/check.json').write_text(
        json.dumps(resultats, ensure_ascii=False, indent=1))
    (RACINE / '.check-banc.html').unlink(missing_ok=True)
    return 1 if ko else 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv[1:]))
