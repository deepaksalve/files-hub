const path = require('path');

const cwd = process.cwd();
const viewsDir = path.join(cwd, 'views');
const publicDir = path.join(cwd, 'public');
const uploadsDir = path.join(cwd, 'uploads');

module.exports = {
  cwd, viewsDir, publicDir, uploadsDir
};
