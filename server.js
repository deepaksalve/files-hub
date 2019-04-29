const fs = require('fs');
const path = require('path');
const express = require('express');

const paths = require('./src/paths');
const routes = require('./src/routes');

const app = express();
const PORT = 3335;

app.set('views', paths.viewsDir);
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

routes(app);

// if (fs.existsSync(filePath)) {
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('Server is running on #', PORT);
});
