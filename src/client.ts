import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    await client.$connect();
    console.log('PostgreSQL database connected.');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  } finally {
    //   await client.$disconnect();
  }
}

export default client;
