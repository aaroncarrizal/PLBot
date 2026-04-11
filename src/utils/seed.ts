import 'dotenv/config';
import connectDB from './database';
import User from '../models/user';
import mongoose from 'mongoose';

const users = [
  { username: 'scrub224', discordId: '345774257646862346', drivers: [16, 41, 12, 87, 1] },
  { username: 'aaronk45', discordId: '674961399310450688', drivers: [44, 63, 43, 6, 30] },
  { username: 'rotunno17', discordId: '558789914657947679', drivers: [11, 3, 18, 55, 27] },
  { username: 'eirikr6', discordId: '748310505306718259', drivers: [14, 31, 5, 77, 81, 23] },
];

const seed = async () => {
  try {
    await connectDB();

    console.log('Seeding users...');

    for (const userData of users) {
      await User.findOneAndUpdate(
        { discordId: userData.discordId },
        userData,
        { upsert: true, new: true }
      );
      console.log(`User ${userData.username} seeded.`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seed();
