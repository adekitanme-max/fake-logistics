const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'tracking.json');

app.get('/track/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync(dataPath));
  if (data[id]) {
    res.json(data[id]);
  } else {
    res.status(404).json({ error: 'Tracking ID not found' });
  }
});

app.get('/track/all', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));