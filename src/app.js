import express from "express";
import historico from "./routes/historico.routes.js";

const app = express();

app.use(express.json());

app.use("/api", historico);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Ruta invalida",
  });
});

export default app;
