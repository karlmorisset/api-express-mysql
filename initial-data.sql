DROP TABLE IF EXISTS `heros`;
CREATE TABLE `heros` (
`id` int NOT NULL PRIMARY KEY  AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`gender` VARCHAR(255) NOT NULL,
`power` VARCHAR(255) NOT NULL,
`color` VARCHAR(255) NOT NULL
);
INSERT INTO `heros`
(name, gender, power, color)
VALUES
('Superman', "male", "Porte très bien le collant", "Rouge et bleu"),
('CatWoman', "female", "Agile", "Noir"),
('Batman', "male", "A une grosse voiture", "Noir"),
('Wonder Woman', "female", "Arrête les balles avec ses poignets", "Rouge et bleu");
