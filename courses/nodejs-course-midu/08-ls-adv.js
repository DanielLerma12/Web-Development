const fs = require("node:fs");

const folder = process.argv[2] ?? ".";

fs.readdir(folder, (err, files) => {
  // ".", dir actual
  if (err) {
    console.log("error al leer el directorio: ", err);
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});
