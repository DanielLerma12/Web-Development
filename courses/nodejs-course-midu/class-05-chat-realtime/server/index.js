import express from "express";
import pico from "picocolors";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

import { prisma } from "../lib/prisma.js";

await prisma.$connect();
console.log(pico.magenta("connected to Postgres supabase"));

const app = express(); // express crea todo por uno, pero solo crea el servidor al momento de hacer listen, ahora esa lógica la maneja el server de http
const server = createServer(app); // se crea un servidor que usa a app
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
}); // socket.io se conecta al server
// tanto app como socket.io usan el mismo server

io.on("connection", async (socket) => {
  console.log("a user has connected");

  socket.on("chat message", async (msg) => {
    let result;
    const username = socket.handshake.auth.username;

    try {
      result = await prisma.messages.create({
        data: {
          content: msg,
          username,
        },
      });
      io.emit("chat message", result);
    } catch (e) {
      console.log(e);
      return;
    }
  });

  if (!socket.recovered) {
    try {
      const result = await prisma.messages.findMany({
        where: {
          id: {
            gt: socket.handshake.auth.serverOffset ?? 0, // revisar esto
          },
        },
        orderBy: {
          id: "asc",
        },
      });

      if (result !== undefined) {
        io.emit("chat history", result);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hola");
});

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(
    pico.yellowBright(`Server listening on http://localhost:${PORT}`),
  );
});
