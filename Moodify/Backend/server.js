require("dotenv").config(); // To Access Variables which are present in ( .env ) files
const app = require("./src/app")
const connectToDB = require("./src/config/database");


connectToDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})