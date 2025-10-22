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
      time: 45000,
      yield: { corn: 1 },
    },
    soy: {
      time: 60000,
      yield: { soy: 1 },
    },
  },
  RECIPES: {
    flour: {
      id: "flour",
      name: "Mehl herstellen",
      input: { wheat: 2 },
      output: { flour: 1 },
      time: 10000, // TODO: Zeit anpassen
    },
    popcorn: {
      id: "popcorn",
      name: "Popcorn herstellen",
      input: { corn: 2 },
      output: { popcorn: 1 },
      time: 10000, // TODO: Zeit anpassen
    },
    oil: {
      id: "oil",
      name: "Öl herstellen",
      input: { soy: 2 },
      output: { oil: 1 },
      time: 10000, // TODO: Zeit anpassen
    },
  },
  DEFAULT_STATE: {
    version: 1,
    gold: 0,
    inventory: { wheat: 0, corn: 0, soy: 0, flour: 0, popcorn: 0, oil: 0 },
    fields: [null, null],
    jobs: [],
  },
};

const { ITEMS, CROPS, RECIPES, DEFAULT_STATE } = CONFIG;
