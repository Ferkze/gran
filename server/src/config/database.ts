// let connectionString = `${process.env.MONGODB_PROTOCOL}${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

// const connection = process.env.MONGODB_CONNECTION
// if (connection) {
//   connectionString = `${connection}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
// }
export default {
  connectionString: process.env.MONGODB_CONNECTION
}