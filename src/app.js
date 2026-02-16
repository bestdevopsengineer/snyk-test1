const express = require('express');
const app = express();
const port = 3000;

// Safe endpoint (no command execution)
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello Snyk Code' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { exec } = require('child_process');

app.get('/run', (req, res) => {
  const cmd = req.query.cmd;        // user-controlled input
  exec(cmd, (err, stdout, stderr) => {  // 🔥 vulnerable: command injection
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});
