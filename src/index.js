const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Notes API");
});

app.get('/callback', (req, res) => {
  const code = req.query.code
  if (!code) {
    return res.status(400).send('No code received from Salesforce')
  }
  // redirect to Android app custom scheme with the code
  const redirectToApp = `myapp://auth?code=${encodeURIComponent(code)}`
  // Optionally render a small page with a fallback link
  res.send(`
    <html>
      <body>
        <p>Auth success. Redirecting to app...</p>
        <a id="link" href="${redirectToApp}">Open App</a>
        <script>location.href='${redirectToApp}';</script>
      </body>
    </html>
  `)
})

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is started on port no. " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  
