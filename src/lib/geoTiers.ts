// Иллюстративное распределение гео по тирам — основной фокус на Tier 1/2,
// Tier 3 показан как менее плотное покрытие. ID — числовой код ISO 3166-1,
// как в топологии world-atlas/countries-110m.json.
export const tier1Countries = [
  { id: "643", name: "Россия" },
  { id: "398", name: "Казахстан" },
  { id: "112", name: "Беларусь" },
  { id: "860", name: "Узбекистан" },
  { id: "804", name: "Украина" },
  { id: "031", name: "Азербайджан" },
];

export const tier2Countries = [
  { id: "076", name: "Бразилия" },
  { id: "484", name: "Мексика" },
  { id: "032", name: "Аргентина" },
  { id: "170", name: "Колумбия" },
  { id: "604", name: "Перу" },
  { id: "152", name: "Чили" },
  { id: "840", name: "США" },
  { id: "124", name: "Канада" },
  { id: "276", name: "Германия" },
  { id: "616", name: "Польша" },
];

export const tierIdMap: Record<string, 1 | 2> = {
  ...Object.fromEntries(tier1Countries.map((c) => [c.id, 1 as const])),
  ...Object.fromEntries(tier2Countries.map((c) => [c.id, 2 as const])),
};

export const tier3Note = "Остальные гео — точечное покрытие, по запросу под бриф.";
