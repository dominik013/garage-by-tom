import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepareMenu } from '../src/data/menu-model.mjs';
const load = name => JSON.parse(readFileSync(new URL(`../src/content/menus/${name}.json`, import.meta.url), 'utf8'));
const fixtures = () => [load('speisekarte'), load('wochenmenue')];
test('empty prices become price on request; multiple prices remain unchanged', () => {
  const [menu, week] = fixtures();
  menu.categories[0].dishes[0].price = '';
  menu.categories[0].dishes[1].price = '5,90 / 8,90';
  const result = prepareMenu(menu, week);
  assert.equal(result.categories[0].dishes[0].price, null);
  assert.equal(result.categories[0].dishes[1].price, '5,90 / 8,90');
});
test('hidden dishes, categories and days disappear; empty categories disappear too', () => {
  const [menu, week] = fixtures();
  menu.categories[0].visible = false;
  menu.categories[1].dishes.forEach(d => d.visible = false);
  week.days.forEach(d => d.visible = false);
  const result = prepareMenu(menu, week);
  assert.equal(result.categories.length, menu.categories.length - 2);
  assert.equal(result.lunch.length, 0);
  assert.equal(result.lunchPrice, '');
});
test('home price follows visible menu prices and weekdays stay ordered', () => {
  const [menu, week] = fixtures();
  week.days.forEach(d => d.price = '13,90');
  assert.equal(prepareMenu(menu, week).lunchPrice, '13,90 €');
  week.days[0].price = '15,90';
  week.days[1].price = '1,00';
  week.days[1].visible = false;
  week.days.reverse();
  const result = prepareMenu(menu, week);
  assert.equal(result.lunchPrice, 'ab 13,90 €');
  assert.equal(result.lunch[0].day, 'Montag');
});
test('invalid prices and duplicate anchors or days stop publication', () => {
  const [menu, week] = fixtures();
  week.days[0].price = '12.90';
  assert.throws(() => prepareMenu(menu, week), /Preis/);
  week.days[0].price = '12,90';
  week.days.push({...week.days[0]});
  assert.throws(() => prepareMenu(menu, week), /doppelt/);
  week.days.pop();
  menu.categories[1].id = menu.categories[0].id;
  assert.throws(() => prepareMenu(menu, week), /doppelt/);
});
