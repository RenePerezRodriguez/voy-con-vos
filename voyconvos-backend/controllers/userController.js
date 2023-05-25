
import getConnection from "./../database/database.js";
import bcrypt from 'bcryptjs';
const { bcryptjs} = bcrypt;
import jwt from 'jsonwebtoken';
const { Jwt } = jwt;

//mostrar todos los usuarios
const getUsers= async (req, res) => {
    try 
    {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro,fecha_activacion  FROM usuarios WHERE estado = 1");
        res.json(result);    
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}

//buscar por usuario CI
/*const getUserCI= async (req, res) => {
    try 
    {
        const { ci } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino,fecha_activacion  FROM usuarios WHERE ci = ?", ci);
        res.json(result);    
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}
*/

//buscar por usuario ID
const getUserID= async (req, res) => {
    try 
    {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino,fecha_activacion  FROM usuarios WHERE id = ?", id);
        res.json(result);    
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}

//Actualizar Usuario por ID
const updateUserID = async (req, res) => {
    try 
    {
        
        const { id } = req.params;
        const { ci, nombres, apellidos, fecha_nacimiento, telefono, sexo, ciudad_destino, dias_seguro,} = req.body
        if ( nombres== undefined || apellidos== undefined || fecha_nacimiento== undefined ||
            telefono== undefined || ci== undefined || ciudad_destino== undefined || dias_seguro== undefined) 
        {
            res.status(400).json({ message:"Por favor llene todos los campos."});
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
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}

//agregar usuario a la db
const addUser = async (req, res) => {
    const tiempoTranscurrido = Date.now();
    const fecha_activacion = new Date(tiempoTranscurrido);
    
    try {
        const { nombres, apellidos, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro, } = req.body;

        if (nombres == undefined || apellidos == undefined || fecha_nacimiento == undefined ||
            telefono == undefined || ci == undefined || ciudad_destino == undefined || dias_seguro == undefined) {
            res.status(400).json({ message: "Por favor llene todos los campos." });
        } else {
            const connection = await getConnection();
            const rows = await connection.query("SELECT * FROM usuarios WHERE ci = ?", ci);

            if (rows.length > 0) {
                res.status(400).json({ message: "La persona con el C.I. o Nombre de Usuario que desea registrar ya existe" });
            } else {
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
                    fecha_activacion,
                };

                await connection.query("INSERT INTO usuarios SET ?", users);
                res.json({ message: "Usuario Agregado." });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
};
const addUserEncrypt = async (req, res) => {
    const tiempoTranscurrido = Date.now();
    const fecha_activacion = new Date(tiempoTranscurrido);
    
    try {
        const { nombres, apellidos, fecha_nacimiento, telefono, sexo, ci, ciudad_destino, dias_seguro, userName, password } = req.body;

        if (nombres == undefined || apellidos == undefined || fecha_nacimiento == undefined ||
            telefono == undefined || ci == undefined || ciudad_destino == undefined || dias_seguro == undefined) {
            res.status(400).json({ message: "Por favor llene todos los campos." });
        } else {
            const connection = await getConnection();
            const rows = await connection.query("SELECT * FROM usuarios WHERE ci = ?", ci);

            if (rows.length > 0) {
                res.status(400).json({ message: "La persona con el C.I. o Nombre de Usuario que desea registrar ya existe" });
            } else {
                const formattedNombres = nombres.split(" ").map((nombre) => nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()).join(" ");
                const formattedApellidos = apellidos.split(" ").map((apellido) => apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()).join(" ");
                if (!password || typeof password !== 'string') {
                    res.status(400).json({ message: 'La contraseña es inválida' });
                    return;
                  }
                const encriptar = await bcrypt.hash(password,1);
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
                    userName,
                    password: encriptar
                };

                await connection.query("INSERT INTO usuarios SET ?", users);
                res.json({ message: "Usuario Agregado." });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
};

//Actualizar Usuario por C.I.
/*const updateUser = async (req, res) => {
    try 
    {
        const { ci } = req.params;
        const { nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ciudad_destino} = req.body
        if ( nombres== undefined || apellidos== undefined || rol== undefined || fecha_nacimiento== undefined ||
            telefono== undefined || ci== undefined || ciudad_destino== undefined) 
        {
            res.status(400).json({ message:"Por favor llene todos los campos."});
        }
        const users ={ nombres, apellidos, rol, fecha_nacimiento, telefono, sexo, ci, ciudad_destino}
        const connection = await getConnection();
        const result = await connection.query("UPDATE usuarios SET ? WHERE ci = ?", [users, ci]);
        res.json(result);    
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}
*/

//Eliminar Usuario por C.I.
const deleteUser = async (req, res) => {
    try 
    {
        const { ci } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE ci = ?", ci);
        res.json(result);    
    } 
    catch (error) {
        res.status(500); //error de servidor
        res.send(error.message);
    }

}

//LOGIN
const loginUser = async(req, res) => {

    const { userName, password } = req.body
    const connection = await getConnection();
    try 
    {
        // Validamos si el usuario existe en la BDD
        const validarUsuario = await connection.query("SELECT * FROM usuarios WHERE userName = ?", userName);
    
        if (validarUsuario.length === 0) {
          res.status(400).json({ msg: `No existe un usuario con el nombre ${userName} en la base de datos` });
        } 
        else 
        {
          // Usuario encontrado, ahora validamos el password
          const usuario = validarUsuario[0]; // Suponiendo que solo hay un usuario con el mismo nombre
    
          // Aquí debes comparar el password ingresado con el password almacenado en la base de datos.
          // Por ejemplo, si estás utilizando bcrypt para encriptar las contraseñas, puedes hacerlo así:
          const validarPassword = await bcrypt.compare(password, usuario.password);
    
          if (!validarPassword) {
            res.status(400).json({ msg: "La contraseña ingresada es incorrecta" });
          } 
          else 
          {
            // El usuario y la contraseña son válidos, puedes generar y devolver un token JWT aquí.
            // ...
            // Ejemplo de generación de token:
            const token = generateToken(usuario.userName); // Suponiendo que tienes una función llamada generateToken
    
            res.json( token );
          }
        }
      } catch (error) {
        res.status(500).json({ msg: "Error al intentar iniciar sesión" });
      }
    //Generamos token
}
function generateToken(userName) 
{
    // Define la información que deseas incluir en el token, como el nombre de usuario
    const payload = {
      userName: userName
    };
  
    // Genera el token con una clave secreta y opciones adicionales si es necesario
    const secretKey = process.env.SECRET_KEY || "default_secret_key";
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  
    return token;
}

export const methods ={
    getUsers,
    //getUserCI,
    deleteUser,
    //updateUser,
    addUser, //abajo prueba ID
    getUserID,
    updateUserID,
    loginUser,
    addUserEncrypt
}