const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const pricePattern = /^\d+,\d{2}(?: \/ \d+,\d{2})*$/;

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label}: Text fehlt.`);
}
function validateDish(dish, label, requiredPrice = false) {
  requireText(dish.name, label);
  if (typeof dish.description !== 'string') throw new Error(`${label}: Beschreibung muss Text sein.`);
  if (typeof dish.visible !== 'boolean') throw new Error(`${label}: Sichtbarkeit fehlt.`);
  if (requiredPrice || dish.price) {
    if (typeof dish.price !== 'string' || !pricePattern.test(dish.price))
      throw new Error(`${label}: Preis bitte als 12,90 eingeben (mehrere Preise: 5,90 / 8,90).`);
  }
}
export function prepareMenu(menu, week) {
  if (!Array.isArray(menu.categories) || !Array.isArray(week.days)) throw new Error('Menülisten fehlen.');
  if (typeof week.period !== 'string' || typeof week.included !== 'string') throw new Error('Wochenmenü: Zeitraum und Inklusivtext müssen Text sein.');
  const ids = new Set();
  for (const category of menu.categories) {
    requireText(category.title, 'Kategorie');
    if (!/^[a-z][a-z0-9-]*$/.test(category.id) || ids.has(category.id)) throw new Error(`Kategorie-ID ungültig oder doppelt: ${category.id}`);
    ids.add(category.id);
    if (typeof category.visible !== 'boolean' || !Array.isArray(category.dishes)) throw new Error(`Kategorie ${category.id}: Struktur ungültig.`);
    category.dishes.forEach(dish => validateDish(dish, dish.name || category.title));
  }
  const days = new Set();
  for (const dish of week.days) {
    if (!weekdays.includes(dish.day) || days.has(dish.day)) throw new Error(`Wochentag ungültig oder doppelt: ${dish.day}`);
    days.add(dish.day);
    validateDish(dish, dish.day, true);
    if (dish.price.includes('/')) throw new Error(`${dish.day}: Bitte genau einen Menüpreis angeben.`);
  }
  const categories = menu.categories.filter(c => c.visible).map(c => ({ ...c,
    dishes: c.dishes.filter(d => d.visible).map(d => ({...d, price: d.price || null}))
  })).filter(c => c.dishes.length);
  const lunch = week.days.filter(d => d.visible).toSorted((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day));
  const prices = [...new Set(lunch.map(d => d.price))];
  const minimum = prices.toSorted((a, b) => Number(a.replace(',', '.')) - Number(b.replace(',', '.')))[0];
  const lunchPrice = prices.length ? `${prices.length > 1 ? 'ab ' : ''}${minimum} €` : '';
  return { categories, lunch, lunchPrice };
}
