const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    let newRecipe = { title: "Curry", level: "Easy Peasy", cuisine: "Asian" };
    return Recipe.create(newRecipe);
  })
  .then(() => {
    return Recipe.find({}, { title: 1, _id: 0 });
  })
  .then((title) => {
    console.log(title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find({}, { title: 1, _id: 0 });
  })
  .then((title) => {
    console.log(title);
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then((update) => {
    console.log("Update successful!", update);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((del) => {
    console.log("Successfully delted!", del);

    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
