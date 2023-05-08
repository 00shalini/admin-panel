const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASS);
const {ObjectId} = require('mongodb')
const uri = `mongodb+srv://${username}:${password}@weathercluster.u88zpdy.mongodb.net/weather?retryWrites=true&w=majority`;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection establishing with mongo db
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

app.get('/api/keys', (req, res) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  res.send({ apiKey });
});

app.put('/api/keys', (req, res) => {
  const { apiKey } = req.body;
  process.env.OPEN_WEATHER_API_KEY = apiKey;
  res.send({ message: 'API key updated.' });
});

app.get('/api/frequency', (req, res) => {
  const frequency = process.env.FREQUENCY;
  res.send({ frequency });
});

app.put('/api/frequency', (req, res) => {
    //console.log(req)
  const { frequency } = req.body;
  process.env.FREQUENCY = frequency;
  res.send({ message: 'Frequency updated.' });
});

app.get('/api/users', async (req, res) => {
  const usersCollection = mongoose.connection.collection('users');
  const users = await usersCollection.find().toArray();
  res.send({ users });
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
 
  const usersCollection = mongoose.connection.collection('users');
  await usersCollection.findOneAndDelete({_id: new ObjectId(id)})
  res.send({ message: 'User deleted.' });
});

app.put('/api/users/:id/block', async (req, res) => {
  const { id } = req.params;
  const usersCollection = mongoose.connection.collection('users');
  await usersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { blocked: true } });
  res.send({ message: 'User blocked.' });
});

app.put('/api/users/:id/unblock', async (req, res) => {
  const { id } = req.params;
  const usersCollection = mongoose.connection.collection('users');
  await usersCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $unset: { blocked: true } });
  res.send({ message: 'User unblocked.' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000.');
});
