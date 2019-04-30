require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9001;

const upload = require('./upload.js').single('image');

app.get('/_health', (req, res) => {
  res.json({
    ok: true,
    message: 'healthy'
  });
});

app.post('/image-upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(500).send({
        errors: [{ title: 'Image upload error', detail: err }]
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

app.listen(port, () =>
  console.log(`> Up and running at http://localhost:${port}`)
);
