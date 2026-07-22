const express = require("express");
const pico = require("picocolors");

const app = express();

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Mi página</h1>"); // express detecta automáticamente cual es el content-type dependiendo de la respuesta
});

app.listen(PORT, () => {
  console.log(pico.cyan(`server listening in port: http://localhost:${PORT}`));
});
