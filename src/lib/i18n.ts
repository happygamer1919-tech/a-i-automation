export type Lang = 'ro' | 'ru' | 'en';

export const LANGS: Lang[] = ['ro', 'ru', 'en'];

export type Dict = {
  meta_title: string;
  meta_desc: string;

  nav_services: string;
  nav_process: string;
  nav_stack: string;
  nav_why: string;
  nav_contact: string;

  boot_line_1: string;
  boot_line_2: string;
  boot_line_3: string;
  boot_line_4: string;
  boot_line_5: string;
  boot_ready: string;

  hero_kicker: string;
  hero_title: string;
  hero_sub: string;
  hero_cta: string;
  hero_cta_secondary: string;
  hero_scroll_hint: string;

  problems_label: string;
  problems_title: string;
  problem_1: string;
  problem_2: string;
  problem_3: string;
  problem_4: string;

  services_label: string;
  services_title: string;
  tier1_label: string;
  tier1_title: string;
  tier1_subtitle: string;
  tier1_desc: string;
  tier1_deliverable: string;
  tier1_best: string;
  tier1_tag: string;
  popular: string;
  tier2_label: string;
  tier2_title: string;
  tier2_subtitle: string;
  tier2_desc: string;
  tier2_deliverable: string;
  tier2_best: string;
  tier3_label: string;
  tier3_title: string;
  tier3_subtitle: string;
  tier3_desc: string;
  tier3_deliverable: string;
  tier3_addon: string;
  tier3_best: string;
  deliverable: string;
  best_for: string;
  addon: string;

  process_label: string;
  process_title: string;
  step1_title: string;
  step1_desc: string;
  step2_title: string;
  step2_desc: string;
  step3_title: string;
  step3_desc: string;
  step4_title: string;
  step4_desc: string;
  step5_title: string;
  step5_desc: string;

  stack_label: string;
  stack_title: string;
  stack_sub: string;
  stack_tag_ai: string;
  stack_tag_auto: string;
  stack_tag_ops: string;
  stack_tag_comms: string;

  why_label: string;
  why_title: string;
  why_1: string;
  why_2: string;
  why_3: string;
  why_4: string;
  offer_label: string;
  offer_badge: string;
  offer_title: string;
  offer_lead: string;
  offer_1: string;
  offer_2: string;
  offer_3: string;
  offer_4: string;
  offer_cta: string;
  offer_note: string;

  contact_label: string;
  contact_title: string;
  contact_sub: string;
  form_name: string;
  form_phone: string;
  form_company: string;
  form_desc: string;
  form_submit: string;
  form_sending: string;
  form_sent: string;
  book_call: string;
  address: string;

  footer_tag: string;
  footer_rights: string;
};

