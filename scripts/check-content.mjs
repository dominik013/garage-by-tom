import { readFileSync } from 'node:fs';
import { prepareMenu } from '../src/data/menu-model.mjs';
const load = name => JSON.parse(readFileSync(new URL(`../src/content/menus/${name}.json`, import.meta.url), 'utf8'));
const { categories, lunch } = prepareMenu(load('speisekarte'), load('wochenmenue'));
console.log(`Menüs geprüft: ${categories.reduce((count, c) => count + c.dishes.length, 0)} Gerichte, ${lunch.length} Tagesmenüs.`);
