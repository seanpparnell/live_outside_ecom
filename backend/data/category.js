const parentCategories = [
  { name: "Men", order: 1 },
  { name: "Women", order: 2 },
  { name: "Cycle", order: 3 },
  { name: "Camp & Hike", order: 4 },
  { name: "Water", order: 5 },
  { name: "Men's Footwear", order: 6 },
  { name: "Women's Footwear", order: 7 },
];

const subCategories = [
  {
    name: "Sweatshirts",
    parentCategory: "Men",
    order: 1,
    iconPath: "/images/mens/icons/Icons_Mens_Hoodies.svg",
  },
  {
    name: "Shirts",
    parentCategory: "Men",
    order: 2,
    iconPath: "/images/mens/icons/Icons_Mens_Shirts.svg",
  },
  {
    name: "Jackets",
    parentCategory: "Men",
    order: 3,
    iconPath: "/images/mens/icons/Icons_Mens_Jacket.svg",
  },
  {
    name: "Shorts",
    parentCategory: "Men",
    order: 4,
    iconPath: "/images/mens/icons/Icons_Mens_Shorts.svg",
  },
  {
    name: "Pants",
    parentCategory: "Men",
    order: 5,
    iconPath: "/images/mens/icons/Icons_Mens_Pants.svg",
  },
  {
    name: "Sweatshirts",
    parentCategory: "Women",
    order: 1,
    iconPath: "/images/womens/icons/Icons_Womens_Hoodies.svg",
  },
  {
    name: "Shirts",
    parentCategory: "Women",
    order: 2,
    iconPath: "/images/womens/icons/Icons-Womens-Shirts.svg",
  },
  {
    name: "Jackets",
    parentCategory: "Women",
    order: 3,
    iconPath: "/images/womens/icons/Icons_Womens_Jacket.svg",
  },
  {
    name: "Shorts",
    parentCategory: "Women",
    order: 4,
    iconPath: "/images/womens/icons/Icons-Womens-Shorts.svg",
  },
  {
    name: "Pants",
    parentCategory: "Women",
    order: 5,
    iconPath: "/images/womens/icons/Icons_Womens_Pants.svg",
  },
  {
    name: "roadBikes",
    parentCategory: "Cycle",
    order: 1,
  },
  {
    name: "mountainBikes",
    parentCategory: "Cycle",
    order: 2,
  },
  {
    name: "cycleApparel",
    parentCategory: "Cycle",
    order: 3,
  },
  {
    name: "cycleAccessories",
    parentCategory: "Cycle",
    order: 4,
  },
  {
    name: "tentsCampHike",
    parentCategory: "Camp & Hike",
    order: 1,
  },
  {
    name: "sleepingBagsCampHike",
    parentCategory: "Camp & Hike",
    order: 2,
  },
  {
    name: "campStovesCampHike",
    parentCategory: "Camp & Hike",
    order: 3,
  },
  {
    name: "backpacksCampHike",
    parentCategory: "Camp & Hike",
    order: 4,
  },
  {
    name: "hydrationPacksCampHike",
    parentCategory: "Camp & Hike",
    order: 5,
  },
  {
    name: "paddleBoardsWater",
    parentCategory: "Water",
    order: 1,
  },
  {
    name: "paddleBoardPaddlesWater",
    parentCategory: "Water",
    order: 2,
  },
  {
    name: "accessoriesWater",
    parentCategory: "Water",
    order: 3,
  },
  {
    name: "athleticShoesMens",
    parentCategory: "Men's Footwear",
    order: 1,
  },
  {
    name: "bootsMens",
    parentCategory: "Men's Footwear",
    order: 2,
  },
  { name: "sandalsMens", parentCategory: "Men's Footwear", order: 3 },
  {
    name: "athleticShoesWomens",
    parentCategory: "Women's Footwear",
    order: 1,
  },
  {
    name: "bootsWomens",
    parentCategory: "Women's Footwear",
    order: 2,
  },
  {
    name: "sandalsWomens",
    parentCategory: "Women's Footwear",
    order: 3,
  },
];

export { parentCategories, subCategories };
