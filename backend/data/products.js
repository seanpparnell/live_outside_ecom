const products = [

  // MEN //
  {
    name: "North Face Classic Tee - Mens",
    description: "This is a really awesome tshirt! Buy it!",
    brand: "North Face",
    category: "Men",
    subCategory: "shirtsMens",
    price: 29.99,
    rating: 4,
    numReviews: 12,
    defaultColor: "blue",
    images: [
      {
        color: "blue",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/blue_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/blue_2.jpg",
        ],
      },
      {
        color: "green",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/green_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/green_2.jpg",
          "/images/mens/shirts/northFace_tshirt_1/green_3.jpg"
        ],
      },
      {
        color: "grey",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/grey_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/grey_2.jpg",
        ],
      },
      {
        color: "pink",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/pink_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/pink_2.jpg",
        ],
      },
      {
        color: "white",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/white_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/white_2.jpg",
        ],
      },
      {
        color: "yellow",
        path: [
          "/images/mens/shirts/northFace_tshirt_1/yellow_1.jpg",
          "/images/mens/shirts/northFace_tshirt_1/yellow_2.jpg",
          "/images/mens/shirts/northFace_tshirt"
        ],
      },
    ],
    variations: [
      {
        color: "blue",
        sizes: [
          { size: "small", countInStock: 1 },
          { size: "medium", countInStock: 2 },
          { size: "large", countInStock: 3 },
        ],
      },
      {
        color: "green",
        sizes: [
          { size: "small", countInStock: 4 },
          { size: "medium", countInStock: 5 },
          { size: "large", countInStock: 6 },
        ],
      },
      {
        color: "grey",
        sizes: [
          { size: "small", countInStock: 7 },
          { size: "medium", countInStock: 8 },
          { size: "large", countInStock: 9 },
        ],
      },
      {
        color: "pink",
        sizes: [
          { size: "small", countInStock: 10 },
          { size: "medium", countInStock: 11 },
          { size: "large", countInStock: 12 },
        ],
      },
      {
        color: "white",
        sizes: [
          { size: "small", countInStock: 13 },
          { size: "medium", countInStock: 14 },
          { size: "large", countInStock: 15 },
        ],
      },
      {
        color: "yellow",
        sizes: [
          { size: "small", countInStock: 16 },
          { size: "medium", countInStock: 17 },
          { size: "large", countInStock: 18 },
        ],
      },
    ],
  },

  // WOMEN //
  {
    name: "North Face Classic Tee - Womens",
    description: "This is a really awesome tshirt! Buy it!",
    brand: "North Face",
    category: "Women",
    subCategory: "shirtsWomens",
    price: 29.99,
    rating: 4,
    numReviews: 12,
    defaultColor: "black",
    images: [
      {
        color: "black",
        path: [
          "/images/womens/shirts/northFace_tshirt_1/black_1.jpg",
          "/images/womens/shirts/northFace_tshirt_1/black_2.jpg",
        ],
      },
      {
        color: "lavender",
        path: [
          "/images/womens/shirts/northFace_tshirt_1/lavender_1.jpg",
          "/images/womens/shirts/northFace_tshirt_1/lavender_2.jpg",
          "/images/womens/shirts/northFace_tshirt_1/lavender_3.jpg"
        ],
      },
      {
        color: "light-yellow",
        path: [
          "/images/womens/shirts/northFace_tshirt_1/light_yellow_1.jpg",
          "/images/womens/shirts/northFace_tshirt_1/light_yellow_2.jpg",
        ],
      },
      {
        color: "lime",
        path: [
          "/images/womens/shirts/northFace_tshirt_1/lime_1.jpg",
          "/images/womens/shirts/northFace_tshirt_1/lime_2.jpg",
          "/images/womens/shirts/northFace_tshirt_1/lime_3.jpg"
        ],
      },
    ],
    variations: [
      {
        color: "black",
        sizes: [
          { size: "small", countInStock: 1 },
          { size: "medium", countInStock: 2 },
          { size: "large", countInStock: 3 },
        ],
      },
      {
        color: "lavender",
        sizes: [
          { size: "small", countInStock: 4 },
          { size: "medium", countInStock: 5 },
          { size: "large", countInStock: 6 },
        ],
      },
      {
        color: "light-yellow",
        sizes: [
          { size: "small", countInStock: 7 },
          { size: "medium", countInStock: 8 },
          { size: "large", countInStock: 9 },
        ],
      },
      {
        color: "lime",
        sizes: [
          { size: "small", countInStock: 10 },
          { size: "medium", countInStock: 11 },
          { size: "large", countInStock: 12 },
        ],
      },
    ],
  },

  // CYLCE //
  {
    name: "Specialized Road Bike",
    description:
      "Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.",
    brand: "Specialized",
    category: "Cycle",
    subCategory: "roadBikes",
    price: 89.99,
    rating: 4.5,
    numReviews: 12,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/bike.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 40 }],
      },
    ],
  },
  {
    name: "Specialized Road Bike",
    description:
      "Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.",
    brand: "Specialized",
    category: "Cycle",
    subCategory: "roadBikes",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/bike.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 2 }],
      },
    ],
  },
  {
    name: "Specialize Road Bike",
    description:
      "Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.",
    brand: "Specialized",
    category: "Cycle",
    subCategory: "roadBikes",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/bike.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 21 }],
      },
    ],
  },

  // CAMP & HIKE //
  {
    name: "2 Person Dome Tent",
    description:
      "The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.",
    brand: "Embark",
    category: "Camp & Hike",
    subCategory: "tentsCampHike",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/tent.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 18 }],
      },
    ],
  },
  {
    name: "2 Person Dome Tent",
    description:
      "The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.",
    brand: "Embark",
    category: "Camp & Hike",
    subCategory: "tentsCampHike",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/tent.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 5 }],
      },
    ],
  },
  {
    name: "2 Person Dome Tent - Embark",
    description:
      "The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.",
    brand: "Embark",
    category: "Camp & Hike",
    subCategory: "tentsCampHike",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    defaultColor: "none",
    images: [{ color: "none", path: "/images/tent.jpg" }],
    variations: [
      {
        color: "none", // Represents "No Color" for tents
        sizes: [{ size: "One Size Fits All", countInStock: 2 }],
      },
    ],
  },

  // WATER //

  // MEN FOOTWEAR //

  // WOMENS FOOTWEAR //

];

export default products;
