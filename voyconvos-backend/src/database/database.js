import mysql from "promise-mysql";
import config from "./../config.js";

//Un pool de conexiones se utiliza para gestionar y reutilizar conexiones a una base de datos. En lugar de abrir y cerrar una conexión individual cada vez que se realiza
// una consulta a la base de datos, el pool de conexiones mantiene un conjunto de conexiones abiertas que pueden ser reutilizadas por varias solicitudes.
let pool;

const createPool = async () => {
  // Crea un pool de conexiones con los parámetros de configuración
  pool = await mysql.createPool({
    //connectionLimit: 20, // Define el límite máximo de conexiones en el pool
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
  });

  // Maneja los errores de conexión inesperados en el pool
  pool.on('error', async (err) => {
    console.error('Error en el pool de conexiones:', err);
    await resetPool(); // Intenta recuperar o reiniciar el pool en caso de error
  });
};

const resetPool = async () => {
  // Termina todas las conexiones en el pool y crea un nuevo pool
  await pool.end();
  await createPool();
};

const getConnection = async () => {
  try {
    return await pool.getConnection(); // Obtiene una conexión del pool
  } catch (error) {
    console.error('Error al obtener una conexión del pool:', error);
    throw error;
  }
};

// Crea el pool de conexiones al cargar el módulo
createPool();

export default getConnection;
