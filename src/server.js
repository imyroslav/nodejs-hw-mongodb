import express from "express";

const app = express();
const PORT = 3000;

// app.use(express.json());

app.use(function (req, res, next) {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${PORT}`);
});



app.get("/movies", (request, response) => {
  response.json({message: `Time: ${new Date().toLocaleString()}`})
})

