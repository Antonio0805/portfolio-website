export const content = {
  en: {
    nav: {
      about: "About Me",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
      downloadCv: "Download CV",
      navigation: "Navigation",
      navigationHint: "Move through the portfolio quickly",
      langRo: "RO",
      langEn: "EN",
    },
    home: {
      badge: "Systems Engineering • Software • AI",
      title: "Computer Science graduate",
      titleAccent: "ready for what comes next in tech",
      paragraphs: [
        "Systems Engineering graduate from Politehnica University of Bucharest, focused on software development, AI workflows, and practical digital products with real-world value.",
        "I have built over 10 projects across web applications, automation, data analysis, embedded systems, and AI-based tools.",
        "I am looking for opportunities where I can contribute across frontend, backend, and AI integration while building production-ready solutions.",
      ],
      ctaProjects: "See My Projects",
      ctaContact: "Let's Connect",
      ctaExperience: "View Experience",
      points: [
        { value: "10+", label: "Projects delivered across software, automation, AI, and embedded systems" },
        { value: "4 roles", label: "Hands-on experience in SAP analytics, AI automation, data analysis, and team operations" },
        { value: "2022-2026", label: "Completed Systems Engineering studies backed by continuous personal work" },
      ],
      focusEyebrow: "Current focus",
      focusTitle: "Software, AI, and product-minded execution",
      focusText:
        "React interfaces, Python-based logic, AI APIs, and technical projects designed to be clean, scalable, and genuinely useful.",
      summary: [
        { title: "React", text: "Frontend interfaces with structured components and responsive layouts." },
        { title: "Python", text: "Automation, analysis, and logic-heavy tools for technical use cases." },
        { title: "AI APIs", text: "Experimenting with intelligent workflows and practical assistant features." },
        { title: "Systems", text: "Interest in architecture, optimization, and real-world integration." },
      ],
      cinema: {
        kicker: "Currently · SAP Analytics at Deloitte",
        rolePrefix: "Working across",
        roles: ["SAP Analytics", "Data Engineering", "Automation", "AI Workflows"],
        scrollCue: "Scroll",
        hud: ["SAP Datasphere", "SAC", "BW/4HANA", "Python"],
        band: ["SAP Analytics — Data — Automation — ", "Datasphere — SAC — BW/4HANA — Python — React — "],
      },
      stackLabel: "Working with",
      stack: ["SAP Business Data Cloud", "SAP Datasphere", "SAP Analytics Cloud", "SAP BW/4HANA", "Power BI", "Python", "SQL", "React", "Node.js", "Java", "Spring Boot", "OpenAI API", "AI Agents"],
    },
    projects: {
      eyebrow: "Projects",
      title: "Projects",
      lead: "A selection of projects showcasing full-stack development, data work, and embedded systems.",
      featured: "Featured",
      metrics: ["Full-stack workflow", "Database integration", "Real operational use case"],
      github: "GitHub",
      liveDemo: "Live Demo",
      live: "Live",
      demoSoon: "Live demo coming soon",
      projects: [
        {
          title: "EV Charge Optimizer",
          description:
            "Full-stack web application for planning and optimizing electric vehicle charging in Bucharest. It gathers real station data, displays it on an interactive map, and recommends the most suitable charging station through a weighted multi-criteria score that combines distance, cost, power, availability, and user preferences.",
          tags: ["React", "Node.js", "MySQL", "OpenStreetMap"],
          previewImage: "/Harta.png",
          demo: "https://youtu.be/Y8BnmQJLo0c",
          featured: true,
          metrics: ["510 stations mapped", "Weighted recommendation score", "Route planning"],
        },
        {
          title: "Tribunal Case Management",
          description:
            "Software application for managing court cases: cases, parties, lawyers, judges, hearings, and decisions. Full-stack architecture with database integration.",
          tags: ["React", "Node.js", "SQL Server"],
          github: "https://github.com/Antonio0805/TribunalCaseManagement",
          previewImage: "/tribunal.jpg",
          demo: "",
        },
        {
          title: "Film Collection Manager",
          description:
            "Web application for managing a personal movie collection with registration and login, movie listing, genre filtering, and CRUD operations for adding, editing, and deleting films. Includes role-based access, allowing administrators to manage the database while regular users explore the collection.",
          tags: ["Java", "Spring Boot", "MySQL"],
          github: "https://github.com/Antonio0805/FilmCollectionManager",
          demo: "https://youtu.be/sd8hF9CVy8g",
        },
        {
          title: "RecruitAI",
          description:
            "AI-powered recruitment web application that transforms job descriptions into LinkedIn Boolean search queries, identifies relevant candidates through Google Custom Search, and evaluates them automatically using Gemini AI.",
          tags: ["Next.js", "TypeScript", "Gemini AI"],
          github: "https://github.com/Antonio0805/recruitai",
          previewImage: "/recruit.png",
          demo: "",
        },
        {
          title: "Arduino Temperature & Humidity",
          description:
            "Arduino + DHT11 project measuring temperature/humidity and displaying results on a 16x2 LCD screen.",
          tags: ["Arduino", "Sensors", "Embedded"],
          github: "https://github.com/Antonio0805/Arduino_Temperature_and_Humidity",
          previewImage: "/arduino.jpeg",
          previewFit: "contain",
          demo: "",
        },
        {
          title: "Lyrics & Cover Art Generator",
          description:
            "Web application that generates song lyrics and AI-based album cover images from user input such as genre, theme, and language. It can also fetch lyrics, translate them automatically, and recommend similar songs using Python, Flask, OpenAI API, lyrics.ovh API, and deep-translator.",
          tags: ["Python", "Flask", "OpenAI API"],
          github: "https://github.com/Antonio0805/create-your-own-song",
          showcase: true,
          showcaseImages: ["/generare_1.jpeg", "/generare_2.jpeg", "/generare_3.jpeg", "/generare_4.jpeg"],
          demo: "",
        },
        {
          title: "OOP Project in C++",
          description:
            "Object-oriented programming project implemented in C++ showcasing classes, inheritance and modular structure.",
          tags: ["C++", "OOP", "Algorithms"],
          github: "https://github.com/Antonio0805/Project_OOP_in_C",
          previewImage: "/oop.png",
          demo: "",
        },
        {
          title: "Intelligent Surveillance System",
          description:
            "Embedded surveillance system designed to detect and track a person's movement using an ESP32-CAM module for image capture and an Arduino Uno for controlling the servomotors that move the camera.",
          tags: ["ESP32-CAM", "Arduino Uno", "Servo Motors"],
          github: "https://github.com/Antonio0805/Intelligent-Surveillance-System-Based-on-Motion-Sensor",
          demo: "https://youtube.com/shorts/D4NzKLzIOqg",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Work Experience",
      lead:
        "Early roles across AI experimentation, reporting, and operational support, each contributing to a broader software and systems perspective.",
      items: [
        {
          role: "SAP Analytics",
          company: "Deloitte",
          time: "Aug 2026 – Present",
          status: "Current role",
          bullets: [
            "Working on SAP analytics solutions with SAP Business Data Cloud, SAP Datasphere, SAP Analytics Cloud and SAP BW/4HANA.",
          ],
        },
        {
          role: "AI Automation Trainee",
          company: "Ventivo Grup",
          time: "Sep 2025",
          bullets: [
            "Developed and tested AI agents.",
            "Integrated AI tools into prototype applications.",
            "Experimented with AI automation platforms.",
          ],
        },
        {
          role: "Training & Team Building Intern",
          company: "Ascendis",
          time: "Dec 2025 – Mar 2026",
          bullets: [
            "Assisted with team-building and training sessions.",
            "Helped with corporate event preparation.",
            "Participated in the organization of several company events.",
          ],
        },
        {
          role: "Data Analyst Trainee",
          company: "Sunwave Pharma",
          time: "Jun 2025 – Aug 2025",
          bullets: [
            "Assisted with data analysis tasks using Power BI.",
            "Created and updated basic dashboards and reports.",
            "Supported the team in organizing and visualizing data.",
          ],
        },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Academic background",
      lead:
        "Technical systems training supported by a strong mathematics and computer science foundation.",
      label: "Education",
      items: [
        {
          school: "Politehnica University of Bucharest",
          program: "Faculty of Automatic Control and Computer Science • Master's Programme in e-Government (e-GOV)",
          time: "2026 – 2028",
          detail: "Master's degree",
          status: "In progress",
          current: true,
        },
        {
          school: "Politehnica University of Bucharest",
          program: "Faculty of Automatic Control and Computer Science • B.Sc. in Systems Engineering",
          time: "2022 – 2026",
          detail: "Bachelor's degree",
          status: "Completed",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical Skills and Professional Strengths",
      lead:
        "A structured overview of the technologies, engineering fundamentals, and collaboration skills I use to build reliable software and contribute effectively in team environments.",
      core: "Core capabilities",
      languagesTitle: "Languages",
      groups: [
        {
          title: "SAP & Analytics",
          items: ["SAP Business Data Cloud", "SAP Datasphere", "SAP Analytics Cloud (SAC)", "SAP BW/4HANA", "Power BI", "Excel"],
        },
        {
          title: "Development",
          items: ["Python", "SQL", "Java", "C++", "JavaScript", "React", "Node.js", "Spring Boot"],
        },
        {
          title: "AI & Tools",
          items: ["AI Agents & Automation", "OpenAI API", "Machine Learning", "Git", "GitHub"],
        },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "German", level: "Intermediate" },
        { name: "Spanish", level: "Basic" },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk",
      lead:
        "The fastest way to reach me is by email or LinkedIn. GitHub is the best place to review code and project history.",
      phone: "Phone",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      phoneHint: "Direct contact for quick conversations.",
      emailHint: "Best option for opportunities and collaboration.",
      githubHint: "Repositories, code samples, and technical projects.",
      linkedinHint: "Professional profile and networking contact.",
    },
  },
  ro: {
    nav: {
      about: "Despre Mine",
      experience: "Experienta",
      projects: "Proiecte",
      skills: "Skill-uri",
      education: "Educatie",
      contact: "Contact",
      downloadCv: "Descarca CV",
      navigation: "Navigare",
      navigationHint: "Mergi rapid prin portofoliu",
      langRo: "RO",
      langEn: "EN",
    },
    home: {
      badge: "Ingineria Sistemelor • Software • AI",
      title: "Absolvent pe zona de Computer Science",
      titleAccent: "pregatit pentru urmatoarele oportunitati din tech",
      paragraphs: [
        "Absolvent de Ingineria Sistemelor la Politehnica Bucuresti, concentrat pe dezvoltare software, workflow-uri AI si produse digitale practice cu valoare reala.",
        "Am construit peste 10 proiecte din zona de web, automatizare, analiza de date, embedded si aplicatii bazate pe AI.",
        "Caut oportunitati in care pot contribui pe frontend, backend si integrare AI, construind solutii pregatite pentru utilizare reala.",
      ],
      ctaProjects: "Vezi Proiectele",
      ctaContact: "Hai sa vorbim",
      ctaExperience: "Vezi Experienta",
      points: [
        { value: "10+", label: "Proiecte realizate in software, automatizare, AI si embedded" },
        { value: "4 roluri", label: "Experienta practica in SAP analytics, AI automation, analiza de date si operatiuni" },
        { value: "2022-2026", label: "Studii de Ingineria Sistemelor absolvite, sustinute de proiecte personale continue" },
      ],
      focusEyebrow: "Focus actual",
      focusTitle: "Software, AI si executie orientata spre produs",
      focusText:
        "Interfete React, logica in Python, AI APIs si proiecte tehnice gandite sa fie clare, scalabile si cu adevarat utile.",
      summary: [
        { title: "React", text: "Interfete frontend cu componente bine structurate si layout responsive." },
        { title: "Python", text: "Automatizare, analiza si aplicatii cu logica tehnica mai complexa." },
        { title: "AI APIs", text: "Experimente cu workflow-uri inteligente si functionalitati practice de asistenta." },
        { title: "Sisteme", text: "Interes pentru arhitectura, optimizare si integrare in cazuri reale." },
      ],
      cinema: {
        kicker: "In prezent · SAP Analytics la Deloitte",
        rolePrefix: "Lucrez in",
        roles: ["SAP Analytics", "Data Engineering", "Automatizare", "Workflow-uri AI"],
        scrollCue: "Deruleaza",
        hud: ["SAP Datasphere", "SAC", "BW/4HANA", "Python"],
        band: ["SAP Analytics — Date — Automatizare — ", "Datasphere — SAC — BW/4HANA — Python — React — "],
      },
      stackLabel: "Lucrez cu",
      stack: ["SAP Business Data Cloud", "SAP Datasphere", "SAP Analytics Cloud", "SAP BW/4HANA", "Power BI", "Python", "SQL", "React", "Node.js", "Java", "Spring Boot", "OpenAI API", "AI Agents"],
    },
    projects: {
      eyebrow: "Proiecte",
      title: "Proiecte",
      lead: "O selectie de proiecte care acopera dezvoltare full-stack, analiza de date si sisteme embedded.",
      featured: "Recomandat",
      metrics: ["Flux full-stack", "Integrare cu baza de date", "Caz de utilizare real"],
      github: "GitHub",
      liveDemo: "Demo Live",
      live: "Live",
      demoSoon: "Demo live in curand",
      projects: [
        {
          title: "EV Charge Optimizer",
          description:
            "Aplicatie web full-stack pentru planificarea si optimizarea incarcarii vehiculelor electrice in Bucuresti. Aduna date reale despre statii, le afiseaza pe o harta interactiva si recomanda cea mai potrivita statie printr-un scor multi-criterial ponderat care combina distanta, costul, puterea, disponibilitatea si preferintele utilizatorului.",
          tags: ["React", "Node.js", "MySQL", "OpenStreetMap"],
          previewImage: "/Harta.png",
          demo: "https://youtu.be/Y8BnmQJLo0c",
          featured: true,
          metrics: ["510 statii mapate", "Scor multi-criterial", "Planificare traseu"],
        },
        {
          title: "Tribunal Case Management",
          description:
            "Aplicatie software pentru gestionarea dosarelor din instanta: cazuri, parti, avocati, judecatori, termene si decizii. Arhitectura full-stack cu integrare baza de date.",
          tags: ["React", "Node.js", "SQL Server"],
          github: "https://github.com/Antonio0805/TribunalCaseManagement",
          previewImage: "/tribunal.jpg",
          demo: "",
        },
        {
          title: "Film Collection Manager",
          description:
            "Aplicatie web pentru gestionarea unei colectii personale de filme, cu inregistrare si autentificare, listare filme, filtrare dupa gen si operatii CRUD pentru adaugare, editare si stergere. Include acces pe roluri, unde administratorii pot gestiona baza de date, iar utilizatorii obisnuiti pot explora colectia.",
          tags: ["Java", "Spring Boot", "MySQL"],
          github: "https://github.com/Antonio0805/FilmCollectionManager",
          demo: "https://youtu.be/sd8hF9CVy8g",
        },
        {
          title: "RecruitAI",
          description:
            "Aplicatie web de recrutare bazata pe AI care transforma job descriptions in query-uri LinkedIn Boolean, identifica profiluri relevante prin Google Custom Search si le evalueaza automat cu Gemini AI.",
          tags: ["Next.js", "TypeScript", "Gemini AI"],
          github: "https://github.com/Antonio0805/recruitai",
          previewImage: "/recruit.png",
          demo: "",
        },
        {
          title: "Arduino Temperature & Humidity",
          description:
            "Proiect Arduino + DHT11 pentru masurarea temperaturii si umiditatii, cu afisare pe ecran LCD 16x2.",
          tags: ["Arduino", "Sensors", "Embedded"],
          github: "https://github.com/Antonio0805/Arduino_Temperature_and_Humidity",
          previewImage: "/arduino.jpeg",
          previewFit: "contain",
          demo: "",
        },
        {
          title: "Lyrics & Cover Art Generator",
          description:
            "Aplicatie web care genereaza versuri si coperti de album bazate pe AI pornind de la input-ul utilizatorului, precum gen, tema si limba. Poate prelua versuri existente, le poate traduce automat si recomanda melodii similare folosind Python, Flask, OpenAI API, lyrics.ovh API si deep-translator.",
          tags: ["Python", "Flask", "OpenAI API"],
          github: "https://github.com/Antonio0805/create-your-own-song",
          showcase: true,
          showcaseImages: ["/generare_1.jpeg", "/generare_2.jpeg", "/generare_3.jpeg", "/generare_4.jpeg"],
          demo: "",
        },
        {
          title: "OOP Project in C++",
          description:
            "Proiect de programare orientata pe obiecte implementat in C++, care evidentiaza clase, mostenire si structura modulara.",
          tags: ["C++", "OOP", "Algorithms"],
          github: "https://github.com/Antonio0805/Project_OOP_in_C",
          previewImage: "/oop.png",
          demo: "",
        },
        {
          title: "Intelligent Surveillance System",
          description:
            "Sistem embedded de supraveghere conceput pentru a detecta si urmari miscarea unei persoane folosind un modul ESP32-CAM pentru captarea imaginilor si un Arduino Uno pentru controlul servomotoarelor care misca camera.",
          tags: ["ESP32-CAM", "Arduino Uno", "Servo Motors"],
          github: "https://github.com/Antonio0805/Intelligent-Surveillance-System-Based-on-Motion-Sensor",
          demo: "https://youtube.com/shorts/D4NzKLzIOqg",
        },
      ],
    },
    experience: {
      eyebrow: "Experienta",
      title: "Experienta profesionala",
      lead:
        "Roluri timpurii in AI, raportare si suport operational, fiecare contribuind la o perspectiva mai larga asupra software-ului si sistemelor.",
      items: [
        {
          role: "SAP Analytics",
          company: "Deloitte",
          time: "Aug 2026 – Prezent",
          status: "Rol actual",
          bullets: [
            "Lucrez pe solutii de SAP analytics cu SAP Business Data Cloud, SAP Datasphere, SAP Analytics Cloud si SAP BW/4HANA.",
          ],
        },
        {
          role: "AI Automation Trainee",
          company: "Ventivo Grup",
          time: "Sep 2025",
          bullets: [
            "Am dezvoltat si testat agenti AI.",
            "Am integrat tool-uri AI in aplicatii prototip.",
            "Am experimentat cu platforme de automatizare AI.",
          ],
        },
        {
          role: "Training & Team Building Intern",
          company: "Ascendis",
          time: "Dec 2025 – Mar 2026",
          bullets: [
            "Am asistat la sesiuni de training si team-building.",
            "Am ajutat la pregatirea evenimentelor corporate.",
            "Am participat la organizarea mai multor evenimente ale companiei.",
          ],
        },
        {
          role: "Data Analyst Trainee",
          company: "Sunwave Pharma",
          time: "Jun 2025 – Aug 2025",
          bullets: [
            "Am asistat in task-uri de analiza de date folosind Power BI.",
            "Am creat si actualizat dashboard-uri si rapoarte de baza.",
            "Am sprijinit echipa in organizarea si vizualizarea datelor.",
          ],
        },
      ],
    },
    education: {
      eyebrow: "Educatie",
      title: "Parcurs academic",
      lead:
        "Formare tehnica in sisteme sustinuta de o baza solida in matematica si informatica.",
      label: "Educatie",
      items: [
        {
          school: "Universitatea Politehnica din Bucuresti",
          program: "Facultatea de Automatica si Calculatoare • Master e-Guvernare (e-GOV)",
          time: "2026 – 2028",
          detail: "Studii de master",
          status: "In desfasurare",
          current: true,
        },
        {
          school: "Universitatea Politehnica din Bucuresti",
          program: "Facultatea de Automatica si Calculatoare • Licenta in Ingineria Sistemelor",
          time: "2022 – 2026",
          detail: "Studii de licenta",
          status: "Absolvit",
        },
      ],
    },
    skills: {
      eyebrow: "Skill-uri",
      title: "Competente tehnice si puncte forte profesionale",
      lead:
        "O privire structurata asupra tehnologiilor, fundamentelor inginereesti si abilitatilor de colaborare pe care le folosesc pentru a construi software fiabil si pentru a contribui eficient in echipa.",
      core: "Capabilitati de baza",
      languagesTitle: "Limbi",
      groups: [
        {
          title: "SAP & Analiza",
          items: ["SAP Business Data Cloud", "SAP Datasphere", "SAP Analytics Cloud (SAC)", "SAP BW/4HANA", "Power BI", "Excel"],
        },
        {
          title: "Dezvoltare",
          items: ["Python", "SQL", "Java", "C++", "JavaScript", "React", "Node.js", "Spring Boot"],
        },
        {
          title: "AI & Tool-uri",
          items: ["Agenti AI & Automatizare", "OpenAI API", "Machine Learning", "Git", "GitHub"],
        },
      ],
      languages: [
        { name: "Engleza", level: "Fluent" },
        { name: "Germana", level: "Intermediar" },
        { name: "Spaniola", level: "Basic" },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Hai sa vorbim",
      lead:
        "Cea mai rapida metoda de contact este emailul sau LinkedIn. GitHub este locul potrivit pentru a vedea codul si istoricul proiectelor.",
      phone: "Telefon",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      phoneHint: "Contact direct pentru discutii rapide.",
      emailHint: "Cea mai buna varianta pentru oportunitati si colaborari.",
      githubHint: "Repository-uri, exemple de cod si proiecte tehnice.",
      linkedinHint: "Profil profesional si contact pentru networking.",
    },
  },
};
