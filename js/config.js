const CONFIG = {
  ITEMS: {
    wheat: {
      name: "Weizen",
      icon: "./img/Crops/Farming-Wheat.png",
    },
    corn: {
      name: "Mais",
      icon: "./img/Crops/Vegetables-Cornpng.png",
    },
    soy: {
      name: "Soja",
      icon: "./img/Crops/Allergens-Soy-Bean.png",
    },
    flour: {
      name: "Mehl",
      icon: "./img/Process/Cake-Flour.png",
    },
    popcorn: {
      name: "Popcorn",
      icon: "./img/Process/Popcorn.svg",
    },
    oil: {
      name: "Öl",
      icon: "./img/Process/soy_glass_5037435.png",
    },
  },
  CROPS: {
    wheat: {
      time: 20000,
      yield: { wheat: 1 },
    },
    corn: {
      time: 20000,
      yield: { corn: 1 },
    },
    soy: {
      time: 20000,
      yield: { soy: 1 },
    },
  },
  RECIPES: {
    flour: { in: { wheat: 2 }, out: { flour: 2 }, time: 30000 },
    popcorn: { in: { corn: 2 }, out: { popcorn: 1 }, time: 45000 },
    oil: { in: { soy: 2 }, out: { oil: 1 }, time: 60000 },
  },
  DEFAULT_STATE: {
    version: 1,
    gold: 0,
    inventory: { wheat: 0, corn: 0, soy: 0, flour: 0, popcorn: 0, oil: 0 },
    fields: [null],
    jobs: [],
  },
};

const { ITEMS, CROPS, RECIPES, DEFAULT_STATE } = CONFIG;
