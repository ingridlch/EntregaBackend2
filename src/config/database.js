import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://user:user@codercluster.cf9yy1h.mongodb.net/coderbase?retryWrites=true&w=majority&appName=CoderCluster");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to DB') );

export default db;