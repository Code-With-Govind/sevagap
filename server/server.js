import app from './app.js';
import { db } from './config/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SevaGap Backend Server running on port ${PORT}`);
  console.log(`  Database status: ${db.isConnected ? 'Connected to MySQL' : 'Resilient Fallback Mode Active'}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
