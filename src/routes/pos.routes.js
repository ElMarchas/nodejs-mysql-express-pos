import { Router } from "express";
import {
  selectLastHistorico,
  selectOneHistorico,
  deleteOneHistorico,
  insertHistorico,
  updateHistorico,
} from "../controllers/pos.controller.js";

const router = Router();

router.get("/", selectLastHistorico);
router.get("/:codigo_p", selectOneHistorico);
router.delete("/:id", deleteOneHistorico);
router.post("/", insertHistorico);
router.patch("/:id", updateHistorico);
//router.delete("/historico", (req, res) => res.send("eliminando empleados"));

export default router;
