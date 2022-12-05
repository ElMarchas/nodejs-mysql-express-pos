import { Router } from "express";
import {
  queryProducts,
  queryTable,
  insertTable,
  deleteOneHistorico,
  insertHistorico,
  updateHistorico,
} from "../controllers/pos.controller.js";

const router = Router();

router.get("/:query", queryProducts);
router.get("/table/:number", queryTable);
router.post("/table/", insertTable);
router.delete("/:id", deleteOneHistorico);
router.post("/", insertHistorico);
router.patch("/:id", updateHistorico);
//router.delete("/historico", (req, res) => res.send("eliminando empleados"));

export default router;
