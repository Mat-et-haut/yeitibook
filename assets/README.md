# Assets

## logos/

| Fichier | Ce que c'est | Remarque |
|---|---|---|
| `yeita.svg` | Le logotype Yeita utilisé sur la jaquette Live | Tracé, aucune police requise |
| `yeitibook.svg` | Marque du Yeitibook (Y + « .Yeitibook ») | Le mot est un `<text>` : suppose Bricolage Grotesque |
| `ycover.svg` | Marque de Y.Cover (Y + « .Cover ») | Idem |

Pour un usage hors de ce dépôt (impression, slide, site tiers), vectoriser le
`<text>` des deux derniers : sans la police, le rendu retombe sur une police
système et la marque change d'allure.

## patterns/

| Fichier | Ce que c'est |
|---|---|
| `live.svg` | Motif de fond de la jaquette Live, la couleur se pilote en remplaçant `COLOR` |
| `podcast-union.svg` | Cercles concentriques de la jaquette Podcast |

## Ce qui manque encore

Ces fichiers sont ceux qui servent réellement aux outils du dépôt. La charte
Yeita complète n'y est pas : il manque le logotype dans ses variantes
officielles (monochrome, fond sombre, version horizontale, favicon), et les
logos clients, qui ne sont que des références de composants dans `data/gen.js`
(`logo.client.*`) sans fichier associé.

Les déposer ici rendra la prochaine synchronisation autonome.
