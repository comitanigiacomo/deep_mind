export const translations = {
  en: {
    // ── Navbar ──
    nav: {
      about: 'About',
      interests: 'Interests',
      skills: 'Skills',
      education: 'Education',
      projects: 'Projects',
      homelab: 'Homelab',
      research: 'Research',
      blog: 'Blog',
      contacts: 'Contacts',
    },

    // ── VerticalSectionIndicator ──
    sections: {
      about: 'About',
      skills: 'Skills',
      interests: 'Interests',
      education: 'Education',
      projects: 'Projects',
      homelab: 'Homelab',
      research: 'Research',
      blog: 'Blog',
      contacts: 'Contacts',
    },

    // ── About ──
    about: {
      eyebrow: "Hello, I'm",
      name: 'Jack',
      role: 'MSc Computer Science · University of Milan',
      langLine: 'Native Italian · English B2',
      currentlyLabel: 'Currently studying:',
      currentlyCourses: ['Numerical Calculus', 'Statistical Methods for Machine Learning'],
      bio1: 'CS graduate from Milan, focused on systems programming. Currently in my MSc, actively exploring the field. Still figuring out which corner of computer science I want to make my own.',
      bio2: 'My thesis analyzed how obsolete cryptographic libraries in mobile modems expose devices to a range of attacks, mapping the vulnerability surface and visualizing update trends to understand why these libraries stay outdated. Outside uni I run a self-hosted homelab, grind LeetCode, and write notes to organize my thoughts.',
      bio3: 'My goal is to find what truly excites me in this field and turn it into my work, so I never get bored.',
      statsYears: 'Years of CS',
      statsProjects: 'Projects',
      viewProjects: 'View Projects',
    },

    // ── Interests ──
    interests: {
      title: 'INTERESTS',
      items: [
        {
          number: '00',
          title: 'Computer Science',
          description: "I'm currently studying IT at university, following a lifelong interest in technology and problem-solving.",
          skills: ['Problem Solving', 'Critical Thinking', 'Tech Curiosity', 'Team Collaboration'],
        },
        {
          number: '01',
          title: 'Formula 1',
          description: 'Formula 1 has always fascinated me, I follow every race and enjoy learning about the technology and strategy behind the sport.',
          skills: ['Race Enthusiast', 'Strategic Thinking', 'Curiosity for Technology', 'Attention to Detail'],
        },
        {
          number: '02',
          title: 'Music',
          description: "I'm passionate about music, I listen to all kinds of genres and enjoy playing the drums in my free time.",
          skills: ['Rhythm & Timing', 'Creativity', 'Active Listening', 'Musical Expression'],
        },
        {
          number: '03',
          title: 'Anime',
          description: 'Anime is one of my biggest passions. I watch a wide variety of shows and enjoy the creativity and storytelling behind them.',
          skills: ['Anime Enthusiast', 'Strong Visual Sense', 'Narrative Curiosity', 'Consistent Watcher'],
        },
        {
          number: '04',
          title: 'Gym',
          description: "Going to the gym has become an important part of my routine. It helps me stay focused, build discipline, and improve both physically and mentally. I enjoy challenging myself and seeing progress over time. I'm currently on a short break due to my studies, but I'll be getting back to it soon.",
          skills: ['Discipline', 'Consistency', 'Self-Motivation', 'Goal-Oriented'],
        },
      ],
    },

    // ── Skills ──
    skills: {
      title: 'SKILLS',
    },

    // ── Education ──
    education: {
      title: 'EDUCATION',
      thesisLabel: 'Thesis',
      items: [
        {
          date: '2025 – 2026',
          title: 'Master of Science in Computer Science',
          institution: 'University of Milan',
          description: 'Currently pursuing my graduate degree with a focus on advanced computing concepts.',
          type: 'master',
          logo: '/Unimi-logo.png',
          active: true,
        },
        {
          date: '2021 – 2025',
          title: 'Bachelor of Science in Computer Science',
          institution: 'University of Milan',
          description: 'Undergraduate degree program focused on systems programming and software engineering.',
          thesis: 'Study and analysis of cryptographic functions used by mobile devices to protect sensitive data',
          type: 'bachelor',
          logo: '/Unimi-logo.png',
          active: false,
        },
        {
          date: '2016 – 2021',
          title: 'High School Diploma',
          institution: 'Leonardo Da Vinci State High School',
          description: 'Scientific curriculum',
          type: 'highschool',
          logo: '/leonardoDaVinci.png',
          active: false,
        },
      ],
    },

    // ── Projects ──
    projects: {
      title: 'PROJECTS',
      subtitle: 'A curated collection of my work across different domains',
      loading: 'Loading projects...',
      noProjects: 'No projects found.',
      updated: 'Updated',
      size: 'Size',
      archived: 'Archived',
      viewRepo: 'View Repository',
    },

    // ── Homelab ──
    homelab: {
      title: 'HOMELAB',
      subtitle: 'A single Debian machine running a full self-hosted stack. Secured via Tailscale with zero open ports. Everything containerized, keeping the host OS perfectly clean.',
      archTitle: 'homelab architecture',
      layers: {
        baremetal: 'Baremetal',
        storage: 'Storage',
        services: 'Services (Docker)',
        dns: 'DNS & Ingress',
        external: 'External Access',
      },
      stackTitle: 'Stack',
      viewGithub: 'View on GitHub',
      runningServices: 'Running Services',
      services: [
        { name: 'Glance', description: 'Dashboard for a quick overview of all running services.', tags: ['monitoring', 'dashboard'] },
        { name: 'Nginx Proxy Manager', description: 'Reverse proxy for internal SSL and service routing.', tags: ['networking', 'ssl', 'proxy'] },
        { name: 'Pi-hole', description: 'Network-wide ad blocking for every connected device.', tags: ['dns', 'networking', 'privacy'] },
        { name: 'Portainer', description: 'Docker container management and monitoring UI.', tags: ['docker', 'monitoring'] },
        { name: 'Nextcloud', description: 'Self-hosted cloud storage for files and server backups.', tags: ['storage', 'backup'] },
        { name: 'Immich', description: 'High-performance photo and video backup solution.', tags: ['media', 'backup'] },
        { name: 'Vaultwarden', description: 'Bitwarden-compatible password manager, synced across all devices.', tags: ['security', 'passwords'] },
        { name: 'Vikunja', description: 'Kanban-style task manager for university projects.', tags: ['productivity', 'tasks'] },
        { name: 'Kanso', description: 'Self-hosted habit tracker — my own project running in production.', tags: ['self-built', 'habits'], link: 'https://kanso.jack-lab.dev/' },
        { name: 'Portfolio', description: 'This very site, containerized and served via Nginx.', tags: ['self-built', 'web'], link: 'https://portfolio.jack-lab.dev/' },
      ],
    },

    // ── Research ──
    research: {
      title: 'RESEARCH',
      subtitle: 'Academic projects and analyses developed during my MSc in Computer Science at Università degli Studi di Milano.',
      viewRepo: 'View Repository',
      papers: [
        {
          id: 'double-descent',
          title: 'Double Descent Risk Curve',
          subtitle: 'Statistical Methods for Machine Learning',
          year: '2026',
          course: 'MSc Computer Science — UniMi',
          abstract: 'Empirical replication of the Double Descent phenomenon in linear models. Built from-scratch closed-form solutions for ordinary and ridge regression to validate that prediction error can decrease, increase, then decrease again as model complexity grows beyond the interpolation threshold.',
          tags: ['Machine Learning', 'Linear Regression', 'Ridge Regression', 'Python', 'Jupyter'],
          image: '/double-descent.png',
          github: 'https://github.com/comitanigiacomo/double-descent-analysis',
          color: '#06b6d4',
          methods: ['Closed-form OLS', 'Ridge Regression', 'Bias-Variance Analysis'],
        },
        {
          id: 'nyt-stream',
          title: 'NYT Stream Analysis',
          subtitle: 'Algorithm Design for Massive Data',
          year: '2026',
          course: 'MSc Computer Science — UniMi',
          abstract: 'Python implementation of Flajolet-Martin and Bloom Filter algorithms applied to a live stream of New York Times articles. Designed under strict O(1) RAM constraints using lazy evaluation to handle massive data in constant memory.',
          tags: ['Data Streaming', 'Bloom Filter', 'Flajolet-Martin', 'Python', 'Algorithms'],
          image: '/NYT-datastream.png',
          github: 'https://github.com/comitanigiacomo/NYT-Stream-Analysis',
          color: '#a855f7',
          methods: ['Bloom Filter', 'Flajolet-Martin', 'Lazy Evaluation'],
        },
      ],
    },

    // ── Blog ──
    blog: {
      title: 'BLOG',
      subtitle: 'Writeups on algorithms, homelab setups, and CS theory I find worth explaining properly.',
      featured: 'Featured',
      featuredExcerpt: 'Instead of a complex hypervisor setup or multiple Raspberry Pis, I went with a completely minimal approach: a single Debian machine where everything is containerized...',
      read: 'Read',
      all: 'All',
      titles: {
        'homelab-debian': 'How I self-host everything on a single Debian box',
        'sliding-window': 'Sliding Window: the pattern that unlocked 40+ problems for me',
        'typst-vs-latex': 'Why I switched from LaTeX to Typst for my university notes',
        'double-descent': 'Double Descent: when more data makes your model worse (then better)',
        'kanso-sync': 'Building an offline-first sync engine in Go',
        'nyt-stream': 'Processing 13M records in O(1) space: my dive into Data Streaming algorithms',
        'firmware-crypto-analysis': "Why algorithmic security isn't enough: Reverse engineering a mobile firmware",
      },
      excerpts: {
        'sliding-window': "Instead of recalculating everything from scratch for every possible subarray, you maintain a \"window\" of elements...",
        'typst-vs-latex': 'Faster compile times, a sane syntax, and native scripting. After one semester all my notes live in Typst...',
        'double-descent': 'An intuitive explanation of the double descent risk curve and why classical bias-variance decomposition breaks down...',
        'kanso-sync': "The design decisions behind Kanso's sync engine: Delta-Sync, Optimistic Locking, and conflict resolution...",
        'nyt-stream': 'Moving from static CSVs to real-time data: building a resilient, decoupled streaming pipeline using the New York Times API...',
        'firmware-crypto-analysis': 'Reverse engineering a mobile modem to uncover how obsolete OpenSSL libraries and AES T-table optimizations open the door to cache-timing attacks...',
      },
    },

    // ── Contacts ──
    contacts: {
      location: 'Milan, Italy',
    },

    // ── BlogPostPage ──
    blogPost: {
      back: 'Back',
      backAll: '← Back to all posts',
      notFound: 'Post not found',
      backPortfolio: '← Back to portfolio',
      thanks: 'Thanks for reading.',
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // ITALIANO
  // ─────────────────────────────────────────────────────────────────
  it: {
    // ── Navbar ──
    nav: {
      about: 'Chi sono',
      interests: 'Interessi',
      skills: 'Competenze',
      education: 'Formazione',
      projects: 'Progetti',
      homelab: 'Homelab',
      research: 'Ricerca',
      blog: 'Blog',
      contacts: 'Contatti',
    },

    // ── VerticalSectionIndicator ──
    sections: {
      about: 'Chi sono',
      skills: 'Competenze',
      interests: 'Interessi',
      education: 'Formazione',
      projects: 'Progetti',
      homelab: 'Homelab',
      research: 'Ricerca',
      blog: 'Blog',
      contacts: 'Contatti',
    },

    // ── About ──
    about: {
      eyebrow: 'Ciao, sono',
      name: 'Jack',
      role: 'Laurea Magistrale in Informatica · Università degli Studi di Milano',
      langLine: 'Madrelingua Italiano · Inglese B2',
      currentlyLabel: 'Attualmente sto studiando:',
      currentlyCourses: ['Calcolo Numerico', 'Metodi Statistici per il Machine Learning'],
      bio1: 'Laureato in Informatica a Milano, con un forte interesse per la programmazione di sistema. Attualmente sto frequentando la magistrale ed esplorando attivamente il settore. Sto ancora cercando di capire quale nicchia dell\'informatica fare mia.',
      bio2: 'La mia tesi ha analizzato come le librerie crittografiche obsolete nei modem mobile espongano i dispositivi a una serie di attacchi, mappando la superficie di vulnerabilità e visualizzando i trend di aggiornamento per capire perché queste librerie rimangano datate. Fuori dall\'università gestisco un homelab self-hosted, mi alleno su LeetCode e scrivo appunti per mettere in ordine i miei pensieri.',
      bio3: 'Il mio obiettivo è scoprire cosa mi entusiasma davvero in questo campo e farlo diventare il mio lavoro, in modo da non annoiarmi mai.',
      statsYears: 'Anni di Informatica',
      statsProjects: 'Progetti',
      viewProjects: 'Vedi Progetti',
    },

    // ── Interests ──
    interests: {
      title: 'INTERESSI',
      items: [
        {
          number: '00',
          title: 'Informatica',
          description: "Attualmente studio Informatica all'università, portando avanti una passione per la tecnologia e il problem solving che ho fin da piccolo.",
          skills: ['Problem Solving', 'Pensiero Critico', 'Curiosità Tecnologica', 'Lavoro in Team'],
        },
        {
          number: '01',
          title: 'Formula 1',
          description: "La Formula 1 mi ha sempre affascinato: seguo ogni gara e mi piace approfondire la tecnologia e la strategia che si celano dietro questo sport.",
          skills: ['Appassionato di Motori', 'Pensiero Strategico', 'Curiosità Tecnologica', 'Attenzione ai Dettagli'],
        },
        {
          number: '02',
          title: 'Musica',
          description: "Sono appassionato di musica, ascolto generi di ogni tipo e nel tempo libero mi diverto a suonare la batteria.",
          skills: ['Ritmo e Tempo', 'Creatività', 'Ascolto Attivo', 'Espressione Musicale'],
        },
        {
          number: '03',
          title: 'Anime',
          description: 'Gli anime sono una delle mie più grandi passioni. Guardo una grande varietà di serie e ne apprezzo molto la creatività e la narrazione.',
          skills: ['Appassionato di Anime', 'Forte Senso Visivo', 'Curiosità Narrativa', 'Spettatore Assiduo'],
        },
        {
          number: '04',
          title: 'Palestra',
          description: "Andare in palestra è diventata una parte fondamentale della mia routine. Mi aiuta a rimanere concentrato, sviluppare disciplina e migliorare sia fisicamente che mentalmente. Mi piace mettermi alla prova e vedere i progressi nel tempo. Al momento ho preso una breve pausa per via degli studi, ma riprenderò a breve.",
          skills: ['Disciplina', 'Costanza', 'Automotivazione', 'Orientamento agli Obiettivi'],
        },
      ],
    },

    // ── Skills ──
    skills: {
      title: 'COMPETENZE',
    },

    // ── Education ──
    education: {
      title: 'FORMAZIONE',
      thesisLabel: 'Tesi',
      items: [
        {
          date: '2025 – 2026',
          title: 'Laurea Magistrale in Informatica',
          institution: 'Università degli Studi di Milano',
          description: 'Attualmente sto frequentando la laurea magistrale, concentrandomi su concetti avanzati di informatica.',
          type: 'master',
          logo: '/Unimi-logo.png',
          active: true,
        },
        {
          date: '2021 – 2025',
          title: 'Laurea Triennale in Informatica',
          institution: 'Università degli Studi di Milano',
          description: 'Percorso di laurea triennale incentrato sulla programmazione di sistema e l\'ingegneria del software.',
          thesis: 'Studio e analisi delle funzioni crittografiche utilizzate dai dispositivi mobili per la protezione dei dati sensibili',
          type: 'bachelor',
          logo: '/Unimi-logo.png',
          active: false,
        },
        {
          date: '2016 – 2021',
          title: 'Diploma di Maturità Scientifica',
          institution: 'Liceo Scientifico Statale Leonardo Da Vinci',
          description: 'Indirizzo scientifico',
          type: 'highschool',
          logo: '/leonardoDaVinci.png',
          active: false,
        },
      ],
    },

    // ── Projects ──
    projects: {
      title: 'PROGETTI',
      subtitle: 'Una raccolta curata dei miei lavori in vari ambiti',
      loading: 'Caricamento progetti...',
      noProjects: 'Nessun progetto trovato.',
      updated: 'Aggiornato',
      size: 'Dimensioni',
      archived: 'Archiviato',
      viewRepo: 'Vedi Repository',
    },

    // ── Homelab ──
    homelab: {
      title: 'HOMELAB',
      subtitle: 'Una singola macchina Debian su cui gira uno stack completamente self-hosted. Messa in sicurezza tramite Tailscale con zero porte aperte verso l\'esterno. Tutto è containerizzato, mantenendo il sistema operativo host perfettamente pulito.',
      archTitle: 'Architettura Homelab',
      layers: {
        baremetal: 'Baremetal',
        storage: 'Storage',
        services: 'Servizi (Docker)',
        dns: 'DNS & Ingress',
        external: 'Accesso Esterno',
      },
      stackTitle: 'Stack',
      viewGithub: 'Vedi su GitHub',
      runningServices: 'Servizi in Esecuzione',
      services: [
        { name: 'Glance', description: 'Dashboard per una rapida panoramica di tutti i servizi in esecuzione.', tags: ['monitoring', 'dashboard'] },
        { name: 'Nginx Proxy Manager', description: 'Reverse proxy per il routing dei servizi e i certificati SSL interni.', tags: ['networking', 'ssl', 'proxy'] },
        { name: 'Pi-hole', description: 'Ad-blocker a livello di rete per ogni dispositivo connesso.', tags: ['dns', 'networking', 'privacy'] },
        { name: 'Portainer', description: 'Interfaccia grafica per la gestione e il monitoraggio dei container Docker.', tags: ['docker', 'monitoring'] },
        { name: 'Nextcloud', description: 'Cloud storage self-hosted per file e backup del server.', tags: ['storage', 'backup'] },
        { name: 'Immich', description: 'Soluzione ad alte prestazioni per il backup di foto e video.', tags: ['media', 'backup'] },
        { name: 'Vaultwarden', description: 'Password manager compatibile con Bitwarden, sincronizzato su tutti i miei dispositivi.', tags: ['security', 'passwords'] },
        { name: 'Vikunja', description: 'Task manager in stile Kanban per i progetti universitari.', tags: ['productivity', 'tasks'] },
        { name: 'Kanso', description: 'Habit tracker self-hosted — un mio progetto personale in produzione.', tags: ['self-built', 'habits'], link: 'https://kanso.jack-lab.dev/' },
        { name: 'Portfolio', description: 'Questo stesso sito, containerizzato e servito tramite Nginx.', tags: ['self-built', 'web'], link: 'https://portfolio.jack-lab.dev/' },
      ],
    },

    // ── Research ──
    research: {
      title: 'RICERCA',
      subtitle: 'Progetti accademici e analisi sviluppati durante la mia Laurea Magistrale in Informatica all\'Università degli Studi di Milano.',
      viewRepo: 'Vedi Repository',
      papers: [
        {
          id: 'double-descent',
          title: 'Double Descent Risk Curve',
          subtitle: 'Metodi Statistici per il Machine Learning',
          year: '2026',
          course: 'LM Informatica — UniMi',
          abstract: 'Replica empirica del fenomeno del Double Descent in modelli lineari. Ho implementato da zero soluzioni in forma chiusa per la regressione ordinaria (OLS) e Ridge, al fine di validare come l\'errore di predizione possa diminuire, aumentare e poi diminuire nuovamente man mano che la complessità del modello supera la soglia di interpolazione.',
          tags: ['Machine Learning', 'Regressione Lineare', 'Ridge Regression', 'Python', 'Jupyter'],
          image: '/double-descent.png',
          github: 'https://github.com/comitanigiacomo/double-descent-analysis',
          color: '#06b6d4',
          methods: ['OLS in forma chiusa', 'Regressione Ridge', 'Analisi Bias-Varianza'],
        },
        {
          id: 'nyt-stream',
          title: 'NYT Stream Analysis',
          subtitle: 'Algoritmi per Dati Massivi',
          year: '2026',
          course: 'LM Informatica — UniMi',
          abstract: 'Implementazione in Python degli algoritmi Flajolet-Martin e Bloom Filter, applicati a un flusso in tempo reale di articoli del New York Times. Progettato con stringenti vincoli di memoria RAM in O(1), utilizzando la valutazione lazy per gestire moli di dati massive in memoria costante.',
          tags: ['Data Streaming', 'Bloom Filter', 'Flajolet-Martin', 'Python', 'Algoritmi'],
          image: '/NYT-datastream.png',
          github: 'https://github.com/comitanigiacomo/NYT-Stream-Analysis',
          color: '#a855f7',
          methods: ['Bloom Filter', 'Flajolet-Martin', 'Valutazione Lazy'],
        },
      ],
    },

    // ── Blog ──
    blog: {
      title: 'BLOG',
      subtitle: 'Articoli su algoritmi, configurazioni homelab e concetti di informatica teorica che vale la pena spiegare per bene.',
      featured: 'In Primo Piano',
      featuredExcerpt: 'Invece di affidarmi a un setup complesso basato su hypervisor o a molteplici Raspberry Pi, ho optato per un approccio estremamente minimale: una singola macchina Debian in cui tutto è containerizzato...',
      read: 'Leggi',
      all: 'Tutti',
      titles: {
        'homelab-debian': 'Come faccio self-hosting di tutto su una singola macchina Debian',
        'sliding-window': 'Sliding Window: il pattern che mi ha sbloccato più di 40 problemi',
        'typst-vs-latex': 'Perché sono passato da LaTeX a Typst per i miei appunti universitari',
        'double-descent': 'Double Descent: quando aggiungere dati peggiora il modello (per poi migliorarlo)',
        'kanso-sync': 'Costruire un motore di sincronizzazione offline-first in Go',
        'nyt-stream': 'Elaborare 13M di record con spazio O(1): la mia analisi sugli algoritmi di Data Streaming',
        'firmware-crypto-analysis': 'Perché la sicurezza degli algoritmi non basta: reverse engineering di un firmware mobile',
      },
      excerpts: {
        'sliding-window': 'Invece di ricalcolare tutto da zero per ogni possibile subarray, si mantiene una "finestra" di elementi...',
        'typst-vs-latex': 'Tempi di compilazione rapidissimi, una sintassi sensata e scripting nativo. Dopo un semestre tutti i miei appunti sono scritti in Typst...',
        'double-descent': 'Una spiegazione intuitiva della curva di rischio del double descent e dei motivi per cui la classica scomposizione bias-varianza non è più sufficiente...',
        'kanso-sync': "Le decisioni architetturali alla base del motore di sincronizzazione di Kanso: Delta-Sync, Optimistic Locking e risoluzione dei conflitti...",
        'nyt-stream': 'Passare da file CSV statici a flussi di dati in tempo reale: come ho costruito una pipeline di streaming resiliente e disaccoppiata usando le API del New York Times...',
        'firmware-crypto-analysis': 'Reverse engineering di un modem mobile per scoprire in che modo le librerie OpenSSL obsolete e le ottimizzazioni AES T-table aprano la strada ad attacchi di tipo cache-timing...',
      },
    },

    // ── Contacts ──
    contacts: {
      location: 'Milano, Italia',
    },

    // ── BlogPostPage ──
    blogPost: {
      back: 'Indietro',
      backAll: '← Torna a tutti gli articoli',
      notFound: 'Articolo non trovato',
      backPortfolio: '← Torna al portfolio',
      thanks: 'Grazie per la lettura.',
    },
  },
};

export const t = (lang, path) => {
  const keys = path.split('.');
  let result = translations[lang];
  for (const key of keys) {
    if (result === undefined) return path;
    result = result[key];
  }
  return result ?? path;
};