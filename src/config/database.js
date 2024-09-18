import mongoose from 'mongoose';

mongoose.connect("MONGO_URL");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to DB') );

export default db;