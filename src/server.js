import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.get("/movies", (request, response) => {
  response.json({message: "Hello Express!"})
})

