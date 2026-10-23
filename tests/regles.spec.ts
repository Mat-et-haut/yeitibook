// Règles de niveau, vérifiées sur les vrais fichiers du DS.
// Chaque règle est d'abord testée sur des exemples fautifs écrits exprès :
// si le détecteur ne les voit pas, la règle ne protège rien.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { valeursBrutes } from './regles/valeurs-brutes';
import { remonteesCss, remonteesTs } from './regles/dependances';
import { EXEMPTS, fichiers, niveauDe } from './regles/niveaux';

const lire = (fs_: string[]) => Object.fromEntries(fs_.map((f) => [f, fs.readFileSync(f, 'utf8')]));

test.describe('Règle 1 : aucune valeur brute hors des tokens', () => {
  test('le détecteur voit les fautes écrites exprès', () => {
    const fautes = valeursBrutes(`
      .a{color:#ff0000}
      .b{padding:12px var(--y-padding-xl)}
      .c{transition:opacity .3s}
      .d{background:rgba(0,0,0,.5)}
      .e{--maison:8px}`);
    expect(fautes.map((f) => f.valeur)).toEqual(['#ff0000', '12px', '.3s', 'rgba(', '8px']);
  });

  test('le détecteur laisse passer ce qui est admis', () => {
    expect(valeursBrutes(`
      /* un commentaire avec #fff et 12px */
      .a{margin:0;padding:0px;width:100%;flex:1 1 0;font-weight:800;line-height:1.2}
      .b{grid-template-columns:1fr 1fr;color:var(--y-text-neutral-medium)}
      .c{background:url(img/12px.png)}
      @container carte (max-width:559px){.d{gap:var(--y-gap-md)}}
      .e:nth-child(2){opacity:.5}`)).toEqual([]);
  });

  const cibles = fichiers('packages', ['.css']).filter((f) => !f.startsWith('packages/tokens/') && !(f in EXEMPTS));
  test(`fichiers du DS (${cibles.length})`, () => {
    const fautes = cibles.flatMap((f) => valeursBrutes(fs.readFileSync(f, 'utf8')).map((v) => `${f}:${v.ligne}  ${v.valeur}  (${v.declaration})`));
    expect(fautes).toEqual([]);
  });

  test('tout fichier CSS hors niveau est exempté avec une raison', () => {
    const orphelins = fichiers('packages', ['.css']).filter((f) => !niveauDe(f) && !(f in EXEMPTS));
    expect(orphelins).toEqual([]);
  });
});

test.describe('Règle 2 : les dépendances ne remontent jamais', () => {
  test('le détecteur voit un atome qui utilise une molécule (CSS)', () => {
    const r = remonteesCss({
      'packages/css/src/atomes/bouton.css': '.y-btn{color:var(--y-x)} .y-auteur .y-btn{gap:0}',
      'packages/css/src/molecules/auteur.css': '.y-auteur{display:flex} .y-auteur .y-btn{margin:0}',
    });
    expect(r.map((x) => `${x.fichier} → ${x.utilise}`)).toEqual(['packages/css/src/atomes/bouton.css → .y-auteur']);
  });

  test('le détecteur voit un @import vers un niveau supérieur', () => {
    const r = remonteesCss({ 'packages/css/src/atomes/bouton.css': '@import "../molecules/auteur.css";' });
    expect(r.map((x) => x.niveauUtilise)).toEqual(['molecules']);
  });

  test('le détecteur voit un atome React qui importe une molécule', () => {
    const r = remonteesTs({ 'packages/react/src/atomes/Bouton.tsx': "import { Auteur } from '../molecules/Auteur';" });
    expect(r.map((x) => x.niveauUtilise)).toEqual(['molecules']);
  });

  test('une molécule peut utiliser un atome', () => {
    expect(remonteesTs({ 'packages/react/src/molecules/Auteur.tsx': "import { Bouton } from '../atomes/Bouton';" })).toEqual([]);
  });

  test('fichiers du DS', () => {
    const r = [
      ...remonteesCss(lire(fichiers('packages', ['.css']))),
      ...remonteesTs(lire(fichiers('packages', ['.ts', '.tsx']))),
    ].map((x) => `${x.fichier} (${x.niveau}) utilise ${x.utilise} (${x.niveauUtilise})`);
    expect(r).toEqual([]);
  });
});
