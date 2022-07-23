// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const pickupSeeds = require('./pickupSeed.json');
const db = require('../config/connection');
const { Pickup, User, Pickup } = require('../models');

db.once('open', async () => {
  try {
    await Pickup.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < pickupSeeds.length; i++) {
      const { _id, pickupAuthor } = await Pickup.create(pickupSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: pickupAuthor },
        {
          $addToSet: {
            pickups: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});