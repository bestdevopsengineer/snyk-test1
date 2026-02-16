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
  const cmd = req.query.cmd;

  const allowed = ['ls', 'pwd'];
  if (!allowed.includes(cmd)) {
    return res.status(400).send('Invalid command');
  }

  execFile(cmd, [], (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});