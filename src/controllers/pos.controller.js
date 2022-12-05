import { pool } from "../db.js";

export const queryProducts = async (req, res) => {
  const query = req.params.query;

  try {
    const words = query.split(" ");
    const array = words.map((word) => {
      return (word = `(?=.*${word})`); //'(?=.*Stylus)(?=.*2100)'
    });

    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE descripcion REGEXP ? limit 30",
      [array.join("")]
    );
    if (rows.length <= 0)
      return res.status(200).json({ message: "No hay datos para ese codigo" });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const queryTable = async (req, res) => {
  const number = req.params.number;

  try {
    const [rows] = await pool.query(`SELECT * FROM tab_compras_hist${number}`);
    if (rows.length <= 0)
      return res.status(200).json({ message: "No hay datos para ese codigo" });

    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const insertTable = async (req, res) => {
  const { number, code } = req.body;
  //VALIDAR TIPO DE DATO Y LEGAL se escribe asi para sacar
  //los valores directo del array {} del mismo nombre

  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE codigo_p = ?",
      [code]
    );
    if (rows.length <= 0)
      return res
        .status(200)
        .json({ message: "Al parecer ese producto no está registrado" });
    console.log(rows[0].idprov);
    await pool.query(
      `INSERT INTO tab_compras_hist${number} (id_prov, cant_compra, cod_p, codigo_p, descripcion, importe, precio, nombreprov, id_us, usuario, no_fact, fact_serie, tipo_compra, fecha_compra,type_pro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        rows[0].idprov,
        1,
        rows[0].tipo_pza,
        rows[0].codigo_p,
        rows[0].descripcion,
        rows[0].preciov,
        rows[0].preciov,
        rows[0].proveedor,
        0,
        "",
        "",
        "",
        "efectivo",
        "2022-01-01",
        "",
      ]
    );
    return;
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }

  return;
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
