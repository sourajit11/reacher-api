const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/check", (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Please provide ?email=..." });
  }

  const command = `../target/release/check_if_email_exists ${email}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch {
      res.status(500).json({ error: "Failed to parse output." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
