# Quellenanalyse: Event-Dashboard
**Datum:** April 2026
**Basis:** bookmarks.html (kuratierte Lesezeichen)

---

## Zusammenfassung

| Typ | Anzahl Quellen | Aufwand | Zuverlässigkeit |
|---|---|---|---|
| API / ICS-Feed | 3–5 | Gering | Hoch |
| HTML-Scraping | ~20 | Mittel | Mittel |
| Manuell (JSON) | ~15 | Gering (einmalig) | Hoch |
| Nicht geeignet / irrelevant | ~60 | — | — |

**Empfehlung:** Mit Luma.com-API + tanzevents.ch-Scraping + manual-events.json starten. Das deckt 60–70 % der relevanten Events ab.

---

## Kategorien & Quellen

### Sozialleben

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Timeleft** | timeleft.com | API (wahrscheinlich) | ★★★★★ | Wöchentliche Dinner-Events, strukturiert, prüfen ob JSON-API verfügbar |
| **Luma.com** | lu.ma/discover | **API** | ★★★★★ | Öffentliche API, Events nach Ort/Tag filterbar — Goldesel für CH-Events |
| **Barhopping.ch** | barhopping.ch | HTML-Scraping | ★★★★ | Event-Kalender für Singles-Events, übersichtlich |
| **noii.ch** | noii.ch | HTML-Scraping | ★★★ | Lokale Events Schweiz, Struktur unklar |
| **Social Circle Zürich** | social-circle.ch | HTML-Scraping | ★★★ | Expat-Events Zürich |
| **Glocals** | glocals.com | HTML-Scraping | ★★★ | Grösste Expat-Community CH, Events vorhanden |
| **GADWAS** | gadwas.ch | Manuell | ★★ | Kleiner Verein, wenige Events |
| **Toastmasters Bern** | rcbe.ch | HTML-Scraping | ★★★ | Regelmässige Treffen, Terminplan vorhanden |
| **MeetByChance** | meetbychance.ch | Nicht geeignet | ✗ | Kein Eventkalender, Matching-Plattform |

---

### Dating & Social

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Timeleft** | timeleft.com | API | ★★★★★ | Siehe Sozialleben |
| **Barhopping.ch** | barhopping.ch | HTML-Scraping | ★★★★ | Datierungsevents Schweiz |
| **noii.ch** | noii.ch | HTML-Scraping | ★★★ | Schweizer Kontext |
| **Kin** | kinconnect.com | Nicht geeignet | ✗ | Individuelles Matching, kein Kalender |
| **OkCupid / Badoo / LatamDate** | — | Nicht geeignet | ✗ | Dating-Apps, keine Events |

---

### Ausgehen (Konzerte, Kultur)

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Luma.com** | lu.ma/discover | **API** | ★★★★★ | Beste Quelle für lokale Veranstaltungen |
| **Konzerthaus Schüür** | schuur.ch/programm | HTML-Scraping | ★★★★ | Grosses Programm, Scraping empfohlen; ICS-Feed prüfen |
| **Südpol Luzern** | sudpol.ch/programm | HTML-Scraping | ★★★★ | Strukturierte Programmseite |
| **Jazzkantine Luzern** | jazzkantine.com | HTML-Scraping | ★★★ | Konzerte Luzern |
| **Kiosk Luzern** | kioskiosk.ch | HTML-Scraping | ★★★ | Kultur Luzern |
| **St.Gervais Genf** | stgervais.ch | HTML-Scraping | ★★★ | Genf, relevant wenn Reise geplant |
| **Bar59 Luzern** | bar59.ch | Manuell | ★★ | Kein strukturierter Eventkalender erkennbar |
| **Pier 17** | pier17.ch | Nicht geeignet | ✗ | Bar ohne Eventkalender |

---

### Konferenzen

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Plan ₿ Forum Lugano** | planb.lugano.ch | Manuell | ★★★★ | Jährlich, Datum fix — manuell reicht |
| **EconoMe Conference** | economeconference.com | Manuell | ★★★★ | Jährlich März, nächste Ausgabe 2027 |
| **Bansko Nomad Fest** | banskonomadfest.com | Manuell | ★★★★ | Jährlich, gut planbar |
| **Baltic Honeybadger** | baltichoneybadger.com | Manuell | ★★★ | Bitcoin-Konferenz, jährlich |
| **BitBlockBoom** | bitblockboom.com | Manuell | ★★★ | Austin TX, jährlich |
| **Point Zero Forum** | pointzeroforum.com | Manuell | ★★★ | Zürich, jährlich |
| **Hackers Congress Paralelní Polis** | hardcore.hcpp.cz | Manuell | ★★★ | Prag, jährlich |
| **LibertyCon** | libertycon.net | Manuell | ★★★ | Europa, jährlich |
| **LIWC** | liberty-intl.org | Manuell | ★★ | Buenos Aires, weit weg |
| **Bitcoin Conferences Aggregator** | bitvocation.com | HTML-Scraping | ★★★ | Liste von BTC-Konferenzen weltweit |

---

### Retreats & Festivals

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **BookRetreats** | bookretreats.com | HTML-Scraping | ★★★★ | Grösste Retreat-Plattform, evtl. inoffizielle API |
| **Lebenshauch** | lebenshauch.ch | HTML-Scraping | ★★★ | Breathwork Luzern, lokale Events |
| **Set & Setting Retreat** | set-and-setting-retreat.com | HTML-Scraping | ★★★ | Retreat-Übersicht vorhanden |
| **CampFI** | campfi.org | Manuell | ★★★ | FIRE-Camping, jährlich |
| **FI Freedom Retreats** | fifreedomretreats.com | Manuell | ★★★ | Jährlich |
| **AfueraFest** | afuerafest.de | Manuell | ★★★ | Deutsches Festival, unregelmässig |
| **Nomad Retreats** | nomadretreats.co | HTML-Scraping | ★★★ | Retreat-Aggregator |
| **VBG Agenda** | vbg.net/agenda | HTML-Scraping | ★★★ | Ferien und Camps |
| **Temple of the Way of Light** | templeofthewayoflight.org | Manuell | ★★ | Ayahuasca Peru, sehr spezifisch |
| **Hridaya Yoga** | hridaya-yoga.com | Manuell | ★★ | Frankreich, jährliche Retreats |

---

### Tanz

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **tanzevents.ch** | tanzevents.ch/events.php | **HTML-Scraping** | ★★★★★ | Schweizer Tanz-Aggregator, strukturierte Tabellen — beste Quelle für CH-Tanzevents |
| **Salsa-Kalender Latin Promotion** | latinpromotion.ch/salsa-kalender | HTML-Scraping | ★★★★★ | Expliziter Kalender, gut parsbar |
| **Muévete Salsa-Partys Bern** | muevete.ch/salsaparties | HTML-Scraping | ★★★★ | Bern-spezifisch, übersichtlich |
| **SwingPlanIt** | swingplanit.com | **API (prüfen)** | ★★★★★ | Weltweite Swing-Events, wahrscheinlich strukturierte Daten |
| **Ecstatic Dance Bern** | ecstaticdancebern.ch | HTML-Scraping | ★★★★ | Regelmässige Events Bern |
| **Forró Aare** | forroaare.ch | HTML-Scraping | ★★★★ | Forró Schweiz |
| **Simply Forró** | simplyforro.notion.site | Notion-DB | ★★★★ | Notion-Datenbank (Notion API nutzbar) |
| **Salsabrosa** | salsabrosa.ch | HTML-Scraping | ★★★ | Schweizer Salsa-Events |
| **Tango Wave Zürich** | tango-zurich.com | HTML-Scraping | ★★★ | Tango Zürich |
| **SalsaRica Zürich** | salsarica.ch | HTML-Scraping | ★★★ | Zürich |
| **Kulturhof Köniz** | kulturhof.ch | HTML-Scraping | ★★★ | Kulturelle Events Region Bern |
| **DanceAbroad** | danceabroad.com | Manuell | ★★ | Tanzreisen, unregelmässig |
| Ausland-Tanzschulen (Barcelona, Wien, BA) | — | Nicht geeignet | ✗ | Geografisch irrelevant |