const ro: Dict = {
  meta_title: 'A&I Automation — Automatizare AI pentru afaceri din Moldova',
  meta_desc: 'A&I Automation ajută afacerile din Moldova să elimine munca repetitivă cu instrumente AI, chatboți și agenți inteligenți.',

  nav_services: 'Servicii',
  nav_process: 'Proces',
  nav_stack: 'Arsenal',
  nav_why: 'De ce noi',
  nav_contact: 'Contact',

  boot_line_1: 'Inițializare A&I Core...',
  boot_line_2: 'Conectare la rețeaua neurală...',
  boot_line_3: 'Încărcare agenți de automatizare...',
  boot_line_4: 'Calibrare fluxuri de date...',
  boot_line_5: 'Sistem operațional.',
  boot_ready: 'PORNIRE SISTEM',

  hero_kicker: 'AUTOMATIZARE · AI · AGENȚI',
  hero_title: 'Automatizăm munca repetitivă din afacerea ta',
  hero_sub: 'Instrumente AI, chatboți și agenți inteligenți — implementați direct în operațiunile tale.',
  hero_cta: 'Audit Gratuit',
  hero_cta_secondary: 'Vezi cum lucrăm',
  hero_scroll_hint: 'Derulează pentru a iniția',

  problems_label: '// PROBLEMA',
  problems_title: 'Unde pierzi timp în fiecare zi?',
  problem_1: 'Echipa ta completează manual aceleași date în mai multe locuri',
  problem_2: 'Comunicarea internă e împrăștiată între email, chat și telefon',
  problem_3: 'Clienții așteaptă răspunsuri la întrebări care se repetă zilnic',
  problem_4: 'Planificarea și rapoartele se fac în Excel, fără automatizare',

  services_label: '// SERVICII',
  services_title: 'Ce oferim',
  tier1_label: 'Tier 01',
  tier1_title: 'Strategie & Instrumente',
  tier1_subtitle: 'Începe cu o fundație solidă',
  tier1_desc: 'Audităm fluxurile tale de lucru, identificăm ineficiențele și configurăm instrumentele potrivite (Notion, Slack, Trello, Miro — ce se potrivește operațiunii tale).',
  tier1_deliverable: 'Configurare personalizată + plan de acțiune documentat + sesiune de training (înregistrată).',
  tier1_best: 'Afaceri care știu că ceva e ineficient, dar nu sunt sigure ce sau unde.',
  tier1_tag: 'Punctul nostru de start — angajament minim, valoare maximă',
  popular: 'POPULAR',
  tier2_label: 'Tier 02',
  tier2_title: 'Chatboți & Automatizări',
  tier2_subtitle: 'Elimină procesele manuale',
  tier2_desc: 'Construim și implementăm boți și automatizări: boți de onboarding, programări, FAQ, calificare lead-uri — adaptați procesului tău specific.',
  tier2_deliverable: 'Automatizare implementată și testată pe platforma ta + documentație completă și walkthrough (înregistrat).',
  tier2_best: 'Afaceri care știu deja ce proces le consumă timpul și vor să-l automatizeze.',
  tier3_label: 'Tier 03',
  tier3_title: 'Agenți AI',
  tier3_subtitle: 'Capacitate operațională 24/7',
  tier3_desc: 'Implementăm un agent AI antrenat pe datele și procesele tale, care preia volumul de muncă al 1-2 angajați — funcționând non-stop, fără pauze.',
  tier3_deliverable: 'Agent AI implementat în operațiuni + documentație de performanță + training de predare.',
  tier3_addon: 'Retainer de optimizare continuă — pentru că agenții necesită ajustări pe măsură ce afacerea evoluează.',
  tier3_best: 'Afaceri cu sarcini repetitive, de volum mare, care trebuie să scaleze fără angajări suplimentare.',
  deliverable: 'Livrabil',
  best_for: 'Ideal pentru',
  addon: 'Add-on',

  process_label: '// PROCES',
  process_title: 'Cum lucrăm',
  step1_title: 'Audit gratuit',
  step1_desc: 'Analizăm operațiunile, identificăm unde pierzi timp și resurse.',
  step2_title: 'Propunere personalizată',
  step2_desc: 'Prezentăm soluția: ce va face, unde va funcționa, ce rezultate aștepți.',
  step3_title: 'Construcție & Testare',
  step3_desc: 'Dezvoltăm soluția, testăm intern înainte să atingă mediul tău.',
  step4_title: 'Implementare & Training',
  step4_desc: 'Implementăm în operațiunile tale, instruim echipa, documentăm totul.',
  step5_title: 'Suport continuu',
  step5_desc: 'Monitorizăm performanța, optimizăm, actualizăm pe măsură ce afacerea evoluează.',

  stack_label: '// ARSENAL',
  stack_title: 'Stiva noastră',
  stack_sub: 'Integrări native cu instrumentele pe care le folosești deja. Fără dependențe inutile.',
  stack_tag_ai: 'AI & LLM',
  stack_tag_auto: 'Automatizare',
  stack_tag_ops: 'Operațiuni',
  stack_tag_comms: 'Comunicare',

  why_label: '// DE CE NOI',
  why_title: 'De ce A&I Automation',
  why_1: 'Nu vindem soluții generice — construim pe procesele tale reale',
  why_2: 'Fiecare automatizare e testată înainte de a ajunge în operațiunile tale',
  why_3: 'Predăm totul documentat și cu training — nu depinzi de noi ca să funcționeze',
  why_4: 'Suport și optimizare continuă — nu doar livrare și plecare',
  offer_label: '// CLIENȚI FONDATORI',
  offer_badge: 'LOCURI LIMITATE',
  offer_title: 'Devino client fondator',
  offer_lead: 'Preluăm un număr limitat de clienți fondatori, în condiții preferențiale, în schimbul unui studiu de caz public documentat.',
  offer_1: 'Locuri limitate — doar câțiva parteneri în această etapă',
  offer_2: 'Preț preferențial de fondator, fixat de la început',
  offer_3: 'Un studiu de caz public, documentat, al proiectului nostru comun',
  offer_4: 'Acces direct la fondatori, de la primul apel până la livrare',
  offer_cta: 'Rezervă un loc de fondator',
  offer_note: 'Etapă de fondatori — locuri limitate.',

  contact_label: '// CONTACT',
  contact_title: 'Hai să discutăm',
  contact_sub: 'Primul audit e gratuit. Spune-ne cum funcționează afacerea ta și noi identificăm unde poți automatiza.',
  form_name: 'Nume',
  form_phone: 'Telefon',
  form_company: 'Numele companiei',
  form_desc: 'Scurtă descriere a afacerii',
  form_submit: 'Trimite mesajul',
  form_sending: 'Se trimite...',
  form_sent: 'Mesaj trimis. Revenim în 24h.',
  book_call: 'Rezervă un apel',
  address: 'Constantin Brîncuși 112, Chișinău, Moldova',

  footer_tag: 'Construit în Chișinău · Operăm global',
  footer_rights: 'Toate drepturile rezervate.',
};

