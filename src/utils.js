const fs = require('fs');
const path = require('path');

const walkSync = (dir, fileList, rootDir, validFileFormats) => {
  let baseDir = rootDir || dir;
  let files = fs.readdirSync(dir);

  fileList = fileList || [];
  files.forEach(file => {
    let stats = fs.statSync(path.join(dir, file));

    if (stats.isDirectory()) {
      fileList = walkSync(path.join(dir, file), fileList, baseDir);
    } else if (!validFileFormats || validFileFormats.indexOf(path.extname(file)) !== -1) {
      const relPath = path.relative(baseDir, path.join(dir, file));

      fileList.push(relPath.replace(/\\/g, '/'));
    }
  });

  return fileList;
};

module.exports = {
  walkSync
};
