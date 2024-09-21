const express = require("express");
const app = express();

app.use(express.json()); // or-> app.use(bodyParser.json());

const coursesRouter = require("./routes/courses_routes"); //import the router middleware
app.use("/api/courses", coursesRouter); //use the coursesRouter middleware

app.listen(5000, () => {
  console.log("listing to port 5000");
});
