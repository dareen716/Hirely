// Express Backend Server
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ API endpoints: http://localhost:${PORT}/api`);
});