---

### Theater & Impro

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Planlos Impro Bern** | planlos.be | HTML-Scraping | ★★★★ | Hauptquelle für Impro Bern |
| **Roseway Impro** | roseway.ch | HTML-Scraping | ★★★★ | Schweizer Impro-Theater |
| **theater anundpfirsich** | pfirsi.ch | HTML-Scraping | ★★★★ | Berner Impro-Theater, aktiv |
| **attento. Improkurse** | attento.ch/impro/kursprogramm | HTML-Scraping | ★★★★ | Impro-Kurse Schweiz |
| **Yourstage.live** | yourstage.live | HTML-Scraping | ★★★ | Evtl. strukturierter als direkte Websites |
| **The Caretakers** | thecaretakers.ch | HTML-Scraping | ★★★ | Schweizer Theater |
| Ausland-Theater (Berlin, Chicago, DE) | — | Nicht geeignet | ✗ | Geografisch irrelevant |

---

### Wing Foiling (höhere Priorität)

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Foiling Camps** | foilingcamps.com | HTML-Scraping | ★★★★ | Camp-Aggregator weltweit, prüfen auf strukturierte Daten |
| **Swiss Foiling School Sisikon** | foilingschool.swiss21 | HTML-Scraping | ★★★★ | Lokale Kurse Urnersee, gut parsbar |
| **Foiling School** | foiling-school.com | HTML-Scraping | ★★★ | Kurse Schweiz |
| **Planet Wingfoil Holidays** | planetwingfoilholidays.com | HTML-Scraping | ★★★ | Internationale Holidays/Camps |
| **Kiteshuttle URI/Comersee** | kitefun.ch/kiteshuttle | Manuell | ★★★ | Saisonale Shuttle-Zeiten |
| **Gardasee Kiteschule** | gardasee-kiteschule.de | Manuell | ★★ | Kursbuchung, kein Kalender |
| Spot-Guides (wingfoiltips.com etc.) | — | Nicht geeignet | ✗ | Info-Seiten, keine Events |
| Weather/Wind (Windfinder, Webcams) | — | Nicht geeignet | ✗ | Wetter, kein Event-Charakter |

---

### Nomad Events (höhere Priorität)

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Bansko Nomad Fest** | banskonomadfest.com | Manuell | ★★★★★ | Das Nomad-Festival schlechthin, jährlich |
| **Traveling Lifestyle (Aggregator)** | travelinglifestyle.net | HTML-Scraping | ★★★★ | Liste mit nomadischen Events/Konferenzen 2024–2026 |
| **Nomad Cruise** | nomadbase.notion.site | Notion-DB | ★★★★ | Notion-Guides für Nomad Cruise 11/12/13/16 |
| **NIP – Nomads in Paradise** | nomads-in-paradise.com | HTML-Scraping | ★★★ | Nomad-Events |
| **Economadia** | economadia.org | HTML-Scraping | ★★★ | Nomad-Community |
| **Mindvalley** | mindvalley.com | HTML-Scraping | ★★★ | Grosse Plattform, Events verfügbar |
| **Nomads Forum** | nomads.com | Nicht geeignet | ✗ | Info-Plattform, kein Eventkalender |
| Co-Livings (Coliving.com etc.) | — | Nicht geeignet | ✗ | Unterkunfts-Plattformen, keine Events |

---

### Sommer-Schools (höhere Priorität)

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **Summer Schools in Europe** | summerschoolsineurope.eu | HTML-Scraping | ★★★★ | Aggregator für europäische Sommerschulen |
| **Tallinn Summer School** | summerschool.tlu.ee | Manuell | ★★★ | Russischkurs Tallinn, jährlich |

---

### Sport & Outdoor

