-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2026 a las 14:11:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `notas_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `nota1` decimal(3,1) DEFAULT NULL,
  `nota2` decimal(3,1) DEFAULT NULL,
  `nota3` decimal(3,1) DEFAULT NULL,
  `promedio` decimal(3,2) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `nota1`, `nota2`, `nota3`, `promedio`, `estado`) VALUES
(1, 'Stiv', 5.0, 5.0, 5.0, 5.00, 'Aprobado'),
(2, 'Stiv', 1.0, 2.0, 5.0, 2.67, 'Reprobado'),
(3, 'Juan', 3.0, 2.5, 5.0, 3.50, 'Aprobado'),
(4, 'Pablo', 3.7, 2.8, 4.5, 3.67, 'Aprobado'),
(5, 'Leonel', 2.0, 5.0, 3.5, 3.50, 'Aprobado'),
(6, 'Carlos', 1.5, 2.1, 2.1, 1.90, 'Reprobado'),
(7, 'Juan', 1.0, 5.0, 4.0, 3.33, 'Aprobado'),
(8, 'Josue', 2.0, 4.0, 1.0, 2.33, 'Reprobado'),
(9, 'Mateo', 2.0, 5.0, 1.1, 2.70, 'Reprobado'),
(10, 'Mauricio', 4.0, 4.1, 1.0, 3.03, 'Aprobado'),
(11, 'Luis Yepes', 4.0, 2.0, 5.0, 3.67, 'Aprobado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
