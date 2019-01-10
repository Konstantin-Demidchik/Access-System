-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 10 2019 г., 15:07
-- Версия сервера: 5.7.23
-- Версия PHP: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `insystem`
--

-- --------------------------------------------------------

--
-- Структура таблицы `building_level`
--

CREATE TABLE `building_level` (
  `level_id` int(11) NOT NULL,
  `level_num` int(11) NOT NULL,
  `level_name` tinytext NOT NULL,
  `level_adddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `building_level`
--

INSERT INTO `building_level` (`level_id`, `level_num`, `level_name`, `level_adddate`) VALUES
(1, 0, 'Холл', '2018-12-22 13:52:33'),
(2, 1, 'Лекционные', '2018-12-22 13:52:45'),
(3, 2, 'Этаж', '2018-12-22 15:09:52');

-- --------------------------------------------------------

--
-- Структура таблицы `building_rooms`
--

CREATE TABLE `building_rooms` (
  `room_id` int(11) NOT NULL,
  `room_num` int(11) NOT NULL,
  `room_type` enum('office','stuff','lec','lab','stud') NOT NULL,
  `level_id` int(11) NOT NULL,
  `level_adddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `building_rooms`
--

INSERT INTO `building_rooms` (`room_id`, `room_num`, `room_type`, `level_id`, `level_adddate`) VALUES
(1, 1, 'stuff', 1, '2018-12-22 13:56:23'),
(2, 2, 'stud', 1, '2018-12-22 13:56:32'),
(3, 101, 'office', 2, '2018-12-22 13:56:47'),
(4, 102, 'stud', 2, '2018-12-22 14:05:27'),
(5, 103, 'lec', 2, '2018-12-22 14:05:41'),
(6, 104, 'lab', 2, '2018-12-22 14:06:27'),
(7, 201, 'lec', 3, '2018-12-22 15:10:04');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` tinytext NOT NULL,
  `user_status` enum('default','stuff','security','admin') NOT NULL DEFAULT 'default',
  `user_regdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_status`, `user_regdate`) VALUES
(1, 'Васильев Василий Васильевич', 'default', '2018-12-13 05:09:08'),
(2, 'Зайцев Павел Александрович', 'stuff', '2018-12-13 05:09:08'),
(3, 'Зезюля Павел Александрпович', 'security', '2018-12-13 05:09:08'),
(4, 'Вороненко Андрей Юрьевич', 'admin', '2018-12-13 05:09:08'),
(5, 'Мельников Валентин', 'default', '2018-12-13 05:09:08'),
(6, 'Надя Бондарева', 'default', '2018-12-22 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `users_history`
--

CREATE TABLE `users_history` (
  `note_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key_id` int(11) NOT NULL,
  `note_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users_keys`
--

CREATE TABLE `users_keys` (
  `key_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `key_data` text NOT NULL,
  `key_status` enum('active','blocked') NOT NULL DEFAULT 'active',
  `key_type` enum('default','stuff','student','prepod','security','admin') NOT NULL,
  `key_adddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_keys`
--

INSERT INTO `users_keys` (`key_id`, `user_id`, `level_id`, `room_id`, `key_data`, `key_status`, `key_type`, `key_adddate`) VALUES
(5, 2, 2, 3, '6b6abc6baac462ed50014aa344ac86e8', 'active', 'default', '2018-12-22 14:02:32'),
(6, 3, 0, 0, '5fb1b722a0686feb8e71a9cb881b4981', 'active', 'student', '2018-12-22 14:02:42'),
(7, 4, 0, 0, '6937793287f69a8b98d4f2062243115b', 'active', 'stuff', '2018-12-22 14:02:57'),
(8, 1, 0, 0, '4b33458d227e181af696e1e818343314', 'active', 'security', '2018-12-22 14:06:02'),
(9, 5, 0, 0, 'dd47ae1efdd497205875860417af36c4', 'active', 'prepod', '2018-12-22 14:07:48'),
(10, 6, 0, 0, 'd20b84c29332fe342ba05ff8f8a3ae7e', 'active', 'student', '2018-12-22 14:31:59'),
(11, 6, 2, 3, '715965881373a1a797b524c9fede68f7', 'active', 'default', '2018-12-22 15:11:23');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `building_level`
--
ALTER TABLE `building_level`
  ADD PRIMARY KEY (`level_id`);

--
-- Индексы таблицы `building_rooms`
--
ALTER TABLE `building_rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `users_keys`
--
ALTER TABLE `users_keys`
  ADD PRIMARY KEY (`key_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `building_level`
--
ALTER TABLE `building_level`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `building_rooms`
--
ALTER TABLE `building_rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users_keys`
--
ALTER TABLE `users_keys`
  MODIFY `key_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
