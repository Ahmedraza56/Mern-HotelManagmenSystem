const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const asyncHandler = require('express-async-handler');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// CORS configuration
const corsOptions = {
  origin: [
    'https://hms-virid.vercel.app',   // Your frontend origin
    'https://hms-admin-one.vercel.app' // Another allowed origin if needed
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

const roomSchema = new mongoose.Schema({
  number: Number,
  type: String,
  accommodation: String,
  status: { type: String, default: 'available' },
  price: Number,
  image: String
});

const Room = mongoose.model('Room', roomSchema);

const staffSchema = new mongoose.Schema({
  name: String,
  designation: String,
  age: Number,
  salary: Number
});

const Staff = mongoose.model('Staff', staffSchema);

const reservedRoomSchema = new mongoose.Schema({
  arrivalDate: Date,
  departureDate: Date,
  email: String,
  message: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  price: Number
});

const ReservedRoom = mongoose.model('ReservedRoom', reservedRoomSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/admin/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (user.role !== 1) {
    return res.status(403).json({ message: 'This user is not allowed to login.' });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY);
  console.log("token:", token);
  return res.json({ token, status: true, message: "Login successfully", role: user.role });
}));

app.post('/api/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.KEY);
  console.log("token:", token);

  res.status(200).json({ token, message: 'Login successful', role: user.role });
}));

app.post('/api/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

app.post('/api/addroom', upload.single('image'), async (req, res) => {
  try {
    const { number, type, accommodation, price } = req.body;
    const newRoom = new Room({
      number,
      type,
      accommodation,
      price,
      image: req.file ? req.file.filename : null
    });
    await newRoom.save();

    res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    console.error('Add room error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Fetch rooms error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.patch('/api/rooms/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const room = await Room.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(room);
  } catch (error) {
    console.error('Update room status error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/rooms/:id', upload.single('image'), async (req, res) => {
  try {
    const { number, type, accommodation, status, price } = req.body;
    const updatedData = {
      number,
      type,
      accommodation,
      status,
      price
    };
    if (req.file) {
      updatedData.image = req.file.filename;
    }
    const room = await Room.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(room);
  } catch (error) {
    console.error('Edit room error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/addstaff', async (req, res) => {
  try {
    const { name, designation, age, salary } = req.body;
    const newStaff = new Staff({ name, designation, age, salary });
    await newStaff.save();

    res.status(201).json({ message: 'Staff added successfully' });
  } catch (error) {
    console.error('Add staff error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error('Fetch staff error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/staff/:id', async (req, res) => {
  try {
    const { name, designation, age, salary } = req.body;
    const updatedData = { name, designation, age, salary };
    const staff = await Staff.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(staff);
  } catch (error) {
    console.error('Edit staff error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/staff/:id', async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error('Delete staff error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/reservedroom', async (req, res) => {
  try {
    const { arrivalDate, departureDate, email, message, room } = req.body;

    if (!arrivalDate || !departureDate || !email || !room) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const reservedRoom = await Room.findById(room);
    if (!reservedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const newReservation = new ReservedRoom({
      arrivalDate,
      departureDate,
      email,
      message,
      room: reservedRoom._id,
      price: reservedRoom.price
    });

    await newReservation.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmation - Luxury Hotel',
      text: `Dear Guest,

We are pleased to inform you that your reservation has been successfully confirmed at Luxury Hotel. Here are your reservation details:

Room Number: ${reservedRoom.number}
Price: $${reservedRoom.price.toFixed(2)}
Arrival Date: ${new Date(arrivalDate).toLocaleDateString()}
Departure Date: ${new Date(departureDate).toLocaleDateString()}

We look forward to welcoming you to our hotel. If you have any questions or need further assistance, please do not hesitate to contact us.

Thank you for choosing Luxury Hotel.

Best regards,
The Luxury Hotel Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending confirmation email' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: 'Reservation has been successfully made. A confirmation email has been sent to your email address.' });
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/reservedrooms', async (req, res) => {
  try {
    const reservedRooms = await ReservedRoom.find().populate('room');
    res.status(200).json(reservedRooms);
  } catch (error) {
    console.error('Fetch reserved rooms error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/reservedrooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ReservedRoom.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reserved room deleted successfully' });
  } catch (error) {
    console.error('Delete reserved room error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, rating, message });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Fetch feedback error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ name, phone, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Contact Form Submission',
      text: `Thank you for reaching out, ${name}! We have received your message and will get back to you soon.\n\nYour Message:\n${message}\n\nBest regards,\nThe Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending confirmation email' });
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
