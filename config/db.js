const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URL) // Debug log
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected to host: ${mongoose.connection.host}`)
  } catch (error) {
    console.log(`MongoDB server issue: ${error}`)
  }
}

module.exports = connectDB
