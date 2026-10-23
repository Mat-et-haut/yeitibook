# Yeitibook

Vitrine code du design system Yeita, générée depuis le fichier Figma **V2.Design.System**.

- **Guidelines** : tokens (couleurs, typographie, espacements), 1 513 icônes Phosphor, marque.
- **Components** et **Sections** : chaque composant avec ses variantes, son HTML/CSS, ses tokens et ses règles d'usage.
- **Qualité** : l'audit « prêt pour la prod », 74 composants mesurés dans un navigateur.
- **Covers** (`/covers/`, lien non listé) : génération des covers marketing (podcast Pause Produit 800×800, live LinkedIn 1200×630), export PNG et détourage automatique.

## Structure

| Chemin | Contenu | Source de vérité |
|---|---|---|
| `tokens/tokens.css` | Les variables `--y-*` | **oui**, réinjecté dans `index.html` |
| `css/components.css` | Le CSS des composants `.y-*` | **oui**, réinjecté dans `index.html` |
| `data/usage.js` | Règles d'usage, écrites à la main | **oui**, survit aux ré-extractions Figma |
| `data/gen.js` | Composants extraits de Figma | généré par l'extracteur |
| `index.html` | L'application, autonome une fois construite | généré par `build.py` |
| `icons/*.js` | Icônes par graisse | importé de Phosphor |
| `fonts/` | Bricolage Grotesque, Apfel Grotezk, Uncut Plan8 | SIL OFL 1.1 |
| `assets/` | Logos et motifs, voir `assets/README.md` | déposé à la main |
| `docs/figma-a-corriger.md` | Les écarts à remonter dans Figma | — |

## Reprendre le CSS ailleurs

Pour un projet tiers, Webflow compris, il suffit des deux fichiers, dans cet ordre :

```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="css/components.css">
```

`components.css` n'utilise que les variables de `tokens.css` et les polices de
`fonts/`. Les blocs y sont délimités par des commentaires `/* @@nom */` …
`/* @@end */`, pour n'en reprendre qu'une partie.

## Construire

```
python3 build.py
```

Le script réinjecte `tokens/tokens.css` et `css/components.css` dans la page
entre leurs marqueurs, régénère l'outil Covers, et copie les fichiers de
données. La page reste ainsi autonome une fois publiée, alors que les sources
restent lisibles et versionnables séparément.

Ne pas éditer le CSS directement dans `index.html` : il est écrasé au build.

## Règles d'usage

Elles vivent dans `data/usage.js`, un fichier écrit à la main, pas extrait de
Figma. Chaque entrée porte un statut : `proposition` tant que personne ne l'a
relue, `valide` une fois tranchée par l'équipe design, ce qui retire le bandeau
d'avertissement dans la vitrine.

Les 74 composants en ont une, toutes en `proposition` à ce jour.

## Contenus

Les noms de clients et les textes des maquettes sont ceux publiés par Yeita sur
yeita.fr (pages `use-case`). Si une future extraction ramène du contenu non
encore publié, `anon.py` (hors dépôt, dans le dossier de travail) le remplace
par des placeholders au build.

## Licences

- Polices : SIL Open Font License 1.1 (fichiers `fonts/OFL-*.txt`).
- Icônes : Phosphor Icons, MIT.
- Détourage : MediaPipe Selfie Segmentation (Apache 2.0), chargé depuis jsDelivr.
