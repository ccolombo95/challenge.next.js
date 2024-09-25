import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "src", "data", "db.json");

  // Leer el archivo JSON
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error al leer el archivo" });
      return;
    }

    // Parsear los datos a un array de objetos
    const containers = JSON.parse(data);

    // Enviar los datos como respuesta
    res.status(200).json(containers);
  });
}
