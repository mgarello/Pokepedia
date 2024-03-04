# Poképedia: la mia enciclopedia Pokémon personale!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app

Per utilizzare questo progetto è necessario scaricare il contenuto del repository, accedere all'interno della directory e digitare il comando `npm install --legacy-peer-deps`.
Al termine dell'installazione, per avviare il progetto, digitare il comando `npm start`.

## Funzionalità

- Ricerca di un Pokémon per nome o per numero nella homepage e nella visione dettagliata;
- visualizzazione dell'elenco di Pokémon, abilità, mosse, strumenti e bacche in pagine dedicate.
- possibilità di cambiare il Pokémon visualizzato tramite uno swipe a destra e a sinistra nella visione dettagliata del Pokémon (funzionante solo su mobile).

## Dipendenze aggiuntive

### React use-dynamic-refs
Per aggiungere dei riferimenti dinamici è stata utilizzata la libreria [use-dynamic-refs](https://www.npmjs.com/package/use-dynamic-refs).
Per includerla all'interno del progetto è sufficiente utilizzare il comando `npm install --save use-dynamic-refs`.

### react-router-dom
Per permettere la navigazione all'interno del progetto è stata utilizzata la libreria [react-router-dom](https://www.npmjs.com/package/react-router-dom).
Per includerla all'interno del progetto è sufficiente utilizzare il comando `npm i react-router-dom`.

### color-thief-react
Per estrapolare la palette di colori dalle immagini è stato utilizzato il componente [color-thief-react](https://www.npmjs.com/package/color-thief-react).
Per importarlo all'interno del progetto è sufficiente utilizzare il comando `npm i -S color-thief-react`.

### react-chartjs-2
Per la realizzazione del grafico delle statistiche base è stata utilizzata la libreria [react-chartjs-2](https://react-chartjs-2.js.org/).
Per includerla all'interno del progetto è sufficiente utilizzare il comando `npm install --save chart.js react-chartjs-2`.

### react-gh-pages
Per rendere accessibile il sito attraverso un URL è stato utilizzato il pacchetto [gh-pages](https://github.com/gitname/react-gh-pages?tab=readme-ov-file).
È possibile accedere al sito tramite [questo URL](https://mgarello.github.io/Pokepedia).

### SweetAlert2
Per realizzare gli alert del progetto è stata utilizzata la libreria [SweetAlert2](https://sweetalert2.github.io/).
Per includerla all'interno del progetto è sufficiente utilizzare il comando `npm install sweetalert2`.

## Bibliografia

### Fonte delle informazioni
Tutte le informazioni presenti in questa guida sono ricavate da [PokéAPI](https://pokeapi.co/).

### Pokémon Font
Il font utilizzato in questo progetto è stato scaricato da [FontMeme](https://fontmeme.com/fonts/pokemon-font/).

### Favicon
La favicon del progetto è stata scaricata da [questo sito](https://www.pngall.com/it/pokeball-png/download/40234).

### Icone dei tipi
Le icone dei tipi sono state realizzate da [duiker101 on GitHub](https://github.com/duiker101/pokemon-type-svg-icons).

### Navbar
Il template iniziale della navbar è stato realizzato da [Bootstrap](https://getbootstrap.com/docs/4.0/examples/navbars/).

### Icona dell'Hamburger
L'icona dell'hamburger della navbar è stata realizzata seguendo [questo tutorial](https://youtu.be/XLHdF7z77YU?si=Ecis-LxWlXBGOV42).

### Fetch nei singoli componenti
Per ottenere le informazioni all'interno dei singoli componenti è stato utilizzato il codice fornito in [questo articolo](https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait).

### Estrapolatore colori
Il codice per l'estrapolazione della palette di colori da un'immagine è stato preso dal progetto di [Naramsim su GitHub](https://github.com/Naramsim/Colosseum/blob/master/src/scripts/helpers/getColors.js).

### Calcolo debolezze e resistenze dei Pokémon
Il codice per il calcolo delle debolezze e delle resistenze dei Pokémon è stato preso dal progetto di [Naramsim su GitHub](https://github.com/Naramsim/Colosseum/blob/master/src/scripts/helpers/getMultipliers.js).

### Reset CSS
Il foglio di stile CSS è stato scaricato da [questa guida](https://html5doctor.com/html-5-reset-stylesheet/).

### Creazione del grafico da dati forniti da una API Rest
Per realizzare il grafico delle statistiche base ricavando i dati direttamente dal componente è stato seguito [questo tutorial](https://www.youtube.com/watch?v=yOousFGfmZc).

### Accesso alle variabili CSS da Javascript
Per accedere alle variabili CSS all'interno del componente del grafico è stato utilizzato parzialmente [questo codice](https://codepen.io/kurkle/pen/KKpaYwx).

### GIF del preloader
La GIF utilizzata per il preloader è stata scaricata da [Tenor](https://tenor.com/en-GB/view/pokemon-gif-21691408).

### Rilevamento swipe destra/sinistra
Il codice per rilevare gli swipe verso destra e verso sinistra è stato adattato da quello fornito in [questa soluzione](https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react).

### Immagini di sfondo
Le immagini di sfondo nelle schermate con gli elenchi sono state scaricate dai seguenti link:
[Pokédex](https://pokemon-go.name/wp-content/uploads/2023/08/uvelichenie-vmestimosti-pokemon-storage-and-item-bag-storage-pokemon-go-1024x572.jpg)
[Borsa](https://pokemongohub.net/wp-content/uploads/2023/08/EVr0cxyXgAEuXvo.webp)
e modificate tramite questo [tool online](https://www.remove.bg/):
