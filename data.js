/* ---------- Блок «Серверы Rust» ---------- */
const RUST_SERVERS = [
  {
    name: 'БАТЯ RUST',
    desc: '',
    img:  'assets/ava2.jpg'
  },
  {
    name: 'Travaler Rust',
    desc: '',
    img:  'assets/ava3.jpg'
  },
  {
    name: 'Your Rusty Story',
    desc: '',
    img:  'assets/ava1.jpg'
  },
  {
    name: 'Emerald Rust',
    desc: '',
    img:  'assets/ava4.jpg'
  },
  {
    name: 'Old Rust',
    desc: '',
    img:  'assets/ava5.jpg'
  },
  {
    name: 'Magix Rust',
    desc: '',
    img:  'assets/ava6.jpg'
  },
  {
    name: 'Company Rust',
    desc: '',
    img:  'assets/ava7.jpg'
  },
  {
    name: 'Bummer Rust',
    desc: '',
    img:  'assets/ava8.jpg'
  },
  {
    name: 'Hi Rust',
    desc: '',
    img:  'assets/ava9.jpg'
  },
];

/* ---------- Блок «Избранные работы» ---------- */
const WORKS = [
  {
    title: 'YRS Web Site',
    desc: 'Сайт для установки игрового клиента и перехода на все ресурсы проекта (соц.сети, донат-магазин, тех-поддержка).',
    img: 'assets/site1.png',
    category: 'sites',
    gallery: [
      'assets/site1.png', 
      'assets/site12.png', 
      'assets/site11.png'
    ],
    watch: 'https://yrsproject.ru'
  },
  {
    title: 'YRS Dashboard',
    desc: 'Панель управления всей экосистемой игрового проекта: менеджмент персонала, зарплаты, отчёты, удалённый доступ к серверу, статистика, логи и автоматизация всего, что только возможно.',
    img: 'assets/site2.png',
    category: 'dashboards',
    gallery: [
      'assets/site2.png',
      'assets/site21.png',
      'assets/site22.png',
      'assets/site23.png',
      'assets/site24.png',
      'assets/site25.png'
    ],
    watch: 'https://work.yrsproject.ru'
  },
  {
    title: 'Free Style',
    desc: 'Редизайн стандартного стиля с улучшенным пользовательским интерфейсом. Красивые анимации и большое количество настроек.',
    img: 'assets/gs1.png',
    category: 'gamestores',
    featured: true,
    gallery: ['assets/gs1.png'],
    github: 'https://github.com/Wakanda1519/GameStores-Styles'
  },
  {
    title: 'Grand Style',
    desc: 'Современный и интерактивный стиль для донат-магазина с продающим дизайном. С ним ваши покупки увеличатся вдвое.',
    img: 'assets/gs2.png',
    category: 'gamestores',
    gallery: [
      'assets/gs2.png',
      'assets/gs21.png',
      'assets/gs22.png'
    ],
    watch: 'https://yrsproject.gamestores.app'
  },
  {
    title: 'Emerald Style',
    desc: 'Игровой UI/UX в современной тёмно-зелёной палитре с кастомными элементами интерфейса.',
    img: 'assets/gs8.png',
    category: 'gamestores',
    gallery: [
      'assets/gs8.png',
      'assets/gs81.png',
      'assets/gs82.png',
      'assets/gs83.png'
    ],
    watch: 'https://emeraldrust.ru'
  },
  {
    title: 'Desktop GoFastRDP',
    desc: 'Windows-клиент для хранения RDP-подключений и запуска сеансов в один клик.',
    img: 'assets/desk1.png',
    category: 'desk',
    gallery: [
      'assets/desk1.png'
    ],
    github: 'https://github.com/Wakanda1519/GoFastRDP'
  },
  {
    title: 'CLI Skin downloader',
    desc: 'Декомпилирует Rust.Workshop.dll с помощью ILSpyCMD, парсит класс Approved, группирует SkinID по Shortname и скачивает всё с помощью SteamCMD.',
    img: 'assets/cli1.jpg',
    featured: true,
    category: 'cli',
    gallery: ['assets/cli1.jpg'],
    github: 'https://github.com/Wakanda1519/Skin-downloader'
  },
  {
    title: 'CLI GoSecScan',
    desc: ' Cканер веб-уязвимостей: перебирает эндпоинты по словарю, проверяет Reflected XSS и SQL, при первом запуске сам создаёт базу сигнатур',
    img: 'assets/cli2.png',
    featured: true,
    category: 'cli',
    gallery: ['assets/cli2.png'],
    github: 'https://github.com/Wakanda1519/GoSecScan'
  },
  {
    title: 'CLI GoPick',
    desc: ' Cкачивает изображения с любого сайта, читает HTML, магазины GameStores, рендерит страницу в headless-браузере',
    img: 'assets/cli3.png',
    featured: true,
    category: 'cli',
    gallery: ['assets/cli3.png'],
    github: 'https://github.com/Wakanda1519/GoPick'
  }
];

/* ---------- Фильтр над «Избранными работами» ---------- */
const FILTERS = [
  { id: 'all',        label: 'Все' },
  { id: 'sites',      label: 'Сайты' },
  { id: 'dashboards', label: 'Дашборды' },
  { id: 'gamestores', label: 'Стили GameStores' },
  { id: 'desk', label: 'Десктоп' },
  { id: 'cli', label: 'CLI-утилиты' }
];

/* ---------- Контакты (блок «Давайте работать вместе») ---------- */
const CONTACTS = [
  {
    label: 'Telegram',
    value: '@wakanda1519',
    href:  'https://t.me/wakanda1519',
    icon:  'send',
    tone:  '#5fb8ad'
  },
  {
    label: 'GitHub',
    value: 'Wakanda1519',
    href:  'https://github.com/Wakanda1519',
    icon:  'github',
    tone:  '#b3b8c0'
  },
  {
    label: 'VK',
    value: 'vk.com/15wakanda',
    href:  'https://vk.com/15wakanda',
    icon:  'vk',
    tone:  '#6aa0d8'
  },
  {
    label: 'Discord',
    value: 'wakanda1519',
    href:  'https://discord.com/users/wakanda1519',
    icon:  'discord',
    tone:  '#a48fe6'
  }
];

/* ---------- Ссылки моего проекта ---------- */
const PROJECT_LINKS = [
  { label: 'Сайт',     href: 'https://yrsproject.ru', icon: 'globe' },
  { label: 'Магазин',  href: 'http://shop.yrsproject.ru/', icon: 'shopping-cart' },
  { label: 'VK',       href: 'https://vk.com/yrsrust', icon: 'vk' },
  { label: 'Discord',  href: 'https://discord.com/invite/n6XHgB5X3p', icon: 'discord' },
  { label: 'Telegram', href: 'https://t.me/yrs_rust', icon: 'send' }
];

/* ---------- Печатающиеся роли ---------- */
const PHRASES = [
  'Full-Stack разработчик',
  'Создаю Desktop-приложения на Go',
  'Автоматизирую рутинные бизнес-процессы',
  'Проектирую Web-приложения под ключ',
  'Разрабатываю экосистемы'
];


/* ---------- Кнопка ---------- */
const CTA = {
  text: 'Написать мне',
  href: 'https://t.me/wakanda1519'
};
