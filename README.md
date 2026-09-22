# garage by tom

Statische Astro-Website mit Startseite, Tagesmenü, Speisekarte, Anfahrt und Impressum. Ohne Reservierungssystem und ohne eigenen Server oder Datenbank.

## Zugänge

- Website: https://garage-by-tom.pages.dev
- Wochenmenü bearbeiten: https://app.pagescms.org/dominik013/garage-by-tom/main/file/wochenmenue
- Speisekarte bearbeiten: https://app.pagescms.org/dominik013/garage-by-tom/main/file/speisekarte
- Quellcode: https://github.com/dominik013/garage-by-tom

## Lokal

Node.js gemäß `.node-version`, dann:

```sh
npm ci
npm run dev
```

Prüfen und bauen:

```sh
npm test
npm run build
```

Das Ergebnis steht in `dist/`. Die Inhaltsprüfung bricht bei ungültigen Preisen, doppelten Kategorien oder Wochentagen ab. Der bestehende veröffentlichte Stand bleibt bei einem fehlgeschlagenen Cloudflare-Build erhalten.

## Inhalte mit Pages CMS bearbeiten

1. Einen der Editor-Links oben öffnen und mit GitHub anmelden.
2. **Wochenmenü** oder **Speisekarte** auswählen, ändern und mit **Save** speichern.
3. Speichern erstellt einen Git-Commit. Nach erfolgreichem Cloudflare-Pages-Build erscheint die Änderung online; die Veröffentlichung ist nicht augenblicklich.

Weitere Bearbeiter können über Pages CMS per E-Mail eingeladen werden; sie brauchen dafür keinen eigenen GitHub-Account. Die Einrichtung und GitHub-App-Freigabe erfolgt über den Repository-Eigentümer.

### Wochenmenü

- Je ein Menü von Montag bis Freitag mit Gericht, Beschreibung und Preis.
- Preise mit Komma und ohne Eurozeichen eingeben, z. B. `12,90`.
- Nicht angebotene Tage über **Auf der Website anzeigen** ausblenden.
- **Zeitraum** ist optionaler Anzeigetext, keine automatische Veröffentlichung oder Ablaufzeit.
- Der Inklusivtext und der günstigste sichtbare Menüpreis werden auf die Startseite übernommen. Bei unterschiedlichen Preisen steht dort „ab“.

### Speisekarte

- Kategorien und Gerichte bearbeiten, ergänzen, sortieren oder ausblenden.
- Kategorien brauchen einen eindeutigen Kurzname (z. B. `hauptrennen`) für die Sprungnavigation.
- Preis leer lassen für „Preis auf Anfrage“; mehrere Preise sind als `5,90 / 8,90` möglich.
- Kategorien ohne sichtbare Gerichte verschwinden aus der Navigation.

Die Dateien liegen unter `src/content/menus/` und können bei Bedarf auch direkt in GitHub geändert werden. Git speichert die Änderungshistorie; zum Rückgängigmachen den betreffenden Commit zurücksetzen.

## Cloudflare Pages

GitHub-Repository: https://github.com/dominik013/garage-by-tom

In Cloudflare **Workers & Pages → Pages → Import an existing Git repository** auswählen:

| Einstellung | Wert |
| --- | --- |
| Repository | `dominik013/garage-by-tom` |
| Produktionsbranch | `main` |
| Framework | Astro |
| Build-Befehl | `npm run build` |
| Ausgabeordner | `dist` |
| Stammverzeichnis | leer (Repository-Wurzel) |
| Node.js | `.node-version` bzw. `NODE_VERSION=24.13.1` |

Das Projekt verwendet die kostenlose Adresse `https://garage-by-tom.pages.dev` mit HTTPS. Die native GitHub-Integration veröffentlicht nach jedem Push auf `main`, auch nach einer Änderung über Pages CMS. Dafür werden keine Cloudflare-Schlüssel in diesem Repository benötigt.

GitHub Actions prüft zusätzlich Tests und Build. Cloudflare führt seine eigene Inhaltsprüfung im Build aus; der GitHub-Workflow ist keine separate Freigabesperre. Beide Dienste unterliegen den jeweiligen kostenlosen Kontingenten.

## Vor dem offiziellen Start

- Die gelb markierten Betreiberangaben im Impressum vervollständigen.
- Die aktuell beispielhaften Öffnungszeiten in `src/data/site.ts` bestätigen oder ersetzen.
- Wochenmenü und Preise fachlich freigeben.
- `noindex, nofollow` in `src/layouts/Layout.astro` erst zur Freigabe für Suchmaschinen entfernen. Die Website ist trotzdem öffentlich per Link erreichbar.
- Rechtliche Hinweise zur Karte und zum Datenschutz abschließend prüfen (siehe `LEGAL-NOTES.md`).

Es ist keine Tischreservierung angebunden. Der vorherige Platzhalter-Button wurde entfernt.

## Assets

Original-Logo und Favicon liegen in `public/`. Fotos sind lokal gespeichert, siehe `PHOTO-SOURCES.md`; Schriften liegen lokal samt Lizenz unter `public/fonts/`. Die Leaflet-Karte lädt erst beim Annähern an den Kartenbereich. Inhalte und Fotos bleiben beim statischen Website-Build lokal; Kartendienste werden im Browser nachgeladen.
