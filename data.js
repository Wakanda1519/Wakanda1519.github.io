/* ============================================================
   wakanda portfolio — КОНТЕНТ САЙТА
   ------------------------------------------------------------
   Редактируй только этот файл: добавляй/меняй/удаляй элементы
   массивов — сайт отрисует всё сам при загрузке.

   Порядок элементов в массиве = порядок карточек на странице.
   ============================================================ */

/* ---------- Блок «Серверы Rust» (бегущая строка) ---------- */
const RUST_SERVERS = [
  {
    name: 'БАТЯ RUST',
    desc: 'работа с донат-магазином',
    img:  'assets/ava2.jpg'
  },
  {
    name: 'Travaler Rust',
    desc: 'работа с донат-магазином',
    img:  'assets/ava3.jpg'
  },
  {
    name: 'Your Rusty Story',
    desc: 'разработка экосистемы',
    img:  'assets/ava1.jpg'
  },
  {
    name: 'Emerald Rust',
    desc: 'разработка донат-магазина',
    img:  'assets/ava4.jpg'
  },
  {
    name: 'Old Rust',
    desc: 'разработка сайта',
    img:  'assets/ava5.jpg'
  },
  {
    name: 'Magix Rust',
    desc: 'разработка донат-магазина',
    img:  'assets/ava6.jpg'
  },
  {
    name: 'Company Rust',
    desc: 'разработка донат-магазина',
    img:  'assets/ava7.jpg'
  },
  {
    name: 'Bummer Rust',
    desc: 'разработка донат-магазина',
    img:  'assets/ava8.jpg'
  },
  {
    name: 'Hi Rust',
    desc: 'разработка донат-магазина',
    img:  'assets/ava9.jpg'
  },
];

/* ---------- Блок «Избранные работы» (карточки проектов) ---------- */
/* category: id из FILTERS ниже.
   featured: true — проект «избранный»: поднимается в самое начало
   списка (можно поставить нескольким проектам, порядок между ними
   сохранится как в массиве). По умолчанию false — поле можно не писать.
   Ссылки в карточке (не пишешь поле — кнопки не будет):
     github — «Скачать»: ссылка на репозиторий
     buy    — «Купить за …»: продажа через Telegram, пиши цену строкой, напр. '2.999 ₽'
   gallery — массив фото для кнопки «Посмотреть»: откроется галерея с
   перелистыванием, миниатюрами и зумом по клику. Фото может быть сколько
   угодно — просто дописывай пути в массив. */
