const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  // this will be changed to the categories of art, ie: anime, nature, sports, cars, pets, food...
  const categories = await Category.insertMany([
    { name: 'Animals'},
    { name: 'Food' },
    // { name: 'Household Supplies' },
    // { name: 'Electronics' },
    // { name: 'Books' },
    // { name: 'Toys' },
    
  ]);

  console.log('categories seeded');

  //This will change to the NFT items.
  const products = await Product.insertMany([
    {
      name: 'Howie The Cat',
      description:
        'Howie the Cat in Vampire mood with tongue sticking out.',
      image: 'Howie-The-Cat.png',
      category: categories[0]._id,
      price: 35.00,
      quantity: 100
    },
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[1]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Canned Coffee',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'canned-coffee.jpg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500
    },

  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Peter',
    lastName: 'Griffin',
    email: 'pg@aol.com',
    password: 'abcde12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'mike',
    lastName: 'Winkleman',
    email: 'beeple@testmail.com',
    password: 'abcde12345'
  });

  console.log('users seeded');

  process.exit();
});
