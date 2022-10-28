import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import { fileURLToPath } from "url";

import router from "./routes/router.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(session({
  name: "simple",
  secret: "simple",
  resave: false,
  saveUninitialized: true,
}));
app.use((req, res, next) => {
  app.locals.flash = req.session.flash;
  app.locals.user = req.session.user;
  app.locals.imgPath = `http://${APP_HOSTNAME}:${APP_PORT}/image`
  next();
});

// ==========
// App routers
// ==========


app.use(router);

// ==========
// App start
// ==========

// 1. Connexion à la base de données
mongoose.connect(`mongodb://${APP_HOSTNAME}:27017/tests`)
        .then(init);

// 2. Démarrage de l'application Express
async function init() {
    console.log("Connexion MongoDB établie !");

    app.listen(APP_PORT, () => {
      console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
    });
  }