const ru: Dict = {
  meta_title: 'A&I Automation — AI-автоматизация для бизнеса в Молдове',
  meta_desc: 'A&I Automation помогает бизнесу в Молдове устранить рутинную работу с помощью AI-инструментов, чат-ботов и интеллектуальных агентов.',

  nav_services: 'Услуги',
  nav_process: 'Процесс',
  nav_stack: 'Арсенал',
  nav_why: 'Почему мы',
  nav_contact: 'Контакт',

  boot_line_1: 'Инициализация A&I Core...',
  boot_line_2: 'Подключение к нейросети...',
  boot_line_3: 'Загрузка агентов автоматизации...',
  boot_line_4: 'Калибровка потоков данных...',
  boot_line_5: 'Система в сети.',
  boot_ready: 'ЗАПУСК СИСТЕМЫ',

  hero_kicker: 'АВТОМАТИЗАЦИЯ · AI · АГЕНТЫ',
  hero_title: 'Автоматизируем рутинную работу в вашем бизнесе',
  hero_sub: 'AI-инструменты, чат-боты и интеллектуальные агенты — внедрённые непосредственно в ваши операции.',
  hero_cta: 'Бесплатный аудит',
  hero_cta_secondary: 'Как мы работаем',
  hero_scroll_hint: 'Прокрутите для старта',

  problems_label: '// ПРОБЛЕМА',
  problems_title: 'Где вы теряете время каждый день?',
  problem_1: 'Ваша команда вручную вводит одни и те же данные в нескольких местах',
  problem_2: 'Внутренняя коммуникация разбросана между email, чатами и телефоном',
  problem_3: 'Клиенты ждут ответы на вопросы, которые повторяются каждый день',
  problem_4: 'Планирование и отчёты ведутся в Excel, без автоматизации',

  services_label: '// УСЛУГИ',
  services_title: 'Что мы предлагаем',
  tier1_label: 'Уровень 01',
  tier1_title: 'Стратегия и инструменты',
  tier1_subtitle: 'Начните с надёжного фундамента',
  tier1_desc: 'Проводим аудит рабочих процессов, выявляем неэффективности и настраиваем подходящие инструменты (Notion, Slack, Trello, Miro — что подходит вашей операции).',
  tier1_deliverable: 'Персонализированная настройка + документированный план действий + тренинг-сессия (с записью).',
  tier1_best: 'Бизнесов, которые знают, что что-то неэффективно, но не уверены что именно или где.',
  tier1_tag: 'Наша отправная точка — минимум обязательств, максимум ценности',
  popular: 'ПОПУЛЯРНЫЙ',
  tier2_label: 'Уровень 02',
  tier2_title: 'Чат-боты и автоматизации',
  tier2_subtitle: 'Устраните ручные процессы',
  tier2_desc: 'Создаём и внедряем ботов и автоматизации: онбординг-боты, боты для записи, FAQ, квалификация лидов — адаптированные под ваш процесс.',
  tier2_deliverable: 'Внедрённая и протестированная автоматизация на вашей платформе + полная документация и walkthrough (с записью).',
  tier2_best: 'Бизнесов, которые уже знают, какой процесс отнимает время, и хотят его автоматизировать.',
  tier3_label: 'Уровень 03',
  tier3_title: 'AI-агенты',
  tier3_subtitle: 'Операционная мощность 24/7',
  tier3_desc: 'Внедряем AI-агента, обученного на ваших данных и процессах, который берёт на себя объём работы 1-2 сотрудников — работая без перерывов и выходных.',
  tier3_deliverable: 'AI-агент, внедрённый в операции + документация по производительности + обучение для передачи.',
  tier3_addon: 'Ретейнер непрерывной оптимизации — потому что агенты требуют настройки по мере развития бизнеса.',
  tier3_best: 'Бизнесов с повторяющимися задачами большого объёма, которым нужно масштабироваться без найма.',
  deliverable: 'Результат',
  best_for: 'Идеально для',
  addon: 'Дополнение',

  process_label: '// ПРОЦЕСС',
  process_title: 'Как мы работаем',
  step1_title: 'Бесплатный аудит',
  step1_desc: 'Анализируем операции, выявляем, где вы теряете время и ресурсы.',
  step2_title: 'Персонализированное предложение',
  step2_desc: 'Представляем решение: что оно будет делать, где работать, какие результаты ожидать.',
  step3_title: 'Разработка и тестирование',
  step3_desc: 'Разрабатываем решение, тестируем внутренне, прежде чем оно попадёт в вашу среду.',
  step4_title: 'Внедрение и обучение',
  step4_desc: 'Внедряем в ваши операции, обучаем команду, документируем всё.',
  step5_title: 'Постоянная поддержка',
  step5_desc: 'Мониторим производительность, оптимизируем, обновляем по мере развития бизнеса.',

  stack_label: '// АРСЕНАЛ',
  stack_title: 'Наш стек',
  stack_sub: 'Нативные интеграции с инструментами, которые вы уже используете. Без лишних зависимостей.',
  stack_tag_ai: 'AI и LLM',
  stack_tag_auto: 'Автоматизация',
  stack_tag_ops: 'Операции',
  stack_tag_comms: 'Коммуникация',

  why_label: '// ПОЧЕМУ МЫ',
  why_title: 'Почему A&I Automation',
  why_1: 'Мы не продаём универсальные решения — строим на ваших реальных процессах',
  why_2: 'Каждая автоматизация протестирована до того, как попадёт в ваши операции',
  why_3: 'Передаём всё с документацией и обучением — вы не зависите от нас для работы',
  why_4: 'Постоянная поддержка и оптимизация — не просто доставка и уход',
  offer_label: '// КЛИЕНТЫ-ОСНОВАТЕЛИ',
  offer_badge: 'МЕСТ ОГРАНИЧЕНО',
  offer_title: 'Станьте клиентом-основателем',
  offer_lead: 'Мы берём ограниченное число клиентов-основателей на преференциальных условиях — в обмен на публичный, документированный кейс.',
  offer_1: 'Ограниченное число мест — всего несколько партнёров в этом наборе',
  offer_2: 'Преференциальная цена основателя, зафиксированная сразу',
  offer_3: 'Публичный, документированный кейс нашего совместного проекта',
  offer_4: 'Прямой доступ к основателям — от первого звонка до запуска',
  offer_cta: 'Занять место основателя',
  offer_note: 'Набор основателей — мест ограничено.',

  contact_label: '// КОНТАКТ',
  contact_title: 'Давайте обсудим',
  contact_sub: 'Первый аудит бесплатный. Расскажите, как работает ваш бизнес, и мы определим, где можно автоматизировать.',
  form_name: 'Имя',
  form_phone: 'Телефон',
  form_company: 'Название компании',
  form_desc: 'Краткое описание бизнеса',
  form_submit: 'Отправить сообщение',
  form_sending: 'Отправка...',
  form_sent: 'Сообщение отправлено. Ответим в течение 24 часов.',
  book_call: 'Забронировать звонок',
  address: 'Константин Брынкушь 112, Кишинёв, Молдова',

  footer_tag: 'Построено в Кишинёве · Работаем глобально',
  footer_rights: 'Все права защищены.',
};

