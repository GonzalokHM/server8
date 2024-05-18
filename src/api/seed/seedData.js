const seed = {
  products: [
    {
      name: 'Camiseta Hombre',
      image: 'https://example.com/camiseta_hombre.jpg',
      categories: ['Hombre'],
      price: 20.99,
      stock: true,
    },
    {
      name: 'Vestido Mujer',
      image: 'https://example.com/vestido_mujer.jpg',
      categories: ['Mujer'],
      price: 35.5,
      stock: true,
    },
    {
      name: 'Sillón Hogar',
      image: 'https://example.com/sillon_hogar.jpg',
      categories: ['hogar'],
      price: 150.0,
      stock: true,
    },
    {
      name: 'Chaqueta Unisex',
      image: 'https://example.com/chaqueta_unisex.jpg',
      categories: ['uniSex'],
      price: 55.0,
      stock: true,
    },
    {
      name: 'Pantalón Outlet',
      image: 'https://example.com/pantalon_outlet.jpg',
      categories: ['outlet'],
      price: 15.99,
      stock: true,
    },
  ],

  categories: [
    {
      name: 'Hombre',
      logo: 'https://example.com/logo_hombre.jpg',
    },
    {
      name: 'Mujer',
      logo: 'https://example.com/logo_mujer.jpg',
    },
    {
      name: 'Hogar',
      logo: 'https://example.com/logo_hogar.jpg',
    },
    {
      name: 'Unisex',
      logo: 'https://example.com/logo_unisex.jpg',
    },
    {
      name: 'Outlet',
      logo: 'https://example.com/logo_outlet.jpg',
    },
  ],
};

module.exports = seed;
