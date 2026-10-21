/* Иллюстрации категорий (inline SVG, без внешних картинок) */
window.ICONS = {
  rods: '<svg viewBox="0 0 64 64" fill="none" stroke="#10323a" stroke-width="2.4" stroke-linecap="round"><path d="M8 58 L56 6"/><path d="M14 52 l-4 -4" stroke="#d9432a" stroke-width="4"/><circle cx="22" cy="44" r="4" fill="#fff"/><path d="M30 34 l3 3 M40 23 l2.5 2.5 M49 13 l2 2"/><path d="M56 6 C60 20 58 40 52 54" stroke="#5d6b2f" stroke-width="1.4" stroke-dasharray="2 3"/></svg>',
  reels: '<svg viewBox="0 0 64 64" fill="none" stroke="#10323a" stroke-width="2.4"><circle cx="30" cy="34" r="16" fill="#fff"/><circle cx="30" cy="34" r="6" stroke="#d9432a" stroke-width="3"/><path d="M46 34 h8 v-8" stroke-linecap="round"/><circle cx="54" cy="24" r="3" fill="#d9432a" stroke="none"/><path d="M30 18 V8 h14" stroke-linecap="round"/></svg>',
  lines: '<svg viewBox="0 0 64 64" fill="none" stroke="#10323a" stroke-width="2.4"><rect x="12" y="14" width="40" height="36" rx="3" fill="#fff"/><path d="M12 22 h40 M12 42 h40"/><path d="M16 26 h32 M16 30 h32 M16 34 h32 M16 38 h32" stroke="#5d6b2f" stroke-width="1.4"/><path d="M52 32 C60 32 60 50 50 56" stroke="#d9432a" stroke-width="1.6"/></svg>',
  lures: '<svg viewBox="0 0 64 64" fill="none" stroke="#10323a" stroke-width="2.4" stroke-linejoin="round"><path d="M8 32 C18 18 40 18 50 32 C40 46 18 46 8 32 Z" fill="#fff"/><path d="M50 32 l8 -8 v16 Z" fill="#d9432a" stroke="#d9432a"/><circle cx="18" cy="30" r="2.5" fill="#10323a"/><path d="M28 42 v8 a4 4 0 0 0 8 0" stroke-linecap="round"/><path d="M24 26 l12 12 M30 24 l10 10" stroke="#5d6b2f" stroke-width="1.4"/></svg>',
  tackle: '<svg viewBox="0 0 64 64" fill="none" stroke="#10323a" stroke-width="2.4" stroke-linecap="round"><path d="M32 4 V14"/><path d="M32 14 C24 14 24 30 32 34 C40 30 40 14 32 14 Z" fill="#d9432a" stroke="#d9432a"/><path d="M32 34 C26 34 26 44 32 46 C38 44 38 34 32 34 Z" fill="#fff"/><path d="M32 46 V52 a6 6 0 1 1 -6 6"/><path d="M26 58 l-3 -3"/></svg>'
};

window.CATEGORIES = [
  { id: "rods",   name: "Удилища",  note: "спиннинги, фидеры, поплавочные" },
  { id: "reels",  name: "Катушки",  note: "безынерционные и мультипликаторы" },
  { id: "lines",  name: "Лески и шнуры", note: "монолеска, плетёнка, флюорокарбон" },
  { id: "lures",  name: "Приманки", note: "воблеры, блёсны, силикон" },
  { id: "tackle", name: "Оснастка", note: "поплавки, крючки, грузила" }
];

/* Каталог: цены в рублях, характеристики — как на реальных упаковках */
window.PRODUCTS = [
  { id: "r1", cat: "rods", brand: "Volna", name: "Спиннинг «Окунь Лайт» 2.10 м", price: 3490, specs: ["2.10 м", "тест 3–15 г", "строй fast"], tag: "хит" },
  { id: "r2", cat: "rods", brand: "Volna", name: "Спиннинг «Щука Про» 2.70 м", price: 6890, specs: ["2.70 м", "тест 10–40 г", "углепластик IM8"] },
  { id: "r3", cat: "rods", brand: "Plavnik", name: "Фидер «Донка Классик» 3.60 м", price: 5290, specs: ["3.60 м", "до 100 г", "3 вершинки"] },
  { id: "r4", cat: "rods", brand: "Plavnik", name: "Маховое удилище «Карась» 5 м", price: 1690, specs: ["5.00 м", "6 колен", "180 г"] },
  { id: "k1", cat: "reels", brand: "Rechka", name: "Катушка безынерционная 2500", price: 2790, specs: ["5+1 подшипн.", "5.2:1", "0.25 мм/150 м"], tag: "хит" },
  { id: "k2", cat: "reels", brand: "Rechka", name: "Катушка фидерная 4000 с байтраннером", price: 4590, specs: ["7+1 подшипн.", "4.8:1", "фрикцион 8 кг"] },
  { id: "k3", cat: "reels", brand: "Severok", name: "Мультипликатор низкопрофильный", price: 7990, specs: ["7.1:1", "220 г", "левая рука"] },
  { id: "l1", cat: "lines", brand: "Nit", name: "Шнур плетёный PE 8X 150 м", price: 1290, specs: ["PE #0.8", "0.148 мм", "7.2 кг"], tag: "новинка" },
  { id: "l2", cat: "lines", brand: "Nit", name: "Монолеска «Прозрачная» 100 м", price: 390, specs: ["0.20 мм", "3.9 кг", "мягкая"] },
  { id: "l3", cat: "lines", brand: "Nit", name: "Флюорокарбон для поводков 30 м", price: 690, specs: ["0.30 мм", "6.1 кг", "невидим в воде"] },
  { id: "p1", cat: "lures", brand: "Kosatka", name: "Воблер минноу 90 мм, плавающий", price: 590, specs: ["90 мм", "10 г", "0.5–1.5 м"], tag: "хит" },
  { id: "p2", cat: "lures", brand: "Kosatka", name: "Блесна вращающаяся №3", price: 260, specs: ["№3", "8 г", "лепесток серебро"] },
  { id: "p3", cat: "lures", brand: "Kosatka", name: "Силиконовый виброхвост 3\", 6 шт.", price: 340, specs: ["76 мм", "6 шт.", "съедобный"] },
  { id: "t1", cat: "tackle", brand: "Plavnik", name: "Набор поплавков бальза, 5 шт.", price: 450, specs: ["1–4 г", "антенна 2 мм", "5 шт."] },
  { id: "t2", cat: "tackle", brand: "Plavnik", name: "Крючки с ушком №6–№12, 50 шт.", price: 230, specs: ["№6–12", "сталь", "50 шт."] },
  { id: "t3", cat: "tackle", brand: "Plavnik", name: "Кормушка фидерная «Метод» 40 г", price: 180, specs: ["40 г", "+ пресс-форма", "Method"] }
];
