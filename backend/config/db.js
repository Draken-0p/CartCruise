import mongoose from "mongoose";

const connectDB = async () => {


  try {

    mongoose.set('strictQuery', true);

    await mongoose.connect(
      process.env.MONGO_URI,
      () => {
        console.log("DB is Connected");
      }
    );

  } catch (err) {
    console.log(`Error : ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
