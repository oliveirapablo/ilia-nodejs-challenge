export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/jest',
  port: process.env.PORT || 3001
}
