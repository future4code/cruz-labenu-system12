CREATE TABLE student(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
birthday DATE NOT NULL,
turmaId INT NOT NULL
);

INSERT INTO student (`name`, `email`, `birthday`, `turmaId`) VALUES ('Frank','frank@labenu','2000/03/01');