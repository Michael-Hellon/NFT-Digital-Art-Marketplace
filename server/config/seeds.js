const db = require('./connection');
const { User, Piece, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Piece', 'pieces');
  await cleanDB('User', 'users');

  // this will be changed to the categories of art, ie: anime, nature, sports, cars, pets, food...
  const categories = await Category.insertMany([
    { name: 'Animals'},   // 0
    { name: 'Nature' },   // 1
    { name: 'Patterns'},  // 2    
    { name: 'Spiritual' },// 3

    // { name: 'Sports' },   // 4
    // { name: 'Food' },     // 5
    // { name: 'Landmarks'}, // 6
    // { name: 'Anime' },    // 7

  ]);

  console.log('categories seeded');

  //This will change to the NFT items.
  const pieces = await Piece.insertMany([
    // NFT size no more than 640x640 
     {
      name: 'Howie',
      description:
        'Howie the cat, in vampire mode with tongue sticking out',
      image: 'Howie.png',
      category: categories[0]._id,
      price: 35.00,
      // quantity: 10,
      artist: 'CrunchyNugget6',
    },
    {
      name: 'Pattern X',
      description:
        'Colorful Rainbow Mandela.',
      image: 'pattern_x.png',
      category: categories[2]._id,
      price: 75.00,
      // quantity: 50,
      artist: 'UnderWorld71',
    },   

    {
      name: 'Balance',
      description:
        'A Yin and Yang for balance in your life.',
      image: 'balance.png',
      category: categories[3]._id,
      price: 20.00,
      // quantity: 500,
      artist: 'UnderWorld71',
    },
    {
      name: 'Awes',
      description:
        'Are you floating are falling as you contemplate digital fears and wonders.',
      image: 'awes.png',
      category: categories[2]._id,
      price: 45.00,
      // quantity: 500,
      artist: 'UnderWorld71',
    },
    {
      name: 'Rainbows',
      description:
        'A scattered rainbow mosaic.',
      image: 'rainbow.png',
      category: categories[1]._id,
      price: 95.00,
      // quantity: 500,
      artist: 'UnderWorld71',
    },

  ]);

  console.log('piece seeded');

  await User.create({
    firstName: 'Peter',
    lastName: 'Griffin',
    email: 'pg@aol.com',
    password: 'abcde12345',
    // orders: [
    //   {
    //     pieces: [pieces[0]._id, pieces[0]._id, pieces[1]._id]
    //   }
    // ]
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
