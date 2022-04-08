import express from "express";
import bodyParser from "body-parser";
import wp from "web-push";
import morgan from "morgan";

const keys = {
  publicKey:
    "BBr929QkK4F8AjIa7U4I0CS_rAF0N96Y7OTiUUvGY67kdSFt5WmotCPJGF5WV8FiLPonUKi-b_73l2K5zclDI5M",
  privateKey: "AoT8t95W8fb5B8aAz4aVvobN-FFe_LIeBlp9reWmUZ0",
};

const subscriptions = [];

wp.setVapidDetails("mailto:mail@example.com", keys.publicKey, keys.privateKey);
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/push/public-key", (req, res) => {
  res.set("Content-Type", "text/plain").send(keys.publicKey);
});

app.post("/push/register", (req, res) => {
  const subscription = req.body.subscription;
  // subscriptions.push(subscription);
  res.sendStatus(201);

  setTimeout(() => {
    // console.log("Sending push notification", subscription);
    wp.sendNotification(subscription);
    // subscriptions.forEach((sub) => {
    //   wp.sendNotification(sub);
    // });
  }, 3000);
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(4000);
