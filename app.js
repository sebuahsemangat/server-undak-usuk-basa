const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load data from JSON file
const loadData = () => {
  const data = fs.readFileSync('./data/undakUsukBasa.json', 'utf8');
  return JSON.parse(data);
};

// Endpoint untuk mencari data berdasarkan slug
app.get('/api/:slug', (req, res) => {
  const { slug } = req.params;
  const data = loadData();

  // Cari data yang cocok dengan slug pada setiap field
  const result = data.words.find(
    (word) =>
      word.sorangan.includes(slug) ||
      word.batur.includes(slug) ||
      word.loma.includes(slug) ||
      word.bindo.includes(slug) ||
      word.english.includes(slug)
  );

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
