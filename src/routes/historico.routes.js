import { Router } from "express";
import {
  selectLastHistorico,
  selectOneHistorico,
  deleteOneHistorico,
  insertHistorico,
  updateHistorico,
} from "../controllers/historico.controller.js";

const router = Router();

router.get("/historico", selectLastHistorico);
router.get("/historico/:codigo_p", selectOneHistorico);
router.delete("/historico/:id", deleteOneHistorico);
router.post("/historico", insertHistorico);
router.patch("/historico/:id", updateHistorico);
//router.delete("/historico", (req, res) => res.send("eliminando empleados"));

export default router;
