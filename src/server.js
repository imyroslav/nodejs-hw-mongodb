import express from "express";

const setupServer = express();
const PORT = 3000;

setupServer.use(express.json());

setupServer.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

setupServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// setupServer.use('*', (req, res, next) => {
//   res.status(404).json({
//     message: 'Route not found',
//   });
// });