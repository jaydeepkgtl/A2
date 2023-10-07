const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = 'mongodb://127.0.0.1:27017/Books';
  console.log(`Connecting to MongoDB Database at ${uri}`);
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDB;