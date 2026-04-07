# Lastenheft: Persönliches Event-Dashboard
**Version:** 0.1 — Entwurf  
**Datum:** April 2026  
**Status:** In Abstimmung

---

## 1. Ausgangslage & Ziel

### Problem
Der Nutzer verfügt über eine grosse, wachsende Sammlung von Bookmarks zu Events, Locations, Festivals, Retreats und sozialen Angeboten. Diese sind in verschiedenen Kategorien organisiert, aber der Zugriff ist unstrukturiert: Es gibt keine schnelle Übersicht über bevorstehende Events, keine automatische Aktualisierung, und das manuelle Pflegen von Kalender-ICS-Dateien ist aufwändig.

### Ziel
Ein persönliches, webbasiertes Dashboard, das:
- auf einen Blick die nächsten Events pro Kategorie zeigt
- regelmässig und automatisch aktuelle Daten von definierten Quellen abruft
- als zentraler Einstiegspunkt («Manager-View») dient
- auf Wunsch in die Details eines Events navigiert
- auf Vercel gehostet wird und über jeden Browser erreichbar ist

---

## 2. Zielgruppe

Einzelperson (privat). Kein Multi-User, keine Authentifizierung in Phase 1.

---

## 3. Kategorien (vorläufig)

| Kategorie       | Beschreibung                   | Beispiele                                     |
| --------------- | ------------------------------ | --------------------------------------------- |
| Sozialleben     | Wiederkehrende lokale Events   | Tuesday Jam, Ecstatic Dance, Muévete SalsaBar |
| Dating & Social | Singles-Events, Dinner-Formate | Timeleft, noii, Barhopping                    |
| Ausgehen        | Konzerte, Partys, Kultur       | Dachstock, Bierhübeli, ONO, Schüür            |
| Konferenzen     | Bitcoin, Nomad, FIRE, Freiheit | Plan B Forum, Bansko Nomad Fest, EconoMe      |
| Retreats        | Bewusstsein, Körper, Geist     | Ecstatic Dance Festival, bookretreats.com     |
| Sport & Outdoor | Wasser, Berg, Velo, Reiten     | SAC, Wingfoil Camps                           |
| Tanz            | Kurse und Social Dances        | Salsa, Forró, Lindy Hop, Impro                |
| Theater & Impro | Aufführungen, Workshops        | Planlos, Roseway, attento.                    |

Höhere Prio:  Wing Foiling, Nomad things/events , Sommer schools
-> auch als eigene Kategorien

*Kategorien werden nach Lieferung der kuratierten Bookmark-Sammlung finalisiert.*

---

## 4. Funktionale Anforderungen

### 4.1 Dashboard (Übersicht)
- Kachel-Layout, eine Kachel pro Kategorie
- Jede Kachel zeigt:
  - Kategoriename und Icon
  - Die **nächsten 2–3 Events** mit Datum, Titel und Ort
  - Visuelle Hervorhebung bei Events in den nächsten 7 Tagen
- Klick auf Kachel → Detailansicht der Kategorie

### 4.2 Detailansicht (pro Kategorie)
- Liste aller kommenden Events der Kategorie
- Pro Event: Datum, Titel, Ort, kurze Beschreibung, Link zur Originalquelle
- Filtermöglichkeit nach Stadt (z.B. nur Bern, nur Luzern)
- Zurück-Button zum Dashboard

### 4.3 Datenaktualisierung
- Events werden aus definierten Quellen abgerufen
- Unterstützte Quellentypen (nach Prüfung der Bookmarks):
  - **ICS/iCal-Feeds** (direkt maschinenlesbar)
  - **Strukturierte JSON/API** (z.B. Luma.com-Events)
  - **HTML-Scraping** (für Websites ohne Feed, mit Vorsicht)
- Aktualisierung: **täglich** via Vercel Cron Job
- Gecachte Daten werden angezeigt wenn Abruf fehlschlägt

### 4.4 Manuelle Ergänzungen
- Möglichkeit, Events manuell in einer einfachen JSON-Datei im Repo zu erfassen
- Diese werden zusammen mit automatisch abgerufenen Events angezeigt
- Nützlich für Events ohne maschinenlesbare Quelle

---

## 5. Nicht-funktionale Anforderungen

| Anforderung | Beschreibung |
|---|---|
| Verfügbarkeit | Öffentlich erreichbare URL (nur dem Nutzer bekannt) |
| Performance | Ladezeit < 2 Sekunden (gecachte Daten) |
| Mobilfreundlich | Responsive Design, nutzbar auf Smartphone |
| Wartbarkeit | Klarer Code, einfach erweiterbar um neue Quellen |
| Kosten | Gratis (Vercel Free Tier) |
| Datenschutz | Keine Nutzerdaten, keine Anmeldung, keine Tracking-Tools |

---

## 6. Technische Architektur

