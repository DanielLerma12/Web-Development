import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";
/* import { MovieModel } from "./models/mysql/movie.js"; */
import { MovieModel } from "./models/movie.js";
import pico from "picocolors";

const app = express();

app.use(json());

app.use(corsMiddleware());

app.get("/", (req, res) => {
  res.send("<h1>Main Page</h1>");
});

app.use("/movies", createMovieRouter({ movieModel: MovieModel }));

const PORT = process.env.PORT ?? 1234; // usar en despliegue la variable de entorno del proceso

app.listen(PORT, () => {
  console.log(
    pico.magenta(`server listening in port: http://localhost:${PORT}`),
  );
});
