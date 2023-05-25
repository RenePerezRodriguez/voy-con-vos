-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-05-2023 a las 15:25:39
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `afkvvbew_voyconvos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clinica`
--

CREATE TABLE `clinica` (
  `id_clinica` int(20) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `numero` varchar(30) NOT NULL,
  `codigo` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `id_doctor` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `especialidades` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`especialidades`)),
  `telefono` varchar(8) NOT NULL,
  `celular` varchar(8) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `id_sucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(20) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id_servicio` int(20) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id_sucursal` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `id_clinica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiene`
--

CREATE TABLE `tiene` (
  `id_sucursal` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `descuento` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `rol` varchar(20) DEFAULT 'Viajero',
  `fecha_nacimiento` varchar(20) NOT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `dias_seguro` int(11) DEFAULT NULL,
  `ciudad_destino` varchar(30) NOT NULL,
  `codigo_generado` varchar(100) DEFAULT NULL,
  `codigo` varchar(60) DEFAULT NULL,
  `condiciones` tinyint(1) DEFAULT NULL,
  `fecha_activacion` timestamp NULL DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `rol`, `fecha_nacimiento`, `userName`, `telefono`, `sexo`, `ci`, `password`, `dias_seguro`, `ciudad_destino`, `codigo_generado`, `codigo`, `condiciones`, `fecha_activacion`, `estado`) VALUES
(6, 'Marco', 'Montaño', 'Viajero', '20/12/2000', NULL, '4562133', 'M', '855201553', NULL, 3, 'La Paz', 'VYV000002', NULL, 0, '2023-04-09 21:02:46', 0),
(24, 'Maria', 'Montes', 'Viajero', '20/12/1999', NULL, '45621', 'F', '855202', NULL, NULL, 'Beni', 'VYV-0007', NULL, 0, '2023-04-20 19:48:04', 1),
(31, 'cristian', 'castro', NULL, '2023-03-27', NULL, '23245', 'M', '123', NULL, NULL, 'La paz', 'VYV-0011', NULL, 0, '2023-04-24 22:03:30', 1),
(59, 'Nick Cabrera', 'Cabrera ', 'Viajero', '2023-05-02', NULL, 'ASD', 'ASD', '23423', NULL, 2, 'ASD', 'VYV-0015', NULL, 0, '2023-05-18 02:06:46', 0),
(66, 'Pedro Pepe Pepillo', 'Perez Peralez', 'Viajero', '2023-05-16', NULL, '5999494', 'M', '2323aa', NULL, 3, 'Cochabamba', 'VYV-0016', NULL, 0, '2023-05-18 03:44:04', 0),
(75, 'Pedro', 'Picapiedra', 'Viajero', '2023-05-19', NULL, '234674a', 'M', '3553asdas', NULL, 3, 'Potosí', 'VYV-0023', NULL, 0, '2023-05-19 15:51:23', 0),
(81, 'Asdasd', 'Asdasd', 'Viajero', '2023-05-11', NULL, '234522z', 'M', '42423aa', NULL, 3, 'La Paz', 'VYV-0024', NULL, 0, '2023-05-19 16:45:30', 0),
(82, 'Asdasd', 'Asdasd', 'Viajero', '2023-05-22', NULL, '234455', 'M', '235235asd', NULL, 7, 'Oruro', 'VYV-0025', NULL, NULL, '2023-05-16 02:40:00', 0),
(88, 'Nick', 'Cabrera', 'Viajero', '20/12/1999', 'nick', 'asd', 'F', '34223a', '$2a$10$aEn4GOiCmSlLpJww0MoTVe5QVqALH3O5iduZteY7kciVl7u7PBU7e', 3, 'Beni', 'VYV-0027', NULL, NULL, '2023-05-25 04:12:06', 1),
(100, 'Nick1', 'Cabrera', 'Viajero', '20/12/1999', 'nicka', 'asd', 'F', '34223aa', '$2a$10$mHrXlH28IO6cGyNhtyc09eZaWRQOGs7z6oidQo4OV82xTHoaJlEY6', 3, 'Beni', 'VYV-0028', NULL, NULL, '2023-05-25 05:06:29', 1),
(107, 'Nick1', 'Cabrera', 'Viajero', '20/12/1999', 'nickaa1', 'asd', 'F', '3422a3a3aa', '$2a$10$.c1HTps5Qu4M7R7tG.pC1.QIsjl1BR3oe6ES93JUrNiSXYWVdnb4.', 3, 'Beni', 'VYV-0029', NULL, NULL, '2023-05-25 13:07:24', 1),
(108, 'Nick1', 'Cabrera', 'Viajero', '20/12/1999', 'nickaaa1', 'asd', 'F', '3422a3a223aa', '$2a$10$mB2TO/HuOEcvEBVJKiXrFeI271dVcKAz.Dm8jnizFruRmTJTG5vo2', 3, 'Beni', 'VYV-0030', NULL, NULL, '2023-05-25 13:07:41', 1),
(109, 'Asdas', 'Asdasdas', 'Viajero', '2023-05-16', NULL, '32234', 'O', '113324asda', NULL, 3, 'Pando', 'VYV-0031', NULL, NULL, '2023-05-25 13:13:40', 1),
(110, 'Zzzzz', 'Zzzzzz', 'Viajero', '2023-05-01', NULL, '1222222', 'O', 'zzzzzzz', NULL, 7, 'Chuquisaca', 'VYV-0032', NULL, NULL, '2023-05-25 13:14:29', 1),
(111, 'Qweqwe', 'Qweqwe', 'Viajero', '2023-05-24', 'nick2aaa1', '11111111', 'F', '86968', '$2a$04$vnrmi8szJP5Jf9i8SAaAh.5kehzRqt6A5brQIY2ncY4o3LZy6pIFm', 7, 'La Paz', 'VYV-0033', NULL, NULL, '2023-05-25 13:15:31', 1);

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `cambiar estado` AFTER INSERT ON `usuarios` FOR EACH ROW BEGIN
  DECLARE today DATE;
  SET today = CURDATE();
  
  IF NEW.estado = 1 AND DATEDIFF(today, NEW.fecha_activacion) >= NEW.dias_seguro THEN
    UPDATE usuarios
    SET estado = 0
    WHERE id = NEW.id;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `eliminar_asegurado` AFTER INSERT ON `usuarios` FOR EACH ROW BEGIN
    IF NEW.dias_seguro = 3 THEN
        SET @fecha_limite = DATE_ADD(NEW.fecha_activacion, INTERVAL 3 DAY);
    ELSEIF NEW.dias_seguro = 7 THEN
        SET @fecha_limite = DATE_ADD(NEW.fecha_activacion, INTERVAL 7 DAY);
    END IF;
    
    IF CURRENT_TIMESTAMP > @fecha_limite THEN
        DELETE FROM usuarios WHERE id = NEW.id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `generador_codigo` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
  DECLARE codigo VARCHAR(100);
  SET codigo = CONCAT('VYV-', LPAD((SELECT COALESCE(MAX(SUBSTRING(codigo_generado, 5)), '0000') + 1 FROM usuarios), 4, '0'));
  SET NEW.codigo_generado = codigo;
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clinica`
--
ALTER TABLE `clinica`
  ADD PRIMARY KEY (`id_clinica`);

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id_doctor`),
  ADD KEY `id_sucursal` (`id_sucursal`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_doctor` (`id_doctor`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id_sucursal`),
  ADD KEY `id_clinica` (`id_clinica`);

--
-- Indices de la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id_sucursal`,`id_servicio`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNICO_USERNAME` (`userName`),
  ADD KEY `usuarios_FK` (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id_sucursal` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tiene`
--
ALTER TABLE `tiene`
  MODIFY `id_sucursal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id_doctor`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD CONSTRAINT `sucursal_ibfk_1` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id_clinica`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id_sucursal`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_FK` FOREIGN KEY (`codigo`) REFERENCES `codigos` (`codigo`) ON UPDATE CASCADE;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `update_user_status_event` ON SCHEDULE EVERY 1 DAY STARTS '2023-05-22 22:45:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE usuarios
  SET estado = 0
  WHERE estado = 1 AND DATEDIFF(CURDATE(), fecha_activacion) >= dias_seguro$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
