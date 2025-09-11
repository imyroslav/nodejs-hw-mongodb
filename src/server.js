import express from "express";

const setupServer = express();
const PORT = 3000;

setupServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});