import express from "express";
import pico from "picocolors";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express(); // express crea todo por uno, pero solo crea el servidor al momento de hacer listen, ahora esa lógica la maneja el server de http
const server = createServer(app); // se crea un servidor que usa a app
const io = new Server(server); // socket.io se conecta al server
// tanto app como socket.io usan el mismo server

io.on("connection", (socket) => {
  console.log("a user has connected!");
  socket.on("disconnect", () => {
    console.log("an user has disconnected");
  });
});

app.use(logger("dev"));

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(
    pico.yellowBright(`Server listening on http://localhost:${PORT}`),
  );
});