```
GitHub Repository
│
├── /src
│   ├── /components        React-Komponenten (Kacheln, Cards, etc.)
│   ├── /pages             Next.js Seiten (Dashboard, Detailansicht)
│   └── /lib               Hilfsfunktionen (Datenabruf, Parsing)
│
├── /data
│   └── manual-events.json Manuell gepflegte Events (JSON)
│
├── /api
│   └── fetch-events.js    Serverless Function: holt und cached Events
│
└── vercel.json            Cron Job Konfiguration
```

### Stack
| Komponente | Technologie | Begründung |
|---|---|---|
| Framework | Next.js (React) | Vercel-nativ, SSR + API Routes in einem |
| Styling | Tailwind CSS | Schnell, modern, kein Setup |
| Datenquelle | ICS-Parser + Fetch | Leichtgewichtig, keine Datenbank nötig |
| Caching | Vercel KV (Redis) oder JSON-File | Einfach, gratis im Free Tier |
| Hosting | Vercel | Automatisches Deployment via GitHub |
| Cron | Vercel Cron Jobs | 2 Cron Jobs gratis |

---

## 7. Datenquellen-Konzept

### Quellentypen und Eignung

| Typ | Beispiel | Aufwand | Zuverlässigkeit |
|---|---|---|---|
| ICS-Feed | Dachstock, Schüür (falls vorhanden) | Gering | Hoch |
| Luma.com API | POW.space Events, lokale Events | Gering | Hoch |
| JSON/API | Eventbrite, Meetup.com | Mittel | Hoch |
| HTML-Scraping | ONO Bern, Bierhübeli, Jazzkantine | Hoch | Mittel |
| Manuell (JSON) | Konferenzen, Festivals | Gering | Hoch (manuell) |

### Priorisierung
1. Zuerst alle Quellen mit ICS-Feed oder API identifizieren
2. Für wichtige Quellen ohne Feed: HTML-Scraping implementieren
3. Alles andere: manuell in `manual-events.json` pflegen

*Die konkrete Quellenübersicht wird nach Lieferung der kuratierten Bookmark-Sammlung erstellt.*

---

## 8. Phasenplan

### Phase 1 — Prototype (Woche 1)
- [ ] GitHub Repo erstellen
- [ ] Next.js App mit Tailwind aufsetzen
- [ ] Dashboard-UI mit Kacheln (statische Testdaten)
- [ ] Detailansicht implementieren
- [ ] Deployment auf Vercel

**Ergebnis:** Funktionierendes Dashboard mit statischen Daten, live auf Vercel

### Phase 2 — Datenquellen (Woche 2–3)
- [ ] Kuratierte Bookmark-Sammlung analysieren
- [ ] Quellentypen klassifizieren (ICS / API / Scraping / Manuell)
- [ ] ICS-Parser implementieren
- [ ] Luma.com-Integration
- [ ] `manual-events.json` Schema definieren und befüllen
- [ ] Caching implementieren

**Ergebnis:** Dashboard zeigt echte, aktuelle Events

### Phase 3 — Automatisierung (Woche 3–4)
- [ ] Vercel Cron Job einrichten (täglich)
- [ ] Fehlerbehandlung und Fallback auf Cache
- [ ] HTML-Scraping für priorisierte Quellen
- [ ] Filter nach Stadt implementieren

**Ergebnis:** Vollautomatisch aktualisiertes Dashboard

### Phase 4 — Verfeinerung (laufend)
- [ ] Neue Quellen hinzufügen
- [ ] Design verfeinern
- [ ] Kategorien anpassen
- [ ] Mobile Optimierung

---

## 9. Offene Punkte / Entscheidungsbedarf

| #   | Frage                                                                                                                                                   | Priorität |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Finale Kategorien nach neuer Bookmark-Sammlung bestätigen                                                                                               | Hoch      |
| 2   | Welche Quellen haben ICS-Feeds? (Recherche ausstehend)                                                                                                  | Hoch      |
| 3   | Soll das Dashboard passwortgeschützt sein?<br>Ja                                                                                                        | Mittel    |
| 4   | Soll es einen «Zu meinem Kalender hinzufügen»-Button pro Event geben?<br>Ein ICS-Download pro Event wäre nett.                                          | Mittel    |
| 5   | Mehrsprachigkeit (DE/EN) nötig? - nein                                                                                                                  | Niedrig   |
| 6   | Sollen vergangene Events archiviert oder gelöscht werden?<br>Jeweils nur die Events in der Zukunft anzeigen. Vergangene Events sind nicht mehr wichtig. | Niedrig   |

---

## 10. Nächste Schritte

1. **Nutzer:** Kuratierte Bookmark-Sammlung liefern
2. **Claude:** Quellen analysieren und Quellenübersicht erstellen
3. **Nutzer:** Kategorien und offene Punkte bestätigen
4. **Claude:** Phase 1 Prototype bauen
5. **Nutzer:** GitHub Repo erstellen und Vercel-Projekt anlegen

---

*Dieses Dokument wird laufend aktualisiert.*
