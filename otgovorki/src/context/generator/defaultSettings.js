// default settings for the app

const defaultSettings = {
  plausibility: {
    settingType: "plausibility",
    title: "Адекватность",
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
    activeOption: {
      title: "Стараюсь",
      value: "adequate",
    },
  },
  theme: {
    settingType: "theme",
    title: "Тема",
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
    activeOption: {
      title: "Случайная",
      value: "random",
    },
  },
  sex: {
    settingType: "sex",
    title: "Ваш пол",
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
    activeOption: {
      title: "Мужской",
      value: "masc",
    },
  },
  tense: {
    settingType: "tense",
    title: "Время",
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
    activeOption: {
      title: "Будущее",
      value: "futr",
    },
  },
};

export { defaultSettings };
