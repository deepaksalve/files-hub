const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');

const utils = require('./utils');
const paths = require('./paths');

module.exports = (app) => {
  app.get('/f/*', (req, res) => {
    const filename = req.params && req.params[0];
    const filePath = path.resolve(paths.publicDir, filename);

    if (fs.existsSync(filePath)) {
      return res.download(filePath);
    } else {
      return res.send('File not found');
    }
  });

  app.post('/payload', (req, res) => {
    const busboy = new Busboy({
      headers: req.headers
    });
    busboy.on('file', (_fieldName, file, filename, _encoding, _mimeType) => {
      const saveTo = path.resolve(paths.uploadsDir, filename);

      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('field', (_fieldName, _val, _fieldNameTruncated, _valTruncated, _encoding, _mimeType) => { });
    busboy.on('finish', () => {
      console.log('Done parsing form!');
      res.writeHead(303, {
        Connection: 'close',
        Location: '/'
      });
      res.end();
    });

    req.pipe(busboy);
  });

  app.get('/u', (_req, res) => res.render('upload'));

  app.get('*', (_req, res) => {
    const data = utils.walkSync(path.resolve(paths.publicDir));

    return res.render('index', {
      data: data
    });
  });

  return app;
};
