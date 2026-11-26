import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, trim: true, required: 'First name is required' },
  lastname: { type: String, trim: true, required: 'Last name is required' },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  phone: { type: String, trim: true },
  message: { type: String, trim: true },
});

export default mongoose.model('Contact', ContactSchema);
