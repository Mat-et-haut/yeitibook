// Règle 1 : aucune valeur brute hors des tokens.
// Dans une déclaration CSS, une couleur, une longueur ou une durée doit venir d'une variable
// (var(--y-…)). Sont admis : 0, les pourcentages, les fractions de grille (1fr), les nombres
// sans unité (graisse, ratio), et les longueurs dans les conditions @media et @container,
// où le CSS n'accepte pas de variable.

export type Violation = { ligne: number; valeur: string; declaration: string };

const BRUT = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklch|oklab)\(|(?<![\w.-])(?:\d*\.)?\d+(?:px|rem|em|ms|s|vh|vw|vmin|vmax|ch|pt)\b/gi;

export function valeursBrutes(css: string): Violation[] {
  // On neutralise commentaires, url() et conditions d'at-rules en gardant les sauts de ligne,
  // pour que les numéros de ligne restent justes.
  const blanc = (m: string) => m.replace(/[^\n]/g, ' ');
  const propre = css
    .replace(/\/\*[\s\S]*?\*\//g, blanc)
    .replace(/url\([^)]*\)/g, blanc)
    .replace(/@(?:media|container|supports)[^{]*/g, blanc);
  const sortie: Violation[] = [];
  const decl = /([\w-]+)\s*:\s*([^;{}]+)/g;
  for (const d of propre.matchAll(decl)) {
    const valeur = d[2];
    for (const b of valeur.matchAll(BRUT)) {
      if (/^0+(?:\.0+)?[a-z]+$/i.test(b[0])) continue; // 0px, 0s : un zéro reste un zéro
      const index = d.index! + d[0].indexOf(valeur) + b.index!;
      sortie.push({ ligne: propre.slice(0, index).split('\n').length, valeur: b[0], declaration: `${d[1]}: ${valeur.trim()}` });
    }
  }
  return sortie;
}
