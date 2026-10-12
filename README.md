# Yeitibook

Vitrine code du design system Yeita, générée depuis le fichier Figma **V2.Design.System**.

- **Guidelines** : tokens (couleurs, typographie, espacements), 1 513 icônes Phosphor, marque.
- **Components** et **Sections** : chaque composant avec ses variantes, son HTML/CSS et ses tokens.
- **Sandbox Covers** : génération des covers marketing (podcast Pause Produit) avec export PNG et détourage automatique.

## Structure

| Chemin | Contenu |
|---|---|
| `index.html` | L'application (page unique, sans build) |
| `data/gen.js` | Composants extraits de Figma |
| `icons/*.js` | Icônes par graisse |
| `fonts/` | Bricolage Grotesque, Apfel Grotezk, Uncut Plan8 (SIL OFL 1.1) |

## Licences

- Polices : SIL Open Font License 1.1 (fichiers `fonts/OFL-*.txt`).
- Icônes : Phosphor Icons, MIT.
- Détourage : MediaPipe Selfie Segmentation (Apache 2.0), chargé depuis jsDelivr.
