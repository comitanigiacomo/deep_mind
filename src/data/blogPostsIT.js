export const blogPostsIT = {
  'homelab-debian': {
    content: `
      <p>Studiare Informatica alla magistrale significa sorbirsi tantissima teoria su reti e sistemi distribuiti. A un certo punto, però, ho sentito il bisogno di mettere le mani in pasta e avere il controllo totale sui miei dati e servizi. Così ho deciso di costruire il mio homelab trasformando il mio PC nel mio server.</p>

      <h3>Il Setup e la Filosofia "Clean"</h3>
      <p>Invece di imbarcarmi in un setup complesso con hypervisor o cluster di Raspberry Pi, ho optato per un approccio estremamente minimale: <strong>una singola macchina Debian in cui assolutamente tutto è containerizzato</strong>.</p>

      <p>Mi sono imposto una regola ferrea per questo progetto: ho un PC pulito e non ho alcuna intenzione di sporcarlo con un disastro di dipendenze rotte, pacchetti residui o ambienti in conflitto. Per questo motivo, nessun servizio gira direttamente sul sistema operativo host. Utilizzo <strong>Docker</strong> e <strong>Docker Compose</strong> per gestire l'intero stack. Il routing del traffico è gestito elegantemente da <em>Nginx Proxy Manager</em>, che si occupa in automatico anche di generare e rinnovare i certificati SSL.</p>

      <h3>Il Mio Stack</h3>
      <p>Se dai un'occhiata alla <a href="https://github.com/comitanigiacomo/homelab" target="_blank">repository dell'homelab</a>, troverai i file <code>docker-compose</code> esatti che utilizzo. Ecco i servizi principali che tengono tutto in piedi:</p>
      <ul>
        <li><strong>Vaultwarden:</strong> Un server Bitwarden super leggero scritto in Rust. Gestire autonomamente le mie password mi dà una tranquillità totale.</li>
        <li><strong>Pi-hole:</strong> Ad-blocker a livello di rete. Intercetta le richieste DNS e scarta quelle dirette ai network pubblicitari. È anche incredibilmente affascinante vedere esattamente cosa cerchino di pingare in background i tuoi dispositivi.</li>
        <li><strong>Portainer:</strong> Una comoda GUI per gestire i container Docker, per quei giorni in cui non ho proprio voglia di digitare comandi da CLI.</li>
        <li><strong>Nextcloud:</strong> La mia alternativa personale e self-hosted a Google Drive. Perfetta per tenere sincronizzati tutti i miei appunti universitari e file personali.</li>
      </ul>

      <h3>La Parte Migliore: il Disaster Recovery</h3>
      <p>La vera bellezza di questo approccio containerizzato? Se l'hardware del mio server dovesse friggersi domani, non andrei nel panico. Prendo una macchina Debian pulita, installo Docker, faccio un <code>git clone</code> del mio repo, tiro su i container e sono di nuovo online in pochi minuti. È semplice, minimale e, soprattutto, funziona.</p>
    `,
  },

  'sliding-window': {
    content: `
      <p>Se dai un'occhiata alla mia <a href="https://github.com/comitanigiacomo/leetcode" target="_blank">repository LeetCode</a>, vedrai che ultimamente ho risolto parecchi problemi. Bilanciare le lezioni della magistrale, gli esami e la preparazione per i colloqui non è uno scherzo, ma la costanza ripaga. Tuttavia, per tantissimo tempo i problemi con "subarray" e "substring" sono stati la mia kryptonite. Il mio cervello ripiegava sempre sul brute force con cicli annidati, beccandosi invariabilmente quel temuto <em>Time Limit Exceeded (TLE)</em> sulle soluzioni in O(N²).</p>

      <p>Poi il pattern Sliding Window mi è finalmente entrato in testa, e onestamente mi è sembrato di sbloccare un cheat code.</p>

      <h3>Il Modello Mentale</h3>
      <p>L'idea centrale è questa: invece di ricalcolare tutto da zero per ogni possibile sottoarray, mantieni semplicemente una "finestra" di elementi. Immagina una vera e propria cornice fisica posizionata sopra un array. Man mano che sposti la finestra di uno step verso destra, devi fare solo due cose: <em>aggiungi</em> l'effetto del nuovo elemento che entra nella cornice, e <em>sottrai</em> l'effetto dell'elemento che ne è appena uscito.</p>

      <p>Non serve alcun secondo ciclo. Aggiorni semplicemente lo stato corrente.</p>

      <h3>In Pratica</h3>
      <p>Prendi il problema <em>2379: Minimum Recolors to Get K Consecutive Black Blocks</em>. Questa è una classica <strong>finestra fissa</strong>. Sai esattamente quanto deve essere larga la finestra (K). Ti basta mantenere quella finestra di dimensione K, contare le 'W' e farla scorrere lungo la stringa. Aggiorni il conteggio in tempo O(1) ad ogni passo. Boom, il tuo incubo in O(N²) si trasforma in una soluzione pulita e velocissima in O(N).</p>

      <p>Un altro ottimo esempio è <em>1052: Grumpy Bookstore Owner</em>. Qui ho usato una finestra fissa per trovare il numero massimo di clienti soddisfatti che puoi recuperare se il proprietario usa la sua tecnica segreta "non scorbutico" per un numero specifico di minuti. Calcoli i clienti soddisfatti di base, poi fai scorrere una finestra sui minuti in cui è "scorbutico" per trovare il momento ottimale in cui usare la tecnica.</p>

      <h3>Perché è Importante</h3>
      <p>Da studente di informatica, studi un sacco di algoritmi complessi, ma riconoscere i pattern è la vera chiave per sopravvivere a LeetCode. Una volta che smetti di memorizzare soluzioni specifiche e inizi a riconoscere gli invarianti di base (come "ho bisogno di una sequenza contigua che soddisfi la condizione X"), questi problemi diventano meccanici e persino divertenti da risolvere.</p>

      <p>La prossima volta che leggi la parola "subarray", non scrivere in automatico quel secondo ciclo <code>for</code>. Pensa alla finestra.</p>
    `,
  },

  'typst-vs-latex': {
    content: `
      <p>Se c'è una verità universale in una laurea magistrale in Informatica, è che prima o poi ti toccherà scrivere relazioni accademiche lunghe e complesse. Per il mio ultimo progetto sulla <em>Double Descent Analysis</em>, la scelta di default e indiscussa era ovviamente LaTeX. Ma onestamente, ho un conto in sospeso con l'attuale standard accademico.</p>

      <p>Non capisco davvero perché la gente insista a torturarsi con la sintassi convoluta di LaTeX. Siamo ingegneri e informatici, eppure accettiamo di lottare con un groviglio incomprensibile di backslash solo per centrare una tabella. Puoi ottenere esattamente lo stesso risultato professionale e pronto per la pubblicazione con <strong>Typst</strong>, ma con una sintassi che appartiene al 21° secolo.</p>

      <p>Per dimostrarmelo, non ho fatto il passaggio alla cieca. Ho fatto un vero e proprio test A/B. Ho scritto e consegnato la relazione del mio progetto <a href="https://github.com/comitanigiacomo/double-descent-analysis" target="_blank">sia in formato LaTeX che Typst</a>, proprio per confrontare i due workflow fianco a fianco.</p>

      <h3>L'Elefante nella Stanza: l'Inerzia Accademica</h3>
      <p>Prima di entrare nei pro e contro tecnici, affrontiamo il vero problema: la paura. Sono convinto che l'unico motivo per cui LaTeX sia ancora lo standard assoluto sia la pura inerzia accademica. Nessuno vuole essere il primo a cambiare, i professori pretendono file ".tex", e gli studenti sono terrorizzati all'idea di infrangere le linee guida di formattazione. Ma non appena esci da quella bolla, ti rendi conto di quanto tempo stai sprecando a combattere con il tool anziché scrivere i contenuti.</p>

      <h3>I Pro: Perché Typst Vince</h3>
      <ul>
        <li><strong>Tempi di Compilazione Istantanei:</strong> Typst è scritto in Rust, e si vede. Compila in modo praticamente istantaneo. LaTeX può impiegare svariati secondi, specialmente con documenti pesanti. Quando stai cercando disperatamente di sistemare la posizione di un grafico o di correggere un typo, avere un feedback visivo immediato è una svolta assoluta.</li>
        <li><strong>Sintassi Logica e Leggibile:</strong> Typst sembra un Markdown sotto steroidi. Niente più <code>\\begin{itemize}</code> e <code>\\end{itemize}</code> solo per fare un banale elenco puntato. Il codice è pulito, leggero, e puoi effettivamente leggere il file raw senza farti venire il mal di testa.</li>
        <li><strong>Scripting Nativo e Moderno:</strong> Scrivere cicli, condizionali o macro custom in LaTeX ti costringe a imparare un linguaggio macro bizzarro e vecchio di decenni. Typst, al contrario, ha un vero e proprio linguaggio di scripting moderno integrato. Se conosci un qualsiasi linguaggio di programmazione standard, sai già come scriptare in Typst.</li>
      </ul>

      <h3>I Contro: L'Ecosistema</h3>
      <p>Voglio essere obiettivo, quindi devo menzionare il lato negativo: l'ecosistema è ancora giovane. LaTeX ha un pacchetto per letteralmente qualsiasi cosa, dal disegnare circuiti elettrici complessi all'impaginare antica poesia greca. Typst sta recuperando terreno a una velocità incredibile, ma di tanto in tanto ti scontrerai con qualche requisito di formattazione di nicchia che dovrai costruirti da solo.</p>

      <h3>Il Verdetto</h3>
      <p>Per me, la velocità, la sintassi zero-friction e l'architettura moderna di Typst superano di gran lunga la temporanea mancanza di pacchetti oscuri. Ottengo esattamente la stessa qualità sul PDF finale, ma finisco di scrivere nella metà del tempo. Ci ho migrato tutti i miei appunti e le mie relazioni universitarie, e sinceramente non tornerei mai indietro.</p>
    `,
  },

  'double-descent': {
    content: `
      <p>Durante il corso di <em>Metodi Statistici per il Machine Learning</em> all'Università degli Studi di Milano, ho dedicato del tempo ad analizzare un fenomeno che stravolge il classico trade-off bias-varianza: la curva di rischio del <strong>Double Descent</strong>.</p>

      <p>Ho documentato l'intera analisi empirica, inclusi i grafici e l'implementazione custom degli stimatori, nella mia <a href="https://github.com/comitanigiacomo/double-descent-analysis" target="_blank">repository Double Descent Analysis</a>. Ecco un riassunto di cosa dimostra effettivamente il progetto e del perché questo concetto è oggi di fondamentale importanza.</p>

      <h3>I Limiti della Visione Classica</h3>
      <p>Nella teoria standard del Machine Learning, ci viene insegnato che aumentare la complessità del modello porta inevitabilmente all'overfitting. L'errore in fase di training cala man mano che il modello apprende, ma l'errore di test prima o poi risale, formando la ben nota curva a U.</p>

      <p>Tuttavia, questa visione classica non riesce a spiegare il Deep Learning moderno. Le reti neurali di oggi sono pesantemente sovraparametrizzate: hanno miliardi di parametri, un numero immensamente superiore a quello dei data point su cui vengono addestrate. Secondo la classica curva a U, questi modelli dovrebbero andare in overfitting catastrofico. Eppure, generalizzano sorprendentemente bene. Il fenomeno del Double Descent spiega esattamente perché ciò accade.</p>

      <h3>L'Esperimento e i Tre Regimi</h3>
      <p>Per studiare la cosa, ho evitato framework ad alto livello e ho implementato da zero la regressione OLS (Ordinary Least Squares), la regressione Ridge e il Minimum Norm Interpolator usando esclusivamente l'algebra lineare standard. Fittando modelli con un numero crescente di parametri (chiamiamolo <em>d</em>) su un dataset di <em>N</em> campioni, è possibile osservare l'errore di test attraversare tre regimi ben distinti.</p>

      <h4>1. Il Regime Sotto-parametrizzato (d &lt; N)</h4>
      <p>Questo è il dominio della statistica classica. Quando abbiamo meno parametri che punti dati, il modello si comporta esattamente come previsto. All'aumentare di <em>d</em>, la capacità del modello cresce, l'errore di test scende fino a un minimo, per poi iniziare a risalire lentamente non appena comincia a fare overfitting sul rumore di training. Questo descrive perfettamente la prima metà della curva del Double Descent.</p>

      <h4>2. La Soglia di Interpolazione (d = N)</h4>
      <p>Le cose si fanno problematiche quando il numero di parametri eguaglia esattamente il numero di dati. Su questa soglia, il modello ha l'esatta capacità necessaria per interpolare perfettamente ogni singolo punto di training, azzerando l'errore di addestramento.</p>

      <p>Dal punto di vista dell'algebra lineare, la matrice di covarianza diventa estremamente mal condizionata. Per costringere la funzione matematica a toccare esattamente ogni punto rumoroso, i pesi del modello esplodono a valori spropositati. Come diretta conseguenza, l'errore di test schizza al suo massimo assoluto. Se guardi i grafici dell'errore nella mia repo, noterai un picco enorme e aguzzo proprio in corrispondenza di questa soglia.</p>

      <h4>3. Il Regime Sovra-parametrizzato (d &gt; N)</h4>
      <p>Qui è dove la teoria standard viene superata. Una volta oltrepassata la soglia, avendo un numero di parametri strettamente superiore ai dati, l'errore di test non rimane alto. Al contrario, comincia di nuovo a scendere: ecco la seconda discesa.</p>

      <p>Spesso, raggiunge un valore addirittura inferiore al minimo toccato nel regime sotto-parametrizzato. Questo spiega perché i modelli massicci e sovraparametrizzati ottengano performance così elevate.</p>

      <h3>Il Ruolo del Minimum Norm Interpolator</h3>
      <p>Perché l'errore crolla quando aggiungiamo ulteriori parametri? Quando <em>d &gt; N</em>, il sistema di equazioni è sottodeterminato. Non abbiamo più un'unica soluzione in grado di fittare perfettamente i dati; ne abbiamo infinite.</p>

      <p>Quando calcoliamo la soluzione (nel mio caso, usando la pseudo-inversa di Moore-Penrose), stiamo implicitamente selezionando il <strong>Minimum Norm Interpolator</strong>. Tra gli infiniti modi possibili di interpolare i dati con errore zero, questo specifico stimatore sceglie la soluzione con la norma dei pesi più piccola possibile.</p>

      <p>Mantenendo i pesi piccoli, la funzione risultante diventa molto più "regolare" (smooth). Evita di reagire bruscamente al rumore presente nei dati. Questa smoothness intrinseca agisce come una sorta di regolarizzazione implicita. Il modello non ha bisogno di una penalità esplicita per generalizzare bene; è proprio l'enorme vastità dello spazio dei parametri a permettergli di trovare un fit esatto, ma al contempo più semplice e lineare.</p>

      <h3>Regolarizzazione Esplicita: La Regressione Ridge</h3>
      <p>Come step finale del progetto, ho analizzato l'effetto della regressione Ridge, che applica una penalità esplicita ai pesi grandi. Ciò che è interessante notare dai grafici risultanti è che l'aggiunta di una piccolissima quantità di regolarizzazione Ridge va ad appiattire completamente l'enorme picco di errore sulla soglia di interpolazione, creando un ponte fluido tra il regime sotto e sovra-parametrizzato.</p>

      <p>Comprendere il Double Descent permette di colmare il divario tra il classico statistical learning e il deep learning odierno. Ci dimostra che la sovraparametrizzazione non è per forza un problema da risolvere, ma una caratteristica che, in determinate condizioni, aiuta attivamente i modelli a generalizzare in modo migliore.</p>
    `,
  },

  'kanso-sync': {
    content: `
      <p>Di recente ho iniziato a sviluppare <strong>Kanso</strong>, un habit tracker personale. Avevo bisogno di un'app che funzionasse alla perfezione in modalità offline, senza l'ansia dei caricamenti infiniti ogni volta che perdevo la connessione. A dire il vero, però, costruire Kanso è stato molto più che risolvere un mio problema; è stata la scusa perfetta per obbligarmi a seguire un workflow di software engineering estremamente rigoroso e professionale.</p>

      <p>Puoi esplorare l'intera implementazione del backend nella mia <a href="https://github.com/comitanigiacomo/kanso-sync-engine" target="_blank">repository Kanso Sync Engine</a>, scritto totalmente in Go (1.22+).</p>

      <h3>Il Vero Obiettivo: Il Workflow prima della Sintassi</h3>
      <p>Come studenti di informatica, tendiamo a sviluppare pessime abitudini quando usiamo il version control nei nostri progetti personali. Facciamo commit dritti sul branch main, scriviamo messaggi incomprensibili e saltiamo a piè pari le code review. Con Kanso, il mio obiettivo principale era gestire Git in modo ineccepibile. Volevo trattare questa repository solitaria esattamente come se stessi lavorando all'interno di un team aziendale strutturato.</p>

      <p>Questo si è tradotto nell'adottare strategie di branching rigide, nel scrivere commit atomici e nel richiedere una vera e propria Pull Request prima di mergiare qualsiasi feature. Tuttavia, un approccio del genere richiede tempo. Per rendere sostenibile questo workflow, ho cambiato il mio modo di scrivere codice: mi sono affidato pesantemente all'AI.</p>

      <p>Invece di scrivere a mano ogni noiosa operazione CRUD o passare ore sulla documentazione per fare il setup dell'architettura iniziale, ho usato l'AI come pair-programmer. Mi è servita per validare rapidamente pattern architetturali e per generare tutto il boilerplate necessario. Questo mi ha permesso di smettere di fare il "dattilografo" per concentrarmi esclusivamente su system design, code review e sul mantenimento di una Git history impeccabile.</p>

      <h3>Strutturare il Backend: L'Architettura Esagonale</h3>
      <p>Grazie al tempo risparmiato, ho potuto progettare il backend con tutti i crismi utilizzando la <strong>Hexagonal Architecture</strong> (conosciuta anche come Ports and Adapters). Il concetto alla base è semplice ma potentissimo: la logica di business risiede al centro dell'applicazione e non ha la minima idea di cosa succeda nel mondo esterno.</p>

      <p>La logica di dominio ignora se l'API stia usando il framework Gin, o se i dati finiscano dentro PostgreSQL. Comunica esclusivamente tramite interfacce (le Porte). Le implementazioni reali (gli Adapter) le vengono iniettate dall'esterno. Questa rigida Separation of Concerns ha reso il sync engine non solo incredibilmente modulare, ma soprattutto facilissimo da testare senza dover mai tirare su un vero database per gli unit test.</p>

      <h3>Il Meccanismo di Sincronizzazione: Gestire Reti Inaffidabili</h3>
      <p>Sviluppare un'app offline-first significa che il client comanda per quanto riguarda le azioni immediate dell'utente, ma il server rimane la fonte della verità (Single Source of Truth) per lo stato globale. Sincronizzarli in modo affidabile è un bel rompicapo. Ho implementato due pattern fondamentali per riuscirci.</p>

      <h4>1. Delta-Sync e Soft Delete</h4>
      <p>Quando l'utente apre l'app, fargli scaricare l'intero database è una follia in termini di efficienza. Al contrario, Kanso utilizza un approccio Delta-Sync. Il client salva un timestamp (che fa da cursore dell'ultima sincronizzazione riuscita). Non appena torna online, manda questo timestamp al server in Go.</p>

      <p>Il server interroga PostgreSQL e restituisce unicamente i record modificati <em>dopo</em> quel preciso istante. Ma cosa succede se un utente elimina un'abitudine mentre è offline? Se il server cancellasse brutalmente la riga dal database, non avrebbe modo di notificare al client quell'eliminazione al sync successivo (poiché il record non esisterebbe più). Per arginare il problema, l'engine sfrutta i "soft delete". Un'abitudine cancellata ottiene semplicemente la valorizzazione del campo <code>deleted_at</code>. Il server spedisce questo record aggiornato al client, che capisce di doverlo far sparire dall'interfaccia.</p>

      <h4>2. Risolvere i Conflitti tramite Optimistic Locking</h4>
      <p>L'incubo peggiore nei sistemi distribuiti è la risoluzione dei conflitti. Immagina di spuntare un'abitudine dal telefono mentre sei in aereo (offline). Nello stesso momento, il tuo portatile a casa è disconnesso dalla rete, e tu modifichi il nome di quella stessa abitudine. Quando entrambi si ricollegano, come fa il server a stabilire quale sia la versione corretta?</p>

      <p>Ho gestito la casistica tramite l'Optimistic Locking basato sul versioning. Ogni record nel DB possiede un numero di versione. Quando il telefono sincronizza, trasmette la sua versione locale del record. Il server la confronta con la propria. Se matchano, il server applica l'aggiornamento e incrementa la versione. Quando poi il portatile cercherà di pusciare le sue modifiche allegando il vecchio numero di versione, il server rileverà il disallineamento e bloccherà istantaneamente la richiesta con un HTTP <code>409 Conflict</code>.</p>

      <p>A quel punto il client desktop è costretto a scaricare lo stato aggiornato dal server, fare il merge delle differenze in locale e ritentare la sync. Così si ha la garanzia matematica che i dati non vengano mai sovrascritti di nascosto.</p>

      <h3>Il Bug della Mezzanotte: Timezone e Aggregazioni</h3>
      <p>Se hai mai provato a programmare un contatore di streak giornaliere, saprai che gestire le date è l'inferno in terra. Un'azione completata all'1:00 di notte a Tokyo appartiene a un giorno di calendario radicalmente diverso rispetto alla stessa azione compiuta all'1:00 a Roma.</p>

      <p>La regola d'oro del backend è: salva sempre tutto in UTC. Tuttavia, calcolare la streak attuale di un utente significa per forza calcolare quando scatta la sua mezzanotte locale. Ho risolto forzando il client a includere il suo fuso orario IANA (es. <code>Europe/Rome</code>) negli header HTTP di ogni singola richiesta. Quando il server Go processa i dati, ricalcola dinamicamente i confini dei giorni locali basandosi su quell'header prima di fare qualsiasi calcolo statistico.</p>

      <h3>Sfruttare la Concurrency di Go</h3>
      <p>Per finire, Go si è confermato lo strumento ideale. Generare le statistiche o ricostruire l'andamento di una streak per un intero anno può essere un'operazione pesante a livello di calcolo. Grazie al modello di concorrenza di Go, ho potuto scaricare tutte queste computazioni su dei worker in background tramite le Goroutine. Sfruttando i classici WaitGroup di Go, mi sono assicurato che questi task potessero completarsi in sicurezza, consentendo al server di chiudersi tramite un graceful shutdown senza rischiare di corrompere alcun dato.</p>

      <p>Costruire questo engine è stata una palestra incredibile. Mi ha dimostrato empiricamente che adottare pratiche di ingegneria del software rigorose—come PR atomiche e architetture pulite—ti ripaga con gli interessi non appena la complessità del sistema comincia a lievitare.</p>
    `,
  },

  'nyt-stream': {
    content: `
      <p>Durante un recente progetto per l'università, ho dovuto analizzare un dataset di oltre 13 milioni di commenti estratti dal New York Times, con lo scopo di contare gli utenti unici attivi e di filtrare le discussioni per topic. L'inghippo? Non potevo semplicemente caricare il file in RAM. Usare i classici tool di batch-processing come pandas avrebbe innescato un immediato Out of Memory. Era l'occasione perfetta per scrivere algoritmi di data streaming da zero.</p>

      <h3>Simulare lo Stream</h3>
      <p>Prima di perdermi nei conti, mi serviva un sistema per simulare un flusso continuo di dati. Invece di leggere il file CSV a blocchi ingolfando la memoria, ho sfruttato la keyword <code>yield</code> di Python per creare un generatore lazy. In questo modo ho potuto processare il file letteralmente riga per riga, mantenendo il consumo di RAM costante e completamente slegato dalle dimensioni del dataset.</p>

      <h3>Flajolet-Martin e la Magia Bitwise</h3>
      <p>Per stimare il conteggio degli utenti unici con un ingombro in memoria di O(1), ho implementato l'algoritmo di Flajolet-Martin. L'intuizione geniale si basa sull'hashing degli ID utente e sul cercare il numero massimo di zeri finali (trailing zeros) nella loro rappresentazione binaria. Mi sono affidato alla libreria MurmurHash3 perché accetta seed arbitrari, permettendomi di generare agilmente le centinaia di funzioni hash indipendenti necessarie ad abbattere la varianza statistica.</p>

      <p>All'inizio convertivo gli hash in lunghe stringhe binarie e le scansionavo tramite un ciclo lineare per contare gli zeri. Le performance erano pietose: lo script ci metteva quasi 50 minuti per digerire il dataset. Così ho introdotto un trick bitwise: facendo un banale AND logico tra un hash e il suo complemento a due (<code>h & -h</code>) si riesce a isolare in un colpo solo il bit a 1 meno significativo. Questa microscopica modifica ha fatto crollare il tempo di esecuzione a un paio di minuti. Aggiornando poi l'architettura per usare l'approccio LogLog e moltiplicando tutto per il fattore di correzione canonico di 0.77351, sono riuscito a ottenere un margine d'errore di appena il 5%.</p>

      <h3>Filtrare i Topic con i Bloom Filter</h3>
      <p>La seconda metà della consegna prevedeva di filtrare solo i commenti postati sotto gli articoli della sezione "Science". Pensare di cavarsela con un albero di ricerca o un'hash table in un contesto di dati massivi reali non è scalabile, motivo per cui ho optato per un Bloom Filter.</p>

      <p>Ho pre-estratto una whitelist di 354 ID di articoli scientifici. Seguendo i dettami matematici, ho allocato 10 bit per ogni elemento (generando un array da 3540 bit) e ho applicato 7 funzioni di hash per massimizzare l'efficienza della struttura. I calcoli teorici mi garantivano un False Positive Rate dello 0.8%. Eppure, dopo aver sparato l'intero stream di milioni di commenti dentro al filtro, il False Positive Rate misurato empiricamente si è assestato su un eccellente 0.3%.</p>

      <p>Questo task mi ha ricordato a muso duro che padroneggiare la complessità spaziale e temporale a livello teorico è soltanto il primo step. È la spietata ottimizzazione a basso livello, come l'aritmetica bitwise, che rende questi algoritmi in grado di sopravvivere in produzione.</p>
    `,
  },

  'firmware-crypto-analysis': {
    content: `
      <p>Per la mia tesi triennale in Informatica all'Università degli Studi di Milano, ho deciso di indagare un tema che fa da ponte tra la crittografia di alto livello e il mondo a basso livello dei sistemi embedded: come sono implementate, all'atto pratico, le primitive crittografiche all'interno del firmware di uno smartphone.</p>

      <p>Usiamo i telefoni ogni santo giorno per accedere in banca, inviare messaggi privati e gestire dati ultra-sensibili. Eppure, il firmware che pilota il modem e i chip sottostanti è quasi sempre una totale black box, sorgenti chiusi, nessuna documentazione e praticamente zero controlli da parte di enti esterni. Volevo dare una risposta a un dubbio elementare: chi produce questi device implementa la crittografia in modo blindato, oppure cerca scorciatoie a discapito della sicurezza per guadagnare in performance e mantenere retrocompatibilità?</p>

      <p>Per scoprirlo non mi sono limitato a leggere scartoffie. Ho recuperato il dump binario raw di un firmware e ho dato il via a un'analisi statica che mi ha costretto a scontrarmi con architetture CPU insolite, protocolli vecchi come il cucco, e un infinito processo di esclusione per identificare la precisa libreria open-source che ci stava girando sotto.</p>

      <h3>1. Il Primo Contatto: Triaging del Binario</h3>
      <p>Il mio bersaglio era un banale file binario. Prima di sfoderare decompilatori complessi, i vecchi tool di Linux restano insuperabili. Sparargli un comando <code>file</code> mi ha fatto subito capire che avevo davanti un <code>ELF 32-bit LSB executable</code>. Little Endian, ma la vera svolta è stata l'etichetta <code>not stripped</code>. È stato un vero colpo di fortuna: significava che il firmware si portava ancora dietro i simboli di debug, compresi i nomi di tutte le funzioni e variabili in chiaro. Fare reverse engineering così diventa infinitamente più facile.</p>

      <p>Subito dopo, ho lanciato <code>strings</code> filtrandolo con <code>grep</code> per fiutare eventuali nomi in codice. Ha sputato fuori questa stringa: <code>HUAQIN_ROMP3_K6833V1_64_MDBIN_PCB01_MT6833_S00.MOLY_NR15_R3_MP_V4_3_P61.bin</code>. Mettendola sotto la lente, <strong>MT6833</strong> è la sigla di un chip MediaTek (generalmente venduto come Dimensity 700), mentre <strong>MOLY</strong> è l'identificativo standard che l'azienda usa per i suoi modem baseband. Bingo. Sapevo esattamente cosa stavo ispezionando: il cervello pulsante di un modem 5G.</p>

      <h3>2. Il Problema del nanoMIPS</h3>
      <p>Forte di queste info, ho dato il binario in pasto a Ghidra, il tool di reverse engineering open-source. Sapendo che era a 32-bit e conoscendo lo storico di MediaTek, ho configurato inizialmente il Language ID su MIPS standard.</p>

      <p>Fuoco d'artificio di errori. La decompilazione era un delirio, con Ghidra che piangeva per un mucchio di istruzioni ritenute non valide. Non era affatto un MIPS normale. Scavando nei datasheet delle architetture modem di MediaTek, ho scoperto che montano il core MIPS 17200, un processore che implementa il set di istruzioni <strong>nanoMIPS</strong>.</p>

      <p>Il nanoMIPS è un'architettura strana. A differenza del classico MIPS che fissa ogni istruzione a 32 bit, lui lavora con lunghezze variabili (16, 32 o 48 bit). Ottimo per comprimere il codice e farlo stare nella misera RAM di un modem embedded. Il guaio? Ghidra, out-of-the-box, non ne voleva sapere di decodificarlo.</p>

      <p>Dovevo trovare un modo per farglielo digerire. Con un po' di fortuna, ho recuperato un'estensione sperimentale scritta da NCC Group proprio per l'analisi dei baseband. Dopo averla compilata e iniettata in Ghidra, il caos assembly si è finalmente trasformato in un bellissimo pseudocodice C. Si poteva cominciare a fare sul serio.</p>

      <h3>3. Mappare le Primitive Crittografiche</h3>
      <p>Col codice in chiaro, ho iniziato a tracciare le chiamate crittografiche affidandomi a stringhe e cross-reference (XREF). Ho pescato i big match: Diffie-Hellman, DES, SHA-1, RSA e AES. A livello puramente matematico, sembravano implementati seguendo pedissequamente gli standard FIPS. Guardando però *come* venivano richiamati, sono saltate fuori scelte che facevano accapponare la pelle.</p>

      <h4>Diffie-Hellman: Il Fossile a 1024-bit</h4>
      <p>Esaminando l'algoritmo per lo scambio delle chiavi Diffie-Hellman, ho beccato funzioni che iniettavano parametri hardcodati. Spulciando quegli indirizzi di memoria, ho confermato la presenza di setup a 2048/224 e 2048/256 bit. Fin qui tutto bene. Il problema è emerso quando ho scovato una chiamata a <code>DH_get_1024_160</code>. Usare numeri primi a soli 1024 bit per un key exchange oggi è un azzardo tremendo, ed è ampiamente sotto i requisiti minimi di sicurezza del NIST.</p>

      <h4>DES: Il Disastro della Modalità ECB</h4>
      <p>Poi è toccato al DES (Data Encryption Standard). Ho verificato la presenza della chiave a 64 bit (con 56 bit reali) e dei canonici 16 round. Il vero scempio, però, era nella modalità di cifratura scelta. Il codice chiamava <code>DES_ecb_encrypt</code>.</p>
      <p>La modalità ECB (Electronic Codebook) è in assoluto una delle peggiori: non si avvale di alcun Vettore di Inizializzazione (IV). Cifrare due volte lo stesso identico blocco di testo in chiaro produrrà sempre lo stesso blocco cifrato. L'esempio classico è quello dell'immagine: se la cifri in ECB, ne vedi ancora i contorni. Trovare l'ECB in un modem moderno è da brividi, anche se è stato lasciato lì solo per non rompere qualche vecchio protocollo.</p>

      <h4>AES: Barattare Sicurezza per un po' di Velocità</h4>
      <p>L'AES (Advanced Encryption Standard) sembrava passabile. Gestiva le chiavi a 128, 192 e 256 bit e faceva il giusto numero di iterazioni (10, 12 e 14). Eppure, mettendo il naso negli accessi in memoria durante i cicli di cifratura, mancava all'appello la consueta S-BOX da 256 byte.</p>

      <p>Al suo posto, troneggiavano quattro mastodontici array da 1024 byte ciascuno. In gergo si chiamano <strong>T-table</strong>. Su CPU modeste come quelle dei sistemi embedded, i passaggi <em>ShiftRows</em> e <em>MixColumns</em> dell'AES succhiano parecchie risorse. Per tagliare i tempi, gli sviluppatori se li pre-calcolano e sbattono i risultati in queste enormi tabelle. Certo, l'AES così vola, ma apre una voragine catastrofica a livello hardware di cui ti parlo a breve.</p>

      <h3>4. Smascherare OpenSSL</h3>
      <p>Durante l'analisi, mi imbattevo continuamente in strutture <code>BIGNUM</code>, costanti magiche e firme di funzioni che urlavano "OpenSSL" da tutti i pori. Come ci insegna Bruce Schneier, non sono quasi mai i modelli matematici a cedere, ma chi li scrive in C. Se fossi riuscito a individuare il numero di versione esatto di OpenSSL compattato lì dentro, avrei potuto darlo in pasto ai database CVE e tirare fuori una valanga di falle note.</p>

      <p>A grandi linee, OpenSSL ha tre ere geologiche: i reperti 0.9.x, la famiglia 1.x.x, e la più recente 3.x. Ho proceduto a tentativi escludendo le opzioni impossibili:</p>

      <ul>
        <li><strong>Niente OpenSSL 3.0:</strong> La v3 ha stravolto il design, uccidendo gli "Engine" per far spazio ai "Provider". Ghidra mi mostrava decine di <code>ENGINE_load_private_key</code> e non c'era traccia di un <code>OSSL_PROVIDER</code>. Troppo vecchio.</li>
        <li><strong>Niente OpenSSL 1.1.x:</strong> Dalla 1.1.0 in su, la libreria si inizializza da sola. Nel firmware, però, trovavo chiamate esplicite a <code>SSL_library_init</code> e <code>OPENSSL_add_all_algorithms</code>. Eravamo di sicuro incagliati nella vecchia famiglia 1.0.x.</li>
        <li><strong>1.0.1 o 1.0.2?</strong> Per risolvere l'enigma, ho cercato l'implementazione del protocollo DTLS 1.2, introdotto solo dalla 1.0.2 in poi. Trovare <code>DTLSv1_2_client_method</code> nel dump è stato l'indizio decisivo, ma serviva una prova inconfutabile.</li>
      </ul>

      <h4>La Pistola Fumante</h4>
      <p>La certezza matematica me l'ha fornita un grosso refactoring avvenuto in OpenSSL 1.1.0: tutte le strutture dati interne sono diventate opache. Prima, se avevi una struttura <code>RSA</code>, potevi puntare direttamente al modulo matematico <code>n</code> scrivendo <code>rsa->n</code>. Dalla 1.1.0 in poi, se provi a farlo il compilatore ti insulta; devi per forza usare delle funzioni getter apposite, come <code>RSA_get0_key()</code>.</p>

      <p>Ho cercato la chiamata API <code>RSA_size()</code> nel disassemblato. Nel codice sorgente di OpenSSL 1.0.2, <code>RSA_size</code> è una macro che va a leggersi brutalmente il membro <code>n</code> scavando in memoria. Nella 1.1.1, è una funzione vera e propria che chiama i getter.</p>

      <p>Guardando lo pseudocodice su Ghidra, la situazione era lampante. Il firmware recuperava la grandezza del BIGNUM usando uno spudorato offset in memoria: <code>BN_num_bits(*(BIGNUM **) rsa->[offset])</code>. Nessuna traccia di <code>RSA_get0_key()</code>.</p>

      <p>Il verdetto era irrevocabile: <strong>il modem 5G faceva girare OpenSSL 1.0.2.</strong></p>

      <h3>5. Le CVE e gli Attacchi Side-Channel</h3>
      <p>Avere quella versione a bordo è un incubo per la sicurezza del terminale. La branch 1.0.2 di OpenSSL è morta ed è stata abbandonata il 31 Dicembre 2019. Tradotto: il core crittografico di questo smartphone è obsoleto e non vede una patch di sicurezza da una vita.</p>

      <p>Dando un'occhiata al National Vulnerability Database del NIST, ho appurato che il firmware si presta a svariati attacchi pubblici:</p>
      <ul>
        <li><strong>CVE-2016-2183 (SWEET32):</strong> Prende di mira cifrari a blocchi da 64-bit (sì, proprio il DES in ECB che avevo trovato), consentendo di risalire al testo in chiaro intercettando sessioni lunghe.</li>
        <li><strong>CVE-2016-0800 (DROWN):</strong> Un attacco micidiale cross-protocol in grado di bucare sessioni TLS sicure sfruttando la retrocompatibilità difettosa verso SSLv2.</li>
        <li><strong>CVE-2019-1559:</strong> Un classico attacco Padding Oracle che sfrutta gli errori restituiti dai server per decriptare traffico senza possedere le chiavi private.</li>
      </ul>

      <h4>L'Attacco Cache-Timing contro l'AES</h4>
      <p>La chicca finale, però, è la diretta conseguenza di quelle abnormi <strong>T-table</strong> scovate all'inizio.</p>

      <p>Pesando ben 4KB, quelle tabelle non riescono a entrare fisicamente all'interno della piccolissima e velocissima cache L1 del processore. Mentre l'algoritmo AES gira, deve pescare byte in giro per queste tabelle a seconda della chiave segreta e dei dati inseriti. Se il dato è già in cache, l'accesso è immediato (cache hit). Se deve chiederlo alla RAM principale, perde tempo (cache miss).</p>

      <p>Già nel 2005, il crittografo Daniel J. Bernstein ha teorizzato l'<strong>AES Cache-Timing Attack</strong>. Inondando di pacchetti il dispositivo e misurando i microsecondi impiegati per elaborare la risposta, un attaccante è in grado di tracciare la mappa dei cache hit e dei cache miss. Con un po' di analisi statistica su queste variazioni di latenza, è incredibilmente fattibile estrarre e ricostruire interamente la chiave AES a 128 o 256 bit.</p>

      <p>A causa di quella vecchia versione di OpenSSL compilata forzando ottimizzazioni T-table su un hardware embedded, il modem è vulnerabile a questo insidiosissimo side-channel attack.</p>

      <h3>Conclusione</h3>
      <p>Questa tesi è stata un bagno di realtà spettacolare sul mondo della sicurezza embedded. Mi ha dimostrato che avere una solidissima crittografia teorica non conta assolutamente nulla se ti disinteressi del ciclo di vita del tuo software. Puoi sfoggiare AES-256 e RSA-2048 ovunque, ma se poi per pigrizia, per non toccare codice legacy, o per risparmiare 100kb di RAM decidi di infilare tutto dentro a una libreria morta, il tuo device nasce già bucato.</p>

      <p>Per chi studia e programma, imparare le basi del reverse engineering non è solo per darsi arie: è in assoluto la miglior scuola per capire come *non* si debbano scrivere i sistemi.</p>
    `,
  },
};