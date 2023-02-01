const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { Op } = require("sequelize");
const { validarFecha } = require("../helpers/db-validators");
const xl = require("excel4node");
const path = require("path");
const { time } = require("console");

const usuariosGet = async (req, res = response) => {
  const count = await Usuario.count({
    where: {
      rol: "USER_ROLE",
      estado: true,
    },
  });
  const usuarios = await Usuario.findAll({
    where: {
      rol: "USER_ROLE",
      estado: true,
    },
    order: [["id", "DESC"]],
  });

  usuarios.forEach((element) => {
    element.dataValues.edad = calcularEdad(element.fecha_nacimiento);
  });

  res.json({
    count,
    msg: "Consulta existosa",
    usuarios,
  });
};

const excelUsuarios = async (req, res = response) => {
  const todos = await Usuario.findAll({
    where: {
      rol: "USER_ROLE",
    },
  });
  const cochabamba = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "cochabamba" }],
    },
  });
  const santacruz = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "santa cruz" }],
    },
  });
  const lapaz = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "la paz" }],
    },
  });
  const oruro = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "oruro" }],
    },
  });
  const potosi = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "potosi" }],
    },
  });

  const sucre = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "sucre" }],
    },
  });
  const chuquisaca = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "chuquisaca" }],
    },
  });
  const elalto = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "el alto" }],
    },
  });

  const beni = await Usuario.findAll({
    where: {
      [Op.and]: [{ rol: "USER_ROLE", ciudad: "beni" }],
    },
  });

  const wb = new xl.Workbook();

  const style = wb.createStyle({
    font: {
      color: "red",
      size: 12,
    },
  });
  const datos = wb.createStyle({
    font: {
      color: "black",
      size: 11,
    },
  });

  function createSheet(data, element) {
    const ws = wb.addWorksheet(element);
    ws.cell(1, 1).string("Nombres").style(style);
    ws.cell(1, 2).string("Apellidos").style(style);
    ws.cell(1, 3).string("Email").style(style);
    ws.cell(1, 4).string("C.I").style(style);
    ws.cell(1, 5).string("Codigo").style(style);
    ws.cell(1, 6).string("Fecha de Nacimiento").style(style);
    ws.cell(1, 7).string("Edad").style(style);
    ws.cell(1, 8).string("Sexo").style(style);
    ws.cell(1, 9).string("Telefono").style(style);
    ws.cell(1, 10).string("Ciudad").style(style);
    ws.cell(1, 11).string("Fecha de activacion de la tarjeta").style(style);
    let i = 2;
    for (let usuario of data) {
      ws.cell(i, 1).string(usuario.nombres).style(datos);
      ws.cell(i, 2).string(usuario.apellidos).style(datos);
      ws.cell(i, 3).string(usuario.email).style(datos);
      ws.cell(i, 4).string(usuario.ci).style(datos);
      ws.cell(i, 5).string(usuario.codigo).style(datos);
      ws.cell(i, 6).string(usuario.fecha_nacimiento).style(datos);
      ws.cell(i, 7).number(calcularEdad(usuario.fecha_nacimiento)).style(datos);
      ws.cell(i, 8).string(usuario.sexo).style(datos);
      ws.cell(i, 9).string(usuario.telefono).style(datos);
      ws.cell(i, 10).string(usuario.ciudad).style(datos);
      ws.cell(i, 11).date(usuario.fecha_activacion).style(datos);
      i++;
    }

    ws.column(1).setWidth(20);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(9).setWidth(20);
    ws.column(10).setWidth(20);
  }

  createSheet(todos, "Todos");
  createSheet(cochabamba, "Cochabamba");
  createSheet(santacruz, "SantaCruz");
  createSheet(lapaz, "La Paz");
  createSheet(oruro, "Oruro");
  createSheet(potosi, "Potosi");
  createSheet(sucre, "Sucre");
  createSheet(chuquisaca, "Chuqisaca");
  createSheet(elalto, "El alto");
  createSheet(beni, "Beni");
  const pathExcel = path.join(__dirname, "excel", "Registros.xlsx");
  wb.write(pathExcel, function (err, stats) {
    if (err) {
      console.log(JSON.stringify(err));
    } else {
      function downloadFile() {
        res.sendFile(pathExcel);
      }

      downloadFile();
    }
  });
};
const validarCorreo = async (req, res = response) => {
  const { email } = req.body;
  const usuario = await Usuario.findAll({
    attributes: [
      "id",
      "nombres",
      "apellidos",
      "ci",
      "rol",
      "codigo",
      "password",
      "email",
      "fecha_nacimiento",
      "sexo",
    ],
    where: {
      email,
    },
  });
  if (usuario) {
    return res.json({
      status: false,
      msg: "Ya existe un usuario con ese correo",
    });
  }
  return res.json({
    status: true,
    msg: "Validacion correcta",
  });
};

const cambiarEstado = async (usuario) => {
  if (usuario) {
    usuario.estado = false;
    if (await usuario.save()) {
      return true;
    }
  }
  return false;
};

const usuarioGet = async (req, res = response) => {
  const { codigo } = req.params;
  const usuario = await Usuario.findOne({
    where: {
      [Op.and]: [
        { [Op.or]: [{ codigo: codigo }, { ci: codigo }] },
        { rol: "USER_ROLE" },
        { estado: true },
      ],
    },
  });

  if (usuario) {
    const dias = await validarFecha(usuario.fecha_activacion);
    if (dias <= 0) {
      if (cambiarEstado(usuario)) {
        return res.json({
          status: false,
          msg: "La tarjeta del usuario ya ha vencido",
        });
      } else {
        return res.json({
          status: false,
          msg: "Ocurrio un problema",
        });
      }
    }
    usuario.password = null;
    return res.json({
      status: true,
      usuario,
    });
  }

  res.json({
    status: false,
    msg: "No existe un usuario con esos datos",
  });
};
const usuarioPut = async (req, res = response) => {
  const { id, ...resto } = req.body;

  const usuario = await Usuario.update(resto, {
    where: { id },
  });

  if (usuario) {
    return res.json({
      status: true,
      msg: "Usuario actualizado con existo",
      usuario,
    });
  } else {
    return res.json({
      status: false,
      msg: "Ocurrio un error intentelo mas tarde",
    });
  }
};

const usuarioPost = async (req, res = response) => {
  const {
    nombres,
    email,
    password,
    apellidos,
    ci,
    codigo,
    rol,
    fecha_nacimiento,
    sexo,
    telefono,
    ciudad,
    condiciones,
  } = req.body;
  const body = {
    nombres,
    email,
    telefono,
    ciudad,
    password,
    apellidos,
    ci,
    codigo,
    rol,
    fecha_nacimiento,
    sexo,
    condiciones,
    fecha_activacion: new Date(),
  };

  const usuarioBd = await Usuario.findOne({
    attributes: [
      "id",
      "nombres",
      "apellidos",
      "ci",
      "codigo",
      "email",
      "fecha_nacimiento",
      "sexo",
      "telefono",
      "ciudad",
      "estado",
    ],

    where: {
      [Op.and]: [{ email }, { estado: false }],
    },
  });
  if (usuarioBd) {
    usuarioBd.estado = true;

    if (usuarioBd.save()) {
      const token = await generarJWT(usuarioBd.id);

      return res.json({
        status: true,
        msg: "Bienvenido a la familia de MEDICARD",
        token: token,
        usuario: {
          nombres: usuarioBd.nombres,
          apellidos: usuarioBd.apellidos,
          ciudad: usuarioBd.ciudad,
          ci: usuarioBd.ci,
          email: usuarioBd.email,
          telefono: usuarioBd.telefono,
          codigo: usuarioBd.codigo,
          fecha_activacion: usuarioBd.fecha_activacion,
        },
      });
    }
  }
  const usuario = new Usuario(body);

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  if (usuario.save()) {
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    return res.json({
      status: true,
      msg: "Bienvenido a la familia de MEDICARD",
      token: token,
      usuario: {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        ciudad: usuario.ciudad,
        ci: usuario.ci,
        email: usuario.email,
        telefono: usuario.telefono,
        codigo: usuario.codigo,
        fecha_activacion: usuario.fecha_activacion,
      },
    });
  }

  return res.json({
    status: false,
    msg: "Error al guardar el usuario. Intentelo nuevamente",
  });
};

const usuarioEstado = async (req, res = response) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({
    attributes: [
      "id",
      "password",
      "rol",
      "nombres",
      "apellidos",
      "ci",
      "codigo",
      "email",
      "telefono",
      "ciudad",
      "fecha_activacion",
      "estado",
    ],
    where: {
      email,
    },
  });
  if (usuario) {
    usuario.estado = false;
    if (usuario.save()) {
      return res.json({
        status: true,
        msg: "Estado cambiado",
      });
    }
  }
  return res.status(400).json({
    status: false,
  });
};

const getUsuariosCiudad = async (req, res = response) => {
  const { ciudad } = req.params;

  const count = await Usuario.count({
    where: {
      ciudad,
      rol: "USER_ROLE",
      estado: true,
    },
  });

  const usuarios = await Usuario.findAll({
    where: {
      ciudad,
      rol: "USER_ROLE",
      estado: true,
    },
    order: [["id", "DESC"]],
  });

  usuarios.forEach((element) => {
    element.dataValues.edad = calcularEdad(element.fecha_nacimiento);
  });

  res.json({
    count,
    status: true,
    msg: "Usuarios encontrados",
    usuarios,
  });
};

const calcularEdad = (fecha) => {
  const anio = fecha.split("/")[2];
  const a = Number(anio);
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  return year - a;
};
const usuarioDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usuariosGet,
  usuarioPut,
  usuarioDelete,
  usuarioPost,
  validarCorreo,
  usuarioGet,
  usuarioEstado,
  getUsuariosCiudad,
  excelUsuarios,
};
