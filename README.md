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
```

À chaque pull request, GitHub refait `install`, `typecheck` et `build` sur une machine neuve (`.github/workflows/ci.yml`).

## Licences

- Polices : SIL Open Font License 1.1 (`packages/css/fonts/OFL-*.txt`).
- Icônes : Phosphor Icons, MIT.
