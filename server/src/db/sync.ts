import sequelize from "../db";

const syncDatabase = async () => {
  try {
    console.log('Starting database synchronization...');

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    process.exit(0); 
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
    process.exit(1); 
  }
};

syncDatabase();
