// Règle 2 : les dépendances ne remontent jamais.
// - CSS : une classe appartient au niveau du fichier qui la définit en premier dans un sélecteur.
//   Un fichier ne peut utiliser que des classes de son niveau ou des niveaux du dessous,
//   et ne peut importer (@import) qu'un fichier de même niveau ou d'un niveau inférieur.
// - TypeScript : un module ne peut importer qu'un module de même niveau ou d'un niveau inférieur.
import path from 'node:path';
import { NIVEAUX, niveauDe, rang, type Niveau } from './niveaux';

export type Remontee = { fichier: string; niveau: Niveau; utilise: string; niveauUtilise: Niveau };

const sansCommentaires = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const selecteurs = (css: string) => [...sansCommentaires(css).matchAll(/([^{}@;]+)\{/g)].map((m) => m[1]);
const classes = (selecteur: string) => [...selecteur.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]);

/** Classe → niveau propriétaire, d'après la première définition, en parcourant les niveaux du bas vers le haut. */
export function proprietaires(sources: Record<string, string>): Map<string, Niveau> {
  const carte = new Map<string, Niveau>();
  const tries = Object.keys(sources).filter((f) => niveauDe(f)).sort((a, b) => rang(niveauDe(a)!) - rang(niveauDe(b)!));
  for (const f of tries) {
    for (const s of selecteurs(sources[f])) {
      // La classe « propriétaire » d'un sélecteur est celle qui porte le style : la dernière du composé.
      const c = classes(s.split(/[\s>+~]+/).filter(Boolean).pop() ?? '');
      for (const x of c) if (!carte.has(x)) carte.set(x, niveauDe(f)!);
    }
  }
  return carte;
}

export function remonteesCss(sources: Record<string, string>): Remontee[] {
  const carte = proprietaires(sources);
  const sortie: Remontee[] = [];
  for (const [f, css] of Object.entries(sources)) {
    const n = niveauDe(f);
    if (!n) continue;
    const vues = new Set<string>();
    for (const s of selecteurs(css)) for (const c of classes(s)) {
      const p = carte.get(c);
      if (p && rang(p) > rang(n) && !vues.has(c)) { vues.add(c); sortie.push({ fichier: f, niveau: n, utilise: `.${c}`, niveauUtilise: p }); }
    }
    for (const m of sansCommentaires(css).matchAll(/@import\s+(?:url\()?["']([^"']+)["']/g)) {
      const cible = m[1].startsWith('.') ? path.posix.normalize(path.posix.join(path.posix.dirname(f), m[1])) : m[1];
      const p = niveauDe(cible);
      if (p && rang(p) > rang(n)) sortie.push({ fichier: f, niveau: n, utilise: m[1], niveauUtilise: p });
    }
  }
  return sortie;
}

export function remonteesTs(sources: Record<string, string>): Remontee[] {
  const sortie: Remontee[] = [];
  for (const [f, code] of Object.entries(sources)) {
    const n = niveauDe(f);
    if (!n) continue;
    for (const m of code.matchAll(/(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      const spec = m[1] ?? m[2];
      if (!spec.startsWith('.')) continue;
      const cible = path.posix.normalize(path.posix.join(path.posix.dirname(f), spec)) + '/';
      const p = niveauDe(cible);
      if (p && rang(p) > rang(n)) sortie.push({ fichier: f, niveau: n, utilise: spec, niveauUtilise: p });
    }
  }
  return sortie;
}

export { NIVEAUX };
