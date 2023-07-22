import getConnection from "./../database/database.js";

// Mostrar todos los usuarios
const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro, fecha_activacion FROM usuarios WHERE rol='viajero' AND estado = 1"
    );
    connection.release();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Buscar usuario por ID
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, fecha_activacion FROM usuarios WHERE id = ?",
      id
    );
    connection.release();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar Usuario por ID
const updateUserID = async (req, res) => {
  try {
    const { id } = req.params;
    const { ci, nombres, apellidos, fecha_nacimiento, telefono, sexo, ciudad_destino, dias_seguro } = req.body;

    if (![nombres, apellidos, fecha_nacimiento, telefono, ci, ciudad_destino, dias_seguro].every(Boolean)) {
      res.status(400).json({ message: "Por favor llene todos los campos." });
      return;
    }

    const formattedNombres = nombres.split(" ").map((nombre) => nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()).join(" ");
    const formattedApellidos = apellidos.split(" ").map((apellido) => apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()).join(" ");
    const users = {
      nombres: formattedNombres,
      apellidos: formattedApellidos,
      fecha_nacimiento,
      telefono,
      sexo,
      ci,
      ciudad_destino,
      dias_seguro,
    };

    const connection = await getConnection();
    const result = await connection.query("UPDATE usuarios SET ? WHERE id = ?", [users, id]);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Agregar usuario a la base de datos
const addUser = async (req, res) => {
  try {
    const { nombres, apellidos, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro } = req.body;

    if (![nombres, apellidos, fecha_nacimiento, telefono, ci, ciudad_destino, dias_seguro].every(Boolean)) {
      res.status(400).json({ message: "Por favor llene todos los campos." });
      return;
    }

    const connection = await getConnection();
    const rows = await connection.query("SELECT * FROM usuarios WHERE ci = ?", ci);

    if (rows.length > 0) {
      res.status(400).json({ message: "La persona con el C.I. que desea registrar ya existe" });
      return;
    }

    const formattedNombres = nombres.split(" ").map((nombre) => nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()).join(" ");
    const formattedApellidos = apellidos.split(" ").map((apellido) => apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()).join(" ");
    const tiempoTranscurrido = Date.now();
    const fecha_activacion = new Date(tiempoTranscurrido);

    const users = {
      nombres: formattedNombres,
      apellidos: formattedApellidos,
      fecha_nacimiento,
      telefono,
      sexo,
      ci,
      ciudad_destino,
      dias_seguro,
      fecha_activacion,
    };

    await connection.query("INSERT INTO usuarios SET ?", users);
    connection.release();
    res.json({ message: "Usuario Agregado." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar Usuario por C.I.
const deleteUser = async (req, res) => {
  try {
    const { ci } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM usuarios WHERE ci = ?", ci);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const methods = {
  getUsers,
  getUserByID,
  updateUserID,
  addUser,
  deleteUser,
};
