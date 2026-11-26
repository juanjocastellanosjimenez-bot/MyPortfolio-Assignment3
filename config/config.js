import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Always read the .env file in the project root, even when the server is started
// from the client folder (client "dev" script runs: nodemon ../server.js).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  // Your own MongoDB connection string goes in .env (MONGODB_URI), ending in /Portfolio
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Portfolio",
};

export default config;
