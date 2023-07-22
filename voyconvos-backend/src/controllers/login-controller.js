import getConnection from "./../database/database.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Función para agregar un usuario encriptado
const addUserEncrypt = async (req, res) => 
{
    try {
      const { nombres, apellidos, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro, userName, password } = req.body;
  
      // Validar si todos los campos están llenos
      if (!validateFields(nombres, apellidos, fecha_nacimiento, telefono, ci,)) {
        return res.status(400).json({ message: "Por favor llene todos los campos." });
      }
  
      // Verificar si el usuario ya existe en la base de datos
      const userExistsResult = await userExists(ci);
      if (await userExistsResult) {
        return res.status(400).json({ message: "La persona con el C.I. que desea registrar ya existe" });
      }
  
      // Verificar si el nombre de usuario ya está en uso
      if (await userNameExists(userName)) {
        return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
      }
  
      // Formatear los nombres y apellidos
      const formattedNombres = formatName(nombres);
      const formattedApellidos = formatName(apellidos);
  
      // Validar la contraseña
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'La contraseña es inválida' });
      }
  
      // Encriptar la contraseña
      const encriptar = await bcrypt.hash(password, 10);
      
      // Crear objeto con los datos del usuario
      const users = {
        nombres: formattedNombres,
        apellidos: formattedApellidos,
        fecha_nacimiento,
        telefono,
        sexo,
        ci,
        fecha_activacion: new Date(),
        userName,
        password: encriptar
      };
  
      // Obtener conexión de la base de datos
      const connection = await getConnection();
      
      // Insertar usuario en la base de datos
      await connection.query("INSERT INTO usuarios SET ?", users);
      connection.release();
  
      res.json({ message: "Usuario " + userName + " Agregado exitosamente." });
    } catch (error) {
      switch (error.code) {
        case "ER_DUP_ENTRY":
          if (error.sqlMessage.includes("UNICO_USERNAME")) {
            res.status(400).json({ message: "El nombre de usuario ya está en uso." });
          } else {
            res.status(500).json({ message: "Error de entrada duplicada." });
          }
          break;
        default:
          res.status(500).json({ message: "Error al agregar el usuario." });
          break;
      }
      console.error("Error:", error);
    }
};

// Función para verificar si un usuario con el mismo CI ya existe en la base de datos
const userExists = async (ci) => {
  try {
    const connection = await getConnection();
  
    // Realizar consulta en la base de datos para buscar el usuario
    const [rows] = await connection.query("SELECT * FROM usuarios WHERE ci = ?", ci);
    connection.release();

    // Verificar si se encontraron resultados
    return rows !== undefined && rows.length > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
  
  
// Función para verificar si un nombre de usuario ya está en uso
const userNameExists = async (userName) => {
  const connection = await getConnection();
  
  // Realizar consulta en la base de datos para buscar el nombre de usuario
  const [rows] = await connection.query("SELECT * FROM usuarios WHERE userName = ?", userName);
  connection.release();
  
  // Verificar si se encontraron resultados
  return rows && rows.length > 0;
};

// Función para iniciar sesión de un usuario
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const connection = await getConnection();

    // Validar si el usuario existe en la base de datos
    const [usuario] = await connection.query("SELECT * FROM usuarios WHERE userName = ?", userName);
    if (!usuario) {
      return res.status(400).json({ message: `No existe un usuario: ${userName} registrado` });
    }

    // Validar la contraseña ingresada
    const validarPassword = await bcrypt.compare(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({ message: `La contraseña para el usuario: ${userName} es incorrecta` });
    }

    // Generar un token JWT
    const token = generateToken(usuario.userName);

    return res.json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al intentar iniciar sesión" });
  }
};

// Función para generar un token JWT
function generateToken(userName) {
  // Define la información que deseas incluir en el token, como el nombre de usuario
  const payload = { userName: userName };

  // Genera el token con una clave secreta y opciones adicionales si es necesario
  const secretKey = process.env.SECRET_KEY || "default_secret_key";
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
}

// Función para validar que los campos estén llenos
function validateFields(...fields) {
  // Validar que todos los campos sean cadenas de texto no vacías
  for (const field of fields) {
    if (!field || typeof field !== 'string' || field.trim() === '') {
      return false;
    }
  }
  return true;
}

// Función para formatear el nombre
function formatName(name) {
  // Formatear el nombre para que solo la primera letra de cada palabra esté en mayúscula
  return name.trim().split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export const methods = {
  loginUser,
  addUserEncrypt
};
