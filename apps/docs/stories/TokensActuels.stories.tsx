// Inventaire des tokens tels qu'ils existent aujourd'hui (tokens.css historique).
// Sert de point de comparaison pour la conversion au format DTCG du lot 4.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

type Token = { nom: string; valeur: string };

function lireTokens(): Token[] {
  const noms = new Set<string>();
  for (const feuille of Array.from(document.styleSheets)) {
    let regles: CSSRuleList;
    try { regles = feuille.cssRules; } catch { continue; }
    for (const regle of Array.from(regles)) {
      if (regle instanceof CSSStyleRule && regle.selectorText === ':root') {
        for (const p of Array.from(regle.style)) if (p.startsWith('--y-')) noms.add(p);
      }
    }
  }
  const racine = getComputedStyle(document.documentElement);
  return [...noms].sort().map((nom) => ({ nom, valeur: racine.getPropertyValue(nom).trim() }));
}

const estCouleur = (v: string) => /^(#|rgb)/.test(v);

function Inventaire() {
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => setTokens(lireTokens()), []);
  return (
    <table className="inventaire">
      <caption>{tokens.length} tokens dans tokens.css</caption>
      <thead><tr><th>Token</th><th>Valeur</th><th>Aperçu</th></tr></thead>
      <tbody>
        {tokens.map((t) => (
          <tr key={t.nom}>
            <td><code>{t.nom}</code></td>
            <td><code>{t.valeur}</code></td>
            <td>{estCouleur(t.valeur) && <span className="pastille" style={{ ['--c' as string]: `var(${t.nom})` }} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta<typeof Inventaire> = { title: 'Tokens/Inventaire actuel', component: Inventaire };
export default meta;
export const Tous: StoryObj<typeof Inventaire> = {};