const WORKS = [
  {
    title: 'YRS — Web Site',
    desc: 'Сайт для установки игрового клиента и перехода на все ресурсы проекта (соц.сети, донат-магазин, тех-поддержка).',
    tags: ['Bootstrap', 'AOS.js', 'SEO'],
    img: 'assets/site1.png',
    category: 'sites',
    gallery: [
      'assets/site1.png', 
      'assets/site12.png', 
      'assets/site11.png'
    ]

  },
  {
    title: '404 Rust — Web Site',
    desc: 'Сайт для подключения к серверам проекта, просмотра статистики и перехода на все ресурсы проекта (соц.сети, донат-магазин, тех-поддержка).',
    tags: ['Bootstrap', 'AOS.js', 'SEO', 'Servers'],
    img: 'assets/site5.png',
    category: 'sites',
    gallery: ['assets/site5.png']
  },
  {
    title: 'Old Rust — Web Site',
    desc: 'Сайт для установки игрового клиента и перехода на все ресурсы проекта (соц.сети, донат-магазин, тех-поддержка).',
    tags: ['Bootstrap', 'AOS.js', 'SEO', 'Servers'],
    img: 'assets/site3.png',
    category: 'sites',
    gallery: ['assets/site3.png']
  },
  {
    title: 'YRS — Dashboard',
    desc: 'Панель управления всей экосистемой игрового проекта: менеджмент персонала, зарплаты, отчёты, удалённый доступ к серверу, статистика, логи и автоматизация всего, что только возможно.',
    tags: ['Bulma', 'AOS.js', 'SteamAuth', 'YouTube API', 'GameStores API', 'ООП'],
    img: 'assets/site2.png',
    category: 'dashboards',
    gallery: [
      'assets/site2.png',
      'assets/site21.png',
      'assets/site22.png',
      'assets/site23.png',
      'assets/site24.png',
      'assets/site25.png'
    ]
  },
  {
    title: 'GameStores — FunPay',
    desc: 'Сайт для автоматического пополнения баланса игрока через FunPay в магазине GameStores со списанием комиссии, с помощью сгенерированных ссылок через админку.',
    tags: ['Tailwind', 'GameStores API'],
    img: 'assets/site4.png',
    category: 'dashboards',
    gallery: ['assets/site4.png'],
    buy: '2.999 ₽'
  },
  {
    title: 'Free Style',
    desc: 'Редизайн стандартного стиля с улучшенным пользовательским интерфейсом. Красивые анимации и большое количество настроек.',
    tags: ['SwiperJS', 'Free'],
    img: 'assets/gs1.png',
    category: 'gamestores',
    featured: true,
    gallery: ['assets/gs1.png'],
    github: 'https://github.com/Wakanda1519/GameStores-Styles'
  },
  {
    title: 'Grand Style',
    desc: 'Современный и интерактивный стиль для донат-магазина с продающим дизайном. С ним ваши покупки увеличатся вдвое.',
    tags: ['For sell'],
    img: 'assets/gs2.png',
    category: 'gamestores',
    gallery: [
      'assets/gs2.png',
      'assets/gs21.png',
      'assets/gs22.png'
    ],
    buy: '4.999 ₽'
  },
  {
    title: 'Market Style',
    desc: 'Современный и интерактивный стиль с баннерами о выгодных предложениях. Запускайте акции и скидки, увеличивайте свои продажи.',
    tags: ['For sell'],
    img: 'assets/gs3.png',
    category: 'gamestores',
    gallery: ['assets/gs3.png'],
    buy: '3.499 ₽'
  },
  {
    title: 'Gray Style',
    desc: 'Строгий и приятный визуальный стиль. Только для по-настоящему серьёзных людей и проектов.',
    tags: ['SwiperJS', 'For sell'],
    img: 'assets/gs4.png',
    category: 'gamestores',
    gallery: ['assets/gs4.png'],
    buy: '2.999 ₽'
  },
  {
    title: 'White Style',
    desc: 'Светлый и выглядящий дорого стиль. Никакого лишнего шума для глаз — только товары и важная информация.',
    tags: ['For sell'],
    img: 'assets/gs7.png',
    category: 'gamestores',
    gallery: ['assets/gs7.png'],
    buy: '1.499 ₽'
  },
  {
    title: 'Magic Style',
    desc: 'Копия старого донат-магазина Magic Rust, но реализованная на GameStores.',
    tags: ['Archive'],
    img: 'assets/gs5.png',
    category: 'gamestores',
    gallery: ['assets/gs5.png']
  },
  {
    title: 'Rust Style',
    desc: 'Стиль, разработанный в визуальном оформлении игры Rust.',
    tags: ['SwiperJS'],
    img: 'assets/gs6.png',
    category: 'gamestores',
    gallery: ['assets/gs6.png']
  },
  {
    title: 'Emerald Style',
    desc: 'Стиль с акцентом на зелёный цвет.',
    tags: ['SwiperJS', 'RustApp API'],
    img: 'assets/gs8.png',
    category: 'gamestores',
    gallery: [
      'assets/gs8.png',
      'assets/gs81.png',
      'assets/gs82.png',
      'assets/gs83.png'
    ]
  },
    {
    title: 'Classic Style',
    desc: 'Стиль с акцентом на серый цвет.',
    tags: ['Archive'],
    img: 'assets/gs9.png',
    category: 'gamestores',
    gallery: [
      'assets/gs9.png'
    ]
  }
];

/* ---------- Фильтр над «Избранными работами» ---------- */
/* id из первого элемента должен быть 'all'.
   Дальше: id = значение category у проектов, label = надпись кнопки. */
const FILTERS = [
  { id: 'all',        label: 'Все' },
  { id: 'sites',      label: 'Сайты' },
  { id: 'dashboards', label: 'Дашборды' },
  { id: 'gamestores', label: 'Стили GameStores' }
];

/* ---------- Контакты (блок «Давайте работать вместе») ---------- */
/* icon: send (Telegram), github, vk, discord, mail */
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

/* ---------- Ссылки проекта «БАТЯ RUST» (панель «Мой RUST проект») ---------- */
/* icon: globe (сайт), book-open (wiki), shopping-cart (магазин), vk, discord, send (Telegram) */
const PROJECT_LINKS = [
  { label: 'Сайт',     href: 'https://yrsproject.ru', icon: 'globe' },
  { label: 'Магазин',  href: 'http://shop.yrsproject.ru/', icon: 'shopping-cart' },
  { label: 'VK',       href: 'https://vk.com/yrsrust', icon: 'vk' },
  { label: 'Discord',  href: 'https://discord.com/invite/n6XHgB5X3p', icon: 'discord' },
  { label: 'Telegram', href: 'https://t.me/yrs_rust', icon: 'send' }
];

/* ---------- Печатающиеся роли в hero ---------- */
/* Печатаются и стираются по кругу в порядке следования */
const PHRASES = [
  'Full-Stack разработчик',
  'Figma + Frontend + Backend',
  'Делаю стили для GameStores',
  'Прорабатываю UX/UI интерфейсов',
  'Администрирую сервера RUST'
];

/* Большая кнопка под контактами */
const CTA = {
  text: 'Написать мне',
  href: 'https://t.me/wakanda1519'
};
