# Design system Yeita

Le code du design system Yeita, organisé de bas en haut : chaque niveau n'utilise que ceux du dessous.

| Niveau | Où | État |
|---|---|---|
| Tokens (couleurs, espacements, tailles…) | `packages/tokens` | `tokens.css` historique, converti au format DTCG au lot 4 |
| Fondations (styles de texte, focus, mouvements) | `packages/css` | lot 5 |
| Atomes (bouton, lien, tag, champ…) | `packages/css` et `packages/react` | lot 6 |
| Molécules (bloc auteur, liste d'infos, prix…) | `packages/css` et `packages/react` | lot 7 |
| Documentation (Storybook) | `apps/docs` | en place |

En attendant, `packages/css/src/legacy-components.css` reprend tel quel le CSS du Yeitibook. Il disparaît au fur et à mesure que les niveaux le remplacent.

## Le Yeitibook figé

L'ancien Yeitibook, généré depuis Figma, est rangé dans `legacy/` et ne bouge plus. La version en ligne
(https://mat-et-haut.github.io/yeitibook/, outil Covers compris) est servie depuis la branche `yeitibook-fige`,
repérée par le tag `yeitibook-final`.

## Commandes

Prérequis : Node 22 ou plus récent, et pnpm.

```
pnpm install       installe les dépendances
pnpm storybook     ouvre la documentation sur http://localhost:6006
pnpm build         construit la documentation dans apps/docs/dist
pnpm typecheck     vérifie le code TypeScript
pnpm test          passe la barrière qualité (après pnpm build)
pnpm verifier      enchaîne les trois
```

## Barrière qualité

`pnpm test` vérifie, sur les vrais fichiers :

1. **Aucune valeur brute hors des tokens** : couleurs, longueurs et durées passent par `var(--y-…)` (`tests/regles/valeurs-brutes.ts`).
2. **Les dépendances ne remontent jamais** : un niveau n'utilise que les niveaux du dessous, en CSS comme en React (`tests/regles/dependances.ts`). Le niveau d'un fichier est donné par son dossier : `packages/css/src/<niveau>/`, `packages/react/src/<niveau>/`.
3. **Chaque composant** (story d'un paquet) : pas de style en ligne, pas de texte coupé, pas d'élément cliquable hors composant du DS, images avec `alt`, pas de couleur en dur, pas de débordement à 360, 768 et 1600 px, et axe-core (WCAG 2.1 AA).

Chaque règle est d'abord testée sur des fautes écrites exprès, pour prouver qu'elle les détecte.

À chaque pull request, GitHub refait `install`, `typecheck` et `build` sur une machine neuve (`.github/workflows/ci.yml`).

## Licences

- Polices : SIL Open Font License 1.1 (`packages/css/fonts/OFL-*.txt`).
- Icônes : Phosphor Icons, MIT.
