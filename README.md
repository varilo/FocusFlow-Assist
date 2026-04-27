# FocusFlow Assist

FocusFlow Assist är en smart vardagsstruktur-app för personer som har svårt att komma igång, hålla ordning på dagen och komma ihåg viktiga vardagsmoment.

Appen är byggd som en mobilvänlig web app med HTML, CSS och JavaScript. Den använder `localStorage` för att spara användarens uppgifter lokalt i webbläsaren.

## Syfte

Målet med appen är att minska känslan av kaos i vardagen genom att visa:

- vad användaren ska göra just nu
- vad som kommer senare under dagen
- vilka små steg som behövs för att komma igång
- hur veckan är planerad
- när pauser behövs
- när användaren behöver åka till ett möte

Appen är särskilt tänkt för personer som behöver stöd med struktur i vardagen, exempelvis personer som lätt blir överväldigade av många uppgifter eller har svårt att påbörja saker när allt känns rörigt.

## Funktioner

### Dagens fokus

Appen visar nästa uppgift som bör göras och användaren kan markera den som klar.

### Hjälp mig börja

Varje uppgift kan öppna ett enkelt startstöd. Funktionen bryter ner uppgiften till små första steg, till exempel:

1. Ställ dig upp.
2. Gör första lilla steget.
3. Sätt en timer på 5 minuter.

Detta är tänkt att hjälpa när en uppgift känns för stor eller otydlig.

### Dagens 3 viktigaste

Appen räknar fram de viktigaste uppgifterna för dagen baserat på prioritet, typ, tidsåtgång och status.

### Energiläge

Användaren kan välja energinivå:

- Låg energi
- Normal energi
- Bra energi

Appen ger sedan råd utifrån energinivån.

### Dagsvy

Dagen delas upp i tydliga block:

- Morgon
- Förmiddag
- Eftermiddag
- Kväll
- Veckouppgifter

### Veckovy

Appen visar alla veckans dagar från måndag till söndag. Varje dag kan innehålla rutiner, hushållssysslor, inköp, möten, pauser och familjeuppgifter.

### Färdiga rutiner

Appen innehåller förifyllda rutiner för vardagsstruktur, bland annat:

- morgonrutin med barn
- förmiddag med arbete/skola
- eftermiddag med lunch, arbete och hämtning
- kvällsrutin
- söndagsförberedelse
- veckosysslor

### Inköpslistor och checklistor

Uppgifter kan ha checklistor. För handling kan checklistan användas som inköpslista.

### Möten med restidsberäkning

För möten kan användaren ange:

- adress
- färdsätt
- restid
- buffert
- mötestid

Appen räknar sedan ut när användaren behöver åka.

Exempel:

```txt
Möte börjar: 16:00
Restid: 25 min
Buffert: 10 min
Du behöver åka: 15:25
```

### Söndagsläge

Söndag har ett särskilt fokus på att skydda energi inför måndag:

- meal prep
- kolla veckans kalender
- packa barnens väskor
- lägga fram kläder
- göra en uppskjuten uppgift
- börja kvällsrutinen tidigare
- undvika stora beslut sent på kvällen

### Light / dark mode

Appen har stöd för ljust och mörkt tema.

## Tekniker

Projektet visar kunskap inom:

- HTML
- CSS
- JavaScript
- DOM-manipulation
- event handling
- localStorage
- state management
- tidsberäkningar
- sortering och prioritering
- checklistor
- responsiv design
- målgruppsanpassad UX

## Projektstruktur

```txt
FocusFlow-Assist/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Så kör man appen

1. Ladda ner eller klona repot.
2. Öppna `index.html` i webbläsaren.
3. Alternativt använd VS Code-tillägget Live Server.

Ingen backend krävs för första versionen.

## Exempel på användning

Användaren kan planera en dag med:

- väckarklocka
- toalett
- vatten
- väcka barn
- hjälpa barnen med morgonrutin
- laga och äta frukost
- packa väskor
- jobb/skola
- lunch
- hämta barn
- middag
- barnens läggning
- kvällsrutin

Användaren kan också planera veckan med:

- veckans middagar
- inköpslista
- tvätt
- skolmail
- räkningar
- dammsugning
- badrumsstädning
- helgaktivitet
- söndagsförberedelse

## Framtida utveckling

Möjliga förbättringar:

- riktig inloggning
- backend med Node.js och databas
- synkning mellan mobil och dator
- push-notiser
- kalenderintegration
- platsåtkomst
- Google Maps API eller liknande för automatisk restid
- kollektivtrafikdata via Trafiklab eller regionalt API
- AI-förslag på delsteg
- återkommande uppgifter
- familjedelning
- export till kalender

## Författare

Emil Östlund
