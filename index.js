const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
const secret = 'your_jwt_secret';

mongoose.connect('mongodb://localhost/bible', { useNewUrlParser: true, useUnifiedTopology: true });

const verseSchema = new mongoose.Schema({
    book: String,
    chapter: Number,
    verse: Number,
    text: String,
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Verse' }]
});

const Verse = mongoose.model('Verse', verseSchema);
const User = mongoose.model('User', userSchema);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/api/verse', async (req, res) => {
    const { book, chapter, verse } = req.query;
    const result = await Verse.findOne({ book, chapter, verse });
    res.send(result);
});

app.get('/api/search', async (req, res) => {
    const { keyword } = req.query;
    const results = await Verse.find({ text: new RegExp(keyword, 'i') });
    res.send(results);
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, secret);
        res.send({ token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Failed to authenticate token' });

        req.userId = decoded.userId;
        next();
    });
};

app.post('/api/bookmark', auth, async (req, res) => {
    const { verseId } = req.body;
    const user = await User.findById(req.userId);
    user.bookmarks.push(verseId);
    await user.save();
    res.send({ message: 'Verse bookmarked' });
});

app.get('/api/bookmarks', auth, async (req, res) => {
    const user = await User.findById(req.userId).populate('bookmarks');
    res.send(user.bookmarks);
});

app.get('/api/dailyverse', async (req, res) => {
    const count = await Verse.countDocuments();
    const random = Math.floor(Math.random() * count);
    const dailyVerse = await Verse.findOne().skip(random);
    res.send(dailyVerse);
});

app.use(express.static('public'));

