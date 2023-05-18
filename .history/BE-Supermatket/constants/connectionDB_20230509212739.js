const DATABASE_NAME = "cloud-supermatket";
// const CONNECTION_STRING = `mongodb://localhost:27017/${DATABASE_NAME}`;
//connection to your application
const CONNECTION_STRING = `mongodb+srv://quyenspm:lewDyr9UU9MIdRVh@cluster0.tuzcmod.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

module.exports = {
  CONNECTION_STRING,
};
