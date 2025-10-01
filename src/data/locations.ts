export const locationData = {
  airports: [
    "Tunis Carthage (TUN)",
    "Enfidha (NBE)",
    "Monastir (MIR)",
    "Djerba (DJE)",
    "Sfax (SFA)",
    "Tozeur (TOE)",
    "Tabarka (TBJ)"
  ],
  cities: [
    "Tunis",
    "La Marsa",
    "Sidi Bou Said",
    "Hammamet",
    "Nabeul",
    "Sousse",
    "Monastir",
    "Mahdia",
    "El Jem",
    "Kairouan",
    "Bizerte",
    "Tabarka",
    "Kelibia",
    "Korba",
    "Zaghouan",
    "Douz",
    "Tozeur",
    "Tataouine",
    "Matmata",
    "Gabès",
    "Sfax",
    "Djerba - Houmt Souk",
    "Djerba - Midoun",
    "Djerba - Aghir",
    "Zarzis"
  ],
  hotels: [
    "Hasdrubal Hammamet",
    "Hasdrubal Djerba",
    "Royal Thalassa Monastir",
    "The Residence Tunis",
    "El Mouradi Hammamet",
    "El Mouradi Sousse",
    "El Mouradi Mahdia",
    "Iberostar Royal El Mansour",
    "Iberostar Kantaoui Bay",
    "Iberostar Averroes Hammamet",
    "Radisson Blu Hammamet",
    "Radisson Blu Djerba",
    "Radisson Blu Sousse",
    "Four Seasons Gammarth",
    "Movenpick Sousse",
    "Movenpick Gammarth",
    "Sentido Bellevue Park",
    "Sentido Phenicia Hammamet",
    "Seabel Alhambra Sousse",
    "Seabel Rym Beach Djerba",
    "Dar El Marsa",
    "Villa Didon Carthage",
    "Magic Life Africana",
    "Magic Life Skanes"
  ]
};

export const getAllLocations = () => {
  return [
    ...locationData.airports,
    ...locationData.cities,
    ...locationData.hotels
  ];
};
