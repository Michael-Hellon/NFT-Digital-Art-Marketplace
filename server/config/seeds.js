const db = require('./connection');
const { User, Piece, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Piece', 'pieces');
  await cleanDB('User', 'users');

  // this will be changed to the categories of art, ie: anime, nature, sports, cars, pets, food...
  const categories = await Category.insertMany([
    { name: 'Animals'},
    { name: 'Anime' },
    { name: 'Nature' },
    { name: 'Sports' },
    { name: 'Cars' },
    { name: 'Food' },
    { name: 'Landmarks' },
    
  ]);

  console.log('categories seeded');

  //This will change to the NFT items.
  const pieces = await Piece.insertMany([
    // NFT size no more than 640x640 
    {
      name: 'Howie 640 The Cat',
      description:
        'Howie640',
      image: 'Howie640.png',
      category: categories[0]._id,
      price: 35.00,
      quantity: 100
    },
    {
      name: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[5]._id,
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

  console.log('piece seeded');

  await User.create({
    firstName: 'Peter',
    lastName: 'Griffin',
    email: 'pg@aol.com',
    password: 'abcde12345',
    orders: [
      {
        pieces: [pieces[0]._id, pieces[0]._id, pieces[1]._id]
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
