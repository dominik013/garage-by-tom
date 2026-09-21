// Centroid of the building at Stadtplatz 57 (OpenStreetMap way 551675495).
const latitude = 48.1025066;
const longitude = 13.1508775;
export const location = {
  latitude,
  longitude,
  street: 'Stadtplatz 57',
  city: '5230 Mattighofen, Österreich',
  directions: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
  map: 'https://www.google.com/maps/place/garage+-+die+T%C3%BCftler/@48.1024503,13.1509109,61m/data=!3m1!1e3!4m12!1m5!3m4!2zNDjCsDA2JzA5LjAiTiAxM8KwMDknMDMuMiJF!8m2!3d48.1025066!4d13.1508775!3m5!1s0x477425c655caf4fd:0x79d1d737626c4774!8m2!3d48.1023852!4d13.1507962!16s%2Fg%2F11h7g4j357?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D',
};
// Explicitly fictional hours for the MVP, not confirmed opening hours.
export const openingHours = [
  { days: 'Montag – Donnerstag', hours: '11:00 – 22:00' },
  { days: 'Freitag & Samstag', hours: '11:00 – 23:00' },
  { days: 'Sonntag', hours: '11:00 – 20:00' },
];
