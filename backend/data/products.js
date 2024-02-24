
const products = [
  {
    name: 'North Face Classic Tee - Mens',
    description: 'This is a really awesome tshirt! Buy it!',
    brand: 'North Face',
    category: 'Men',
    subCategory: 'shirtsMens',
    price: 29.99,
    rating: 4,
    numReviews: 12,
    defaultColor: 'green',
    images: [
      { color: 'green', path: '/images/clothing/mens/mens_tshirt_green.jpg' },
      { color: 'blue', path: '/images/clothing/mens/mens_tshirt_blue.jpg' },
      { color: 'brown', path: '/images/clothing/mens/mens_tshirt_brown.jpg' },
      { color: 'purple', path: '/images/clothing/mens/mens_tshirt_purple.jpg' },
    ],
    variations: [
      {
        color: 'green',
        sizes: [
          { size: 'small', countInStock: 1 },
          { size: 'medium', countInStock: 2 },
          { size: 'large', countInStock: 3 },
        ],
      },
      {
        color: 'blue',
        sizes: [
          { size: 'small', countInStock: 4 },
          { size: 'medium', countInStock: 5 },
          { size: 'large', countInStock: 6 },
        ],
      },
      {
        color: 'brown',
        sizes: [
          { size: 'small', countInStock: 7 },
          { size: 'medium', countInStock: 8 },
          { size: 'large', countInStock: 9 },
        ],
      },
      {
        color: 'purple',
        sizes: [
          { size: 'small', countInStock: 10 },
          { size: 'medium', countInStock: 11 },
          { size: 'large', countInStock: 12 },
        ],
      },
    ],
  },
  {
    name: 'Specialized Road Bike',
    description: 'Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.',
    brand: 'Specialized',
    category: 'Cycle',
    subCategory: 'roadBikes',
    price: 89.99,
    rating: 4.5,
    numReviews: 12,
    defaultColor: 'none',
    images: [
    { color: 'none', path: '/images/bike.jpg' },
    ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 40 },
        ],
      },
    ],
  },
  {
    name: 'Specialized Road Bike',
    description:
    'Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.',
    brand: 'Specialized',
    category: 'Cycle',
    subCategory: 'roadBikes',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    defaultColor: 'none',
    images: [
      { color: 'none', path: '/images/bike.jpg' },
      ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 2 },
        ],
      },
    ],
  },
  {
    name: 'Specialize Road Bike',
    description:
    'Introducing the cutting-edge SwiftStrider Series, a specialized road bike designed for elite athletes and performance enthusiasts. With its lightweight carbon frame and precision-engineered components, the SwiftStrider Series offers unparalleled speed and agility, making it the ultimate choice for those who demand the very best in their cycling experience.',
    brand: 'Specialized',
    category: 'Cycle',
    subCategory: 'roadBikes',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    defaultColor: 'none',
    images: [
      { color: 'none', path: '/images/bike.jpg' },
      ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 21 },
        ],
      },
    ],
  },
  {
    name: '2 Person Dome Tent',
    description:
    'The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.',
    brand: 'Embark',
    category: 'Camp & Hike',
    subCategory: 'tentsCampHike',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    defaultColor: 'none',
    images: [
      { color: 'none', path: '/images/tent.jpg' },
      ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 18 },
        ],
      },
    ],
  },
  {
    name: '2 Person Dome Tent',
    description:
    'The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.',
    brand: 'Embark',
    category: 'Camp & Hike',
    subCategory: 'tentsCampHike',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    defaultColor: 'none',
    images: [
      { color: 'none', path: '/images/tent.jpg' },
      ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 5 },
        ],
      },
    ],
  },
  {
    name: '2 Person Dome Tent - Embark',
    description:
    'The 2-person dome tent by Embark is a compact and easy-to-set-up shelter ideal for couples or solo adventurers. Featuring a classic dome design, it provides a snug and weather-resistant camping experience, making it a great choice for outdoor enthusiasts.',
    brand: 'Embark',
    category: 'Camp & Hike',
    subCategory: 'tentsCampHike',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    defaultColor: 'none',
    images: [
      { color: 'none', path: '/images/tent.jpg' },
      ],
    variations: [
      {
        color: 'none', // Represents "No Color" for tents
        sizes: [
          { size: 'One Size Fits All', countInStock: 2 },
        ],
      },
    ],
  },
    
]

export default products
