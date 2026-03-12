import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";

connectToDB();

const port = process.env.PORT || 5000;

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