| Quelle | URL | Typ | Eignung | Bemerkung |
|---|---|---|---|---|
| **SAC** | sac-cas.ch | HTML-Scraping | ★★★★ | Tourenkalender SAC, evtl. ICS vorhanden — prüfen! |
| **SAC Rossberg (Zug)** | sac-zug.ch | HTML-Scraping | ★★★★ | Lokale SAC-Sektion |
| **VBG Agenda** | vbg.net/agenda | HTML-Scraping | ★★★ | Ferien, Camps, Touren |
| **Chorwoche Engadiner Kantorei** | engadinerkantorei.ch | Manuell | ★★★ | 2026 Chorwoche, einmalig |
| **Athletes in Action** | athletes.ch | HTML-Scraping | ★★★ | Christliche Sportler-Events |
| **Ousuca Survival Camp** | ousuca.com | Manuell | ★★ | Spezialcamp, unregelmässig |
| **Bogenschützen Thun** | bs-thun.ch | Manuell | ★★ | Trainingszeiten, kein Events-Feed |
| Bergsport-Info-Sites | bergportal, gipfelbuch etc. | Nicht geeignet | ✗ | Keine Event-Feeds, reine Info |
| Reiten-Ranches | palominoranch, tatanka etc. | Nicht geeignet | ✗ | Keine Eventkalender |
| Velo-Routen | eurovelo, veloscenie etc. | Nicht geeignet | ✗ | Routen-Info, keine Events |

---

## Nicht geeignet (Zusammenfassung)

Diese Quellen können ignoriert werden:

- **Dating-Apps:** OkCupid, Badoo, LatamDate, Kinconnect, Maclynn, VIDA Select — Matching-Dienste, kein Eventkalender
- **Coliving-Plattformen:** Coliving.com, Mokrin House, Pomar, etc. — Unterkunft, keine Events
- **Volunteering-Plattformen:** AFS, GIZ, HelpX, SCI, etc. — langfristige Programme, kein Kalender
- **Bergsport-Info:** Bergportal, Gipfelbuch, Swisshiking, SAC-Schneebericht — Info-Seiten
- **Windsport-Info:** Windfinder, Webcams, Beaufort-Tabellen — kein Event-Charakter
- **Reiten-Schulen:** Alle Ranch-Seiten — Kursangebot ohne Kalender
- **Nomad-Info-Plattformen:** NomadList, Remote Year, WiFi Tribe, WorldNomads — kein Eventkalender
- **Geografisch irrelevant:** 23Robadors (Barcelona), Harlem Jazz Club (Barcelona), Cubaila Vienna, diverse Ausland-Tanzschulen — nur relevant bei konkreten Reiseplänen
- **GeoGuessr** — Online-Spiel

---

## Empfohlene Implementierungsreihenfolge

### Phase 2a — Sofort integrieren (wenig Aufwand, hoher Nutzen)
1. **Luma.com API** → Sozialleben, Ausgehen, Nomad Events
2. **tanzevents.ch Scraping** → Tanz (alle Stile)
3. **latinpromotion.ch/salsa-kalender** → Tanz (Salsa)
4. **manual-events.json befüllen** → Alle Konferenzen, Retreats, jährliche Events

### Phase 2b — Mittlerer Aufwand
5. **SwingPlanIt** (prüfen ob API)
6. **timeleft.com** (prüfen ob JSON-API)
7. **Schüür / Südpol / Jazzkantine** — HTML-Scraping Ausgehen
8. **SAC** — Scraping oder ICS prüfen
9. **tanzevents.ch** Swing / Forró / Tango

### Phase 2c — Nice to have
10. **Planlos / Roseway / attento.** — Theater & Impro
11. **foilingcamps.com** — Wing Foiling
12. **Traveling Lifestyle** — Nomad Events

---

## Offene Prüfpunkte

| # | Frage | Priorität |
|---|---|---|
| 1 | Hat Schüür / Südpol einen ICS-Feed? (Website prüfen) | Hoch |
| 2 | Hat SAC einen maschinenlesbaren Tourenkalender? | Hoch |
| 3 | Gibt es eine inoffizielle Timeleft-API? | Hoch |
| 4 | Notion-API für simplyforro und Nomad Cruise nutzen? | Mittel |
| 5 | Luma.com: Welche Tags/Filter liefern CH-relevante Events? | Hoch |
