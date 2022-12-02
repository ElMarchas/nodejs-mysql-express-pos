import express from "express";
import pos from "./routes/pos.routes.js";
import edit from "./routes/edit.routes.js";
import historico from "./routes/historico.routes.js";

const app = express();

app.use(express.json());

app.use("/api/pos", pos);
app.use("/api/edit", edit);
app.use("/api/historico", historico);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Ruta invalida",
  });
});

export default app;
