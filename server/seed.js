// Creates the Admin user in MongoDB (run once: npm run seed).
// Credentials come from .env so they are not written in the code:
//   ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD (at least 6 characters)
import mongoose from "mongoose";
import config from "../config/config.js";
import User from "./models/user.model.js";

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Add ADMIN_EMAIL and ADMIN_PASSWORD (and ADMIN_NAME) to your .env file first.");
  process.exit(1);
}

await mongoose.connect(config.mongoUri);
let admin = await User.findOne({ email: ADMIN_EMAIL });
if (admin) {
  admin.role = "admin";
  await admin.save();
  console.log(`Existing user ${ADMIN_EMAIL} is now an admin.`);
} else {
  admin = new User({ name: ADMIN_NAME || "Admin", email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin" });
  await admin.save();
  console.log(`Admin user ${ADMIN_EMAIL} created.`);
}
await mongoose.disconnect();
