// Les niveaux du DS, du plus bas au plus haut. Chaque niveau n'utilise que les niveaux du dessous.
// Un fichier appartient à un niveau par son dossier :
//   packages/tokens/src/**              → tokens
//   packages/css/src/<niveau>/**        → <niveau>
//   packages/react/src/<niveau>/**      → <niveau>
import fs from 'node:fs';
import path from 'node:path';

export const NIVEAUX = ['tokens', 'fondations', 'atomes', 'molecules', 'organismes', 'sections'] as const;
export type Niveau = (typeof NIVEAUX)[number];
export const rang = (n: Niveau) => NIVEAUX.indexOf(n);

/** Fichiers hors niveaux, admis pour une raison écrite. La liste ne doit que rétrécir. */
export const EXEMPTS: Record<string, string> = {
  'packages/css/src/fonts.css': 'déclarations @font-face, sans valeur de design',
  'packages/css/src/index.css': 'point d\'entrée, ne contient que des @import',
  'packages/css/src/legacy-components.css': 'CSS historique du Yeitibook, remplacé niveau par niveau puis supprimé',
};

export function niveauDe(fichier: string): Niveau | null {
  const f = fichier.split(path.sep).join('/');
  if (f.startsWith('packages/tokens/')) return 'tokens';
  const m = f.match(/^packages\/(?:css|react)\/src\/([^/]+)\//);
  return m && (NIVEAUX as readonly string[]).includes(m[1]) ? (m[1] as Niveau) : null;
}

export function fichiers(dossier: string, extensions: string[]): string[] {
  if (!fs.existsSync(dossier)) return [];
  return fs.readdirSync(dossier, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && extensions.some((x) => e.name.endsWith(x)))
    .map((e) => path.relative(process.cwd(), path.join(e.parentPath, e.name)).split(path.sep).join('/'))
    .filter((f) => !f.includes('node_modules'));
}
