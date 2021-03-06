const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoDb;
