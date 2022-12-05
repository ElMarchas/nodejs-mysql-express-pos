import express from "express";
import pos from "./routes/pos.routes.js";
import edit from "./routes/edit.routes.js";
import historico from "./routes/historico.routes.js";

/// Para la pagina de test
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
/// Para la pagina de test

const app = express();

app.use(express.json());

app.use("/api/pos", pos);
app.use("/api/edit", edit);
app.use("/api/historico", historico);

app.use((req, res, next) => {
  /// Para la pagina de test
  res.sendFile(path.join(__dirname + "/templates/test.html"));
  return;
  /// Para la pagina de test
  res.status(404).json({
    message: "Ruta invalida",
  });
});

export default app;
