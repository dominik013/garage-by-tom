import menu from '../content/menus/speisekarte.json';
import week from '../content/menus/wochenmenue.json';
import { prepareMenu } from './menu-model.mjs';

export const { categories, lunch, lunchPrice } = prepareMenu(menu, week);
export const lunchIncluded = week.included;
export const lunchPeriod = week.period;
