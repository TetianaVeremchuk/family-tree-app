import express from 'express';
import cors from 'cors';
import sequelize from './db';
import memberRoutes from './routes/memberRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/members', memberRoutes);

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err: Error) => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
