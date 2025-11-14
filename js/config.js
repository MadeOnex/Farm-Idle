const CONFIG = {
  ITEMS: {
    wheat: {
      name: "Weizen",
      icon: "./img/Crops/Farming-Wheat.png",
      basePrice: 2.0, 
    },
    corn: {
      name: "Mais",
      icon: "./img/Crops/Vegetables-Cornpng.png",
      basePrice: 3.5, 
    },
    soy: {
      name: "Soja",
      icon: "./img/Crops/Allergens-Soy-Bean.png",
      basePrice: 4.5, 
    },
    flour: {
      name: "Mehl",
      icon: "./img/Process/Cake-Flour.png",
      basePrice: 8.0, 
    },
    popcorn: {
      name: "Popcorn",
      icon: "./img/Process/Popcorn.svg",
      basePrice: 12.0, 
    },
    oil: {
      name: "Öl",
      icon: "./img/Process/soy_glass_5037435.png",
      basePrice: 15.0, 
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
      time: 600000,     
      yield: { soy: 1 },
    },
  },
  RECIPES: {
    flour: {
      id: "flour",
      name: "Mehl herstellen",
      input: { wheat: 2 },
      output: { flour: 1 },
      time: 45000,     
    },
    popcorn: {
      id: "popcorn",
      name: "Popcorn herstellen",
      input: { corn: 2 },
      output: { popcorn: 1 },
      time: 60000,     
    },
    oil: {
      id: "oil",
      name: "Öl herstellen",
      input: { soy: 2 },
      output: { oil: 1 },
      time: 90000,    
    },
  },
  DEFAULT_STATE: {
    version: 1,
    gold: 0,
    inventory: { wheat: 0, corn: 0, soy: 0, flour: 0, popcorn: 0, oil: 0 },
    fields: [null, null],
    jobs: [],
    market: {
      prices: {},
      lastUpdate: 0,
      priceMultipliers: {},
    }
  },
};

const { ITEMS, CROPS, RECIPES, DEFAULT_STATE } = CONFIG;
