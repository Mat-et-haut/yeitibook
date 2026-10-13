# À corriger dans Figma

Relevé le 13 octobre 2026 sur le fichier `V2.Design.System` (`sx7KjN0X7TSYjhnOJTnycQ`).

Ces écarts ont été traités côté code quand c'était possible sans trancher une
question de design. Tant qu'ils ne sont pas corrigés dans Figma, la prochaine
extraction les réintroduira dans `data/gen.js`.

## 1. Faute de frappe : `stroke/sucess/*`

Deux variables, `stroke/sucess/light` (`#a7f3d0`) et `stroke/sucess/medium`
(`#10b981`), portent « sucess » au lieu de « success ».

État côté code : l'extracteur produit déjà `--y-stroke-success-light` et
`--y-stroke-success-medium`, correctement orthographiés. La faute ne subsiste
que dans Figma et dans les chaînes brutes de `data/gen.js` (3 occurrences).

À faire : renommer les deux variables dans Figma. Aucun changement de valeur.

## 2. Doublon : `background/invert/default`

`background/invert/default` et `background/neutral/invert` valent toutes les
deux `#fffdf9`. Deux noms pour une seule couleur, sans règle d'usage qui les
distingue.

État côté code : les 3 usages pointent désormais sur `neutral-invert`, et
`--y-background-invert-default` est conservé en alias pour ne rien casser.

À faire : supprimer `background/invert/default` dans Figma, ou documenter ce
qui le distingue de `neutral/invert`. Le code suivra.

## 3. Écart non documenté : `text/brand/strong` ≠ `background/brand/strong`

| Variable | Valeur |
|---|---|
| `text/brand/strong` | `#3d1dc6` |
| `background/brand/strong` | `#3419ad` |

Même niveau (`strong`), même famille (`brand`), deux violets différents. Soit
c'est voulu (un violet plus lumineux pour le texte, ce qui se défend), soit
c'est une dérive.

État côté code : valeurs inchangées, écart commenté dans `tokens/tokens.css`.

À faire : trancher. Si c'est voulu, l'écrire dans la description de la variable
Figma. Sinon, aligner sur `#3419ad`.

## 4. Styles de titre absents des variables

Les titres `h1` et `h3` des composants `hero` et `card.cta` utilisent des
valeurs qui n'existent dans aucune variable Figma : taille 64 px et 32 px,
interlettrage 1 px, optical size 14. Seules les hauteurs de ligne existaient
(`line-height/h1` = 80 px, `line-height/h3` = 40 px).

État côté code : relevées dans la maquette et ajoutées à `tokens/tokens.css`
sous `--y-font-size-h1`, `--y-font-size-h3`, `--y-letter-spacing-h1`,
`--y-letter-spacing-h3`, `--y-font-optical-size`.

À faire : créer les variables correspondantes dans Figma, pour que la
prochaine extraction les récupère au lieu de les laisser en dur.

## 5. Variable déclarée, jamais utilisée : `font-size/5xl`

`font-size/5xl` vaut 48 px et n'est utilisée par aucun composant. L'échelle
saute par ailleurs de `xl` (20 px) à `5xl` (48 px) : il manque les paliers
intermédiaires, ou bien `5xl` est un reliquat.

À faire : soit l'employer pour un niveau de titre réel, soit la supprimer.

## 6. Police de repli inexistante

Les trois piles de polices citaient « Space Grotesk » en repli, qui n'est
servie nulle part : le repli ne s'appliquait que chez les personnes l'ayant
installée localement, avec un rendu différent des autres.

État côté code : retirée des trois piles, qui tombent maintenant directement
sur `system-ui`.

À faire : rien, sauf si l'équipe veut réellement embarquer cette police.
