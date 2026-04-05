# Tower Timer Site

Eine kleine Website für deine 2. Station: Sie zeigt erst einen Countdown an und gibt den Hinweis erst nach Ablauf frei.

## Warum man den Hinweis nicht per Inspect vorher sieht

Der eigentliche Hinweis steht **nicht** in `index.html` und **nicht** im Frontend-JavaScript.
Er wird erst dann vom Server ausgeliefert, wenn die Freigabezeit wirklich erreicht ist.

Wichtig: Wenn du den Hinweis wirklich geheim halten willst, dann muss er **nur auf dem Server** liegen. Deshalb kommt der Text hier aus `.env`.

## Einrichtung

1. Node.js installieren
2. Im Projektordner ausführen:

```bash
npm install
```

3. `.env.example` zu `.env` kopieren
4. In `.env` setzen:

```env
RELEASE_AT=2026-04-07T18:00:00Z
HINT_TEXT=Contra solem: V milia\nIn pulvere calido: MDCCC
PORT=3000
```

## 26 Stunden Countdown

Wenn du möchtest, dass der Timer **ab dem ersten Freischalten der Seite** exakt 26 Stunden läuft, dann setze `RELEASE_AT` einfach auf "jetzt + 26 Stunden".

Beispiel:
- Du aktivierst die Seite am 5. April 2026 um 20:00 Uhr deutscher Zeit
- Dann setzt du `RELEASE_AT` auf `2026-04-06T20:00:00+02:00`

Oder in UTC entsprechend umgerechnet.

## Starten

```bash
npm start
```

Dann im Browser öffnen:

```text
http://localhost:3000
```

## Hinweise zur Sicherheit

- Der Hinweis ist **nicht** per normalem Inspect aus dem HTML lesbar.
- Vor Ablauf kann man `/api/hint` zwar manuell aufrufen, bekommt aber nur eine Sperrantwort.
- Wer vollen Zugriff auf deinen Server, deine `.env` oder dein Hosting hat, kann den Hinweis natürlich trotzdem sehen.
- Für dein Spiel ist das in der Regel die sauberste praktikable Lösung.