const en: Dict = {
  meta_title: 'A&I Automation — AI Automation for Businesses in Moldova',
  meta_desc: 'A&I Automation helps businesses in Moldova eliminate repetitive work with AI tools, chatbots, and intelligent agents.',

  nav_services: 'Services',
  nav_process: 'Process',
  nav_stack: 'Arsenal',
  nav_why: 'Why Us',
  nav_contact: 'Contact',

  boot_line_1: 'Initializing A&I Core...',
  boot_line_2: 'Connecting to neural mesh...',
  boot_line_3: 'Loading automation agents...',
  boot_line_4: 'Calibrating data streams...',
  boot_line_5: 'System online.',
  boot_ready: 'BOOT SYSTEM',

  hero_kicker: 'AUTOMATION · AI · AGENTS',
  hero_title: 'We automate the repetitive work in your business',
  hero_sub: 'AI tools, chatbots, and intelligent agents — deployed directly into your operations.',
  hero_cta: 'Free Audit',
  hero_cta_secondary: 'See how we work',
  hero_scroll_hint: 'Scroll to initiate',

  problems_label: '// PROBLEM',
  problems_title: 'Where do you lose time every day?',
  problem_1: 'Your team manually enters the same data in multiple places',
  problem_2: 'Internal communication is scattered across email, chat, and phone',
  problem_3: 'Customers wait for answers to questions that repeat daily',
  problem_4: 'Planning and reports are done in Excel, without automation',

  services_label: '// SERVICES',
  services_title: 'What we offer',
  tier1_label: 'Tier 01',
  tier1_title: 'Strategy & Tools',
  tier1_subtitle: 'Start with a solid foundation',
  tier1_desc: 'We audit your workflows, identify inefficiencies, and set up the right tools (Notion, Slack, Trello, Miro — whatever fits your operation).',
  tier1_deliverable: 'Customized tool setup + documented action plan + team training session (recorded).',
  tier1_best: "Businesses that know something's inefficient but aren't sure what or where.",
  tier1_tag: 'Our starting point — low commitment, high value',
  popular: 'POPULAR',
  tier2_label: 'Tier 02',
  tier2_title: 'Chatbots & Automations',
  tier2_subtitle: 'Eliminate manual processes',
  tier2_desc: 'We build and deploy bots and workflow automations: onboarding bots, booking bots, FAQ bots, lead qualification flows — tailored to your specific process.',
  tier2_deliverable: 'A deployed, tested automation on your platform + full documentation and walkthrough (recorded).',
  tier2_best: 'Businesses that already know which process eats their time and want it automated.',
  tier3_label: 'Tier 03',
  tier3_title: 'AI Agents',
  tier3_subtitle: '24/7 operational capacity',
  tier3_desc: 'We deploy an AI agent trained on your data and processes that handles the workload of 1-2 employees — running around the clock with no downtime.',
  tier3_deliverable: 'Deployed AI agent integrated into operations + performance documentation + handoff training.',
  tier3_addon: 'Ongoing optimization retainer — because agents need tuning as your business evolves.',
  tier3_best: 'Businesses with repetitive, high-volume tasks that need to scale without hiring.',
  deliverable: 'Deliverable',
  best_for: 'Best for',
  addon: 'Add-on',

  process_label: '// PROCESS',
  process_title: 'How we work',
  step1_title: 'Free audit',
  step1_desc: 'We analyze your operations, identify where you lose time and resources.',
  step2_title: 'Custom proposal',
  step2_desc: 'We present the solution: what it will do, where it will work, what results to expect.',
  step3_title: 'Build & Test',
  step3_desc: 'We develop the solution, test internally before it touches your environment.',
  step4_title: 'Implementation & Training',
  step4_desc: 'We implement into your operations, train the team, document everything.',
  step5_title: 'Ongoing support',
  step5_desc: 'We monitor performance, optimize, and update as your business evolves.',

  stack_label: '// ARSENAL',
  stack_title: 'Our stack',
  stack_sub: 'Native integrations with the tools you already use. No unnecessary dependencies.',
  stack_tag_ai: 'AI & LLM',
  stack_tag_auto: 'Automation',
  stack_tag_ops: 'Operations',
  stack_tag_comms: 'Communication',

  why_label: '// WHY US',
  why_title: 'Why A&I Automation',
  why_1: "We don't sell generic solutions — we build on your real processes",
  why_2: 'Every automation is tested before it reaches your operations',
  why_3: "We hand over everything documented with training — you don't depend on us to run it",
  why_4: 'Ongoing support and optimization — not just delivery and departure',
  offer_label: '// FOUNDING CLIENTS',
  offer_badge: 'LIMITED SLOTS',
  offer_title: 'Become a founding client',
  offer_lead: "We're taking on a limited number of founding clients at preferential terms — in exchange for a documented, public case study.",
  offer_1: 'Limited founding slots — only a few partners this cohort',
  offer_2: 'Preferential founder pricing, locked in from the start',
  offer_3: 'A documented, public case study of the work we do together',
  offer_4: 'Direct access to the founders, from first call to launch',
  offer_cta: 'Claim a founding spot',
  offer_note: 'Founding cohort — limited availability.',

  contact_label: '// CONTACT',
  contact_title: "Let's talk",
  contact_sub: "The first audit is free. Tell us how your business works and we'll identify where you can automate.",
  form_name: 'Name',
  form_phone: 'Phone',
  form_company: 'Company name',
  form_desc: 'Short description of your business',
  form_submit: 'Send message',
  form_sending: 'Sending...',
  form_sent: "Message sent. We'll get back within 24h.",
  book_call: 'Book a call',
  address: 'Constantin Brîncuși 112, Chișinău, Moldova',

  footer_tag: 'Built in Chișinău · Operating globally',
  footer_rights: 'All rights reserved.',
};

export const dictionaries: Record<Lang, Dict> = { ro, ru, en };
