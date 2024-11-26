import express from 'express';
import cors from 'cors';
import sequelize from './db';
import memberRoutes from './routes/memberRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/members', memberRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err: Error) => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));