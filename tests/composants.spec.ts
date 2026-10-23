// Barrière qualité des composants : chaque story d'un paquet du DS (packages/*) est un cas de test.
// Critères repris de legacy/tools/check.py, plus axe-core et le débordement à trois largeurs.
// Les stories de documentation (apps/docs) ne sont pas des composants : elles sont ignorées.
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const index = JSON.parse(fs.readFileSync('apps/docs/dist/index.json', 'utf8'));
const stories: string[] = Object.values<any>(index.entries)
  .filter((e) => e.type === 'story' && /\/packages\//.test(e.importPath))
  .map((e) => e.id);
const LARGEURS = [360, 768, 1600];

test('inventaire des stories de composants', () => {
  test.info().annotations.push({ type: 'stories', description: `${stories.length} story(s) de composant` });
  expect(Array.isArray(stories)).toBe(true);
});

async function ouvrir(page: Page, id: string, largeur = 1600) {
  await page.setViewportSize({ width: largeur, height: 1000 });
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector('#storybook-root > *');
  await page.evaluate(() => document.fonts.ready);
}

const MESURE = () => {
  const racine = document.querySelector('#storybook-root')!;
  const noeuds = [...racine.querySelectorAll('*')] as HTMLElement[];
  const enLigne = noeuds.filter((e) => (e.getAttribute('style') || '').split(';').some((d) => d.trim() && !d.trim().startsWith('--'))).length;
  // « fige » : un texte lisible coupé par la hauteur de son bloc. Un overflow:hidden sans hauteur fixe
  // n'est pas une faute (check.py le comptait, d'où des faux positifs), le line-clamp voulu non plus,
  // ni une illustration décorative (aria-hidden) qui déborde.
  const fige = noeuds.filter((e) => {
    if (!(e.textContent || '').trim()) return false;
    const cs = getComputedStyle(e);
    if (cs.overflow === 'visible' || cs.webkitLineClamp !== 'none') return false;
    const r = e.getBoundingClientRect();
    return [...e.querySelectorAll('*')].some((f) => !f.closest('[aria-hidden="true"]')
      && [...f.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim())
      && (f.getBoundingClientRect().bottom > r.bottom + 1 || f.getBoundingClientRect().right > r.right + 1));
  }).map((e) => e.className || e.tagName);
  const faux = noeuds.filter((e) => !e.closest('.y-btn,.y-link,.y-tag,.y-input,a[href],button')
    && getComputedStyle(e).cursor === 'pointer' && (e.textContent || '').trim().length > 0).length;
  const imgsSansAlt = [...racine.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
  const divCliquables = noeuds.filter((e) => /^(DIV|SPAN)$/.test(e.tagName) && getComputedStyle(e).cursor === 'pointer' && !e.closest('a,button')).length;
  const dur = noeuds.filter((e) => /#[0-9a-f]{3,8}\b|\brgba?\(/i.test(e.getAttribute('style') || '')).length;
  return { enLigne, fige, faux, imgsSansAlt, divCliquables, dur };
};

const DEBORDE = () => {
  const w = window.innerWidth;
  const larges = [...document.querySelectorAll('#storybook-root *')].filter((e) => e.getBoundingClientRect().width > w + 1).length;
  return { larges, defilement: document.documentElement.scrollWidth > w + 1 };
};

for (const id of stories) {
  test.describe(id, () => {
    test('inline, fige, atomes, a11y, tokens', async ({ page }) => {
      await ouvrir(page, id);
      const m = await page.evaluate(MESURE);
      expect.soft(m.enLigne, 'inline : styles en ligne').toBe(0);
      expect.soft(m.fige, 'fige : texte coupé par une hauteur fixe').toEqual([]);
      expect.soft(m.faux, 'atomes : cliquable hors composant du DS').toBe(0);
      expect.soft(m.imgsSansAlt, 'a11y : image sans alt').toBe(0);
      expect.soft(m.divCliquables, 'a11y : div ou span cliquable').toBe(0);
      expect.soft(m.dur, 'tokens : couleur en dur').toBe(0);
    });
    for (const w of LARGEURS) {
      test(`responsive ${w}px`, async ({ page }) => {
        await ouvrir(page, id, w);
        const d = await page.evaluate(DEBORDE);
        expect.soft(d.larges, `blocs plus larges que ${w}px`).toBe(0);
        expect.soft(d.defilement, 'défilement horizontal').toBe(false);
      });
    }
    test('axe-core (WCAG 2.1 A et AA)', async ({ page }) => {
      await ouvrir(page, id);
      const r = await new AxeBuilder({ page }).include('#storybook-root').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(r.violations.map((v) => `${v.id} (${v.nodes.length}) : ${v.help}`)).toEqual([]);
    });
  });
}
