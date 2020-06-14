// default settings for the app

let defaultSettings = [
  {
    id: 1,
    settingTypeID: 1,
    title: "Стараюсь",
    value: "adequate",
    isActive: true,
  },
  {
    id: 2,
    settingTypeID: 1,
    title: "Смешу",
    value: "funny",
    isActive: false,
  },
  {
    id: 3,
    settingTypeID: 1,
    title: "Брежу",
    value: "insane",
    isActive: false,
  },
  {
    id: 4,
    settingTypeID: 2,
    title: "Случайная",
    value: "random",
    isActive: true,
  },
  {
    id: 5,
    settingTypeID: 2,
    title: "Работа",
    value: "work",
    isActive: false,
  },
  {
    id: 6,
    settingTypeID: 2,
    title: "Учеба",
    value: "study",
    isActive: false,
  },
  {
    id: 7,
    settingTypeID: 2,
    title: "Здоровье",
    value: "health",
    isActive: false,
  },
  {
    id: 8,
    settingTypeID: 2,
    title: "Семья",
    value: "family",
    isActive: false,
  },
  {
    id: 9,
    settingTypeID: 2,
    title: "Личное",
    value: "personal",
    isActive: false,
  },
  {
    id: 10,
    settingTypeID: 2,
    title: "Досуг",
    value: "leisure",
    isActive: false,
  },
  {
    id: 11,
    settingTypeID: 3,
    title: "Мужской",
    value: "masc",
    isActive: true,
  },
  {
    id: 12,
    settingTypeID: 3,
    title: "Женский",
    value: "femn",
    isActive: false,
  },
  {
    id: 13,
    settingTypeID: 4,
    title: "Прошлое",
    value: "past",
    isActive: false,
  },
  {
    id: 14,
    settingTypeID: 4,
    title: "Будущее",
    value: "futr",
    isActive: true,
  },
];

let settingTypes = [
  { id: 1, name: "plausibility", title: "Адекватность" },
  { id: 2, name: "theme", title: "Тема" },
  { id: 3, name: "sex", title: "Ваш пол" },
  { id: 4, name: "tense", title: "Время" },
];

export { defaultSettings, settingTypes };

const settings = {
  plausibility: {
    options: [
      {
        title: "Стараюсь",
        value: "adequate",
      },
      {
        title: "Смешу",
        value: "funny",
      },
      {
        title: "Брежу",
        value: "insane",
      },
    ],
    activeOption: {},
  },
  theme: {
    options: [
      {
        title: "Случайная",
        value: "random",
      },
      {
        title: "Работа",
        value: "work",
      },
      {
        title: "Учеба",
        value: "study",
      },
      {
        title: "Здоровье",
        value: "health",
      },
      {
        title: "Семья",
        value: "family",
      },
      {
        title: "Личное",
        value: "personal",
      },
      {
        title: "Досуг",
        value: "leisure",
      },
    ],
    activeOption: {},
  },
  sex: {
    options: [
      {
        title: "Мужской",
        value: "masc",
      },
      {
        title: "Женский",
        value: "femn",
      },
    ],
    activeOption: {},
  },
  tense: {
    options: [
      {
        title: "Прошлое",
        value: "past",
      },
      {
        title: "Будущее",
        value: "futr",
      },
    ],
    activeOption: {},
  },
};
