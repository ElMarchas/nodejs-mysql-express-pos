import { pool } from "../db.js";

export const selectLastHistorico = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos WHERE descripcion LIKE '%coca%600%' order by id desc limit 20"
    );
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const selectOneHistorico = async (req, res) => {
  const codigo_p = req.params.codigo_p;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM historico WHERE codigo_p = ?",
      [codigo_p]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "No hay datos para ese codigo" });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOneHistorico = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query("DELETE FROM historico WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "No hay datos para ese codigo" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const insertHistorico = async (req, res) => {
  const {
    idprov,
    codigo_p,
    descripcion,
    precioc,
    preciov,
    proveedor,
    movimiento,
    fecha,
  } = req.body;
  //VALIDAR TIPO DE DATO Y LEGAL

  try {
    const [rows] = await pool.query(
      "INSERT INTO historico (idprov, codigo_p, descripcion, precioc, preciov, proveedor, movimiento, fecha) VALUES (?,?,?,?,?,?,?,?)",
      [
        idprov,
        codigo_p,
        descripcion,
        precioc,
        preciov,
        proveedor,
        movimiento,
        fecha,
      ]
    );
    res.send({
      id: rows.insertId,
      idprov,
      codigo_p,
      descripcion,
      precioc,
      preciov,
      proveedor,
      movimiento,
      fecha,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateHistorico = async (req, res) => {
  const { id } = req.params;
  const { dato1, dato2, dato3 } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE historico SET dato1 = IFNULL(?, dato1), dato2 = IFNULL(?, dato2), dato3 = IFNULL(?, dato3) WHERE id = ?",
      [dato1, dato2, dato3, id]
    );

    if (result.affectedRows <= 0)
      return res
        .status(404)
        .json({ message: "No hay datos para ese codigo up" });

    const [rows] = await pool.query("SELECT * FROM historico WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
