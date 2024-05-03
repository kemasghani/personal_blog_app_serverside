const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');


app.use(express.json());
app.use(cors())
app.use(router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
