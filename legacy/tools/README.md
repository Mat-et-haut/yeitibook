# Barrière qualité

```
python3 tools/check.py              les 74 composants
python3 tools/check.py button tag   un sous-ensemble
python3 tools/check.py --promus     les composants faits main
```

Sortie non nulle dès qu'un composant échoue : le script sert de barrière avant
un commit ou avant de promouvoir un composant.

Il rend chaque composant dans Chromium, aux largeurs 360, 768 et 1600, et
vérifie les sept critères qui définissent « utilisable en production » :

| Critère | Ce qui est mesuré |
|---|---|
| `inline` | aucun style en ligne, hors variables CSS |
| `fige` | aucune hauteur en pixels sur un bloc qui porte du texte |
| `responsive` | aucun bloc ne dépasse la fenêtre, variante mobile comprise |
| `atomes` | tout élément cliquable est soit un composant du DS, soit un `a`/`button` natif |
| `a11y` | pas d'image sans `alt`, pas de `div` cliquable à la place d'un `a` |
| `tokens` | aucune couleur en dur dans les styles |
| `usage` | la règle d'usage de `data/usage.js` est au statut `valide` |

Prérequis : `pip install playwright && playwright install chromium`.

## État de référence, 13 octobre 2026

74 composants, **aucun ne passe les sept critères**.

| Critère | Composants en échec |
|---|---|
| `usage` | 74 |
| `inline` | 69 |
| `tokens` | 61 |
| `responsive` | 58 |
| `fige` | 40 |

Cinq composants ne sont retenus que par le dernier critère, c'est-à-dire qu'ils
n'attendent qu'une validation humaine de leur règle d'usage : `button`, `link`,
`tag`, `Input`, `header`.

Ce tableau est la mesure de départ du chantier de réécriture. Il se recalcule
avec `python3 tools/check.py`, qui réécrit `tools/check.json`.

## Limites

Le script mesure dans Chromium headless. Il ne dit rien du rendu sur navigateur
ancien, du comportement d'un lecteur d'écran réel, ni de la fidélité visuelle à
la maquette Figma, qui se vérifie à l'œil ou par comparaison d'images.
