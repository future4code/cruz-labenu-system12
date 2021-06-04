import express, { Express, Request, Response } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { PostStudent } from "./endpoints/PostStudent";
import { PostTeacher } from "./endpoints/PostTeacher";
import { PostClass } from "./endpoints/PostClass";
import { UpdateStudent } from "./endpoints/UpdateStudent";
import { student, teacher, Class } from "./types/Types";

dotenv.config();

export const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.post('/student', PostStudent)
app.post('/teacher', PostTeacher)
app.post('/class', PostClass)
app.put('/student', UpdateStudent)

app.get(
  "/alunos/all",
  async function (req: Request, res: Response): Promise<void> {
    try {
      const result = await connection.raw(`
         SELECT name, email, birthday, hobby, classId FROM student
      `);

      const students: student[] = result[0];

      if (!students.length) {
        res.statusCode = 404;
        throw new Error("No students found");
      }

      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.send(error.message || error.sqlMessage);
    }
  }
);

app.get(
  "/alunos/teacher",
  async function (req: Request, res: Response): Promise<void> {
    try {
      const result = await connection.raw(`
         SELECT name, email, birthday, specialty, classId FROM teacher
      `);

      const teachers: teacher[] = result[0];

      if (!teachers.length) {
        res.statusCode = 404;
        throw new Error("No teachers found");
      }

      res.status(200).send(teachers);
    } catch (error) {
      console.log(error);
      res.send(error.message || error.sqlMessage);
    }
  }
);

app.get(
  "/Class/all",
  async function (req: Request, res: Response): Promise<void> {
    try {
      const result = await connection.raw(`
         SELECT name, startDate, endDate, module FROM class
      `);

      const Classes: Class[] = result[0];

      if (!Classes.length) {
        res.statusCode = 404;
        throw new Error("No Classes found");
      }

      res.status(200).send(Classes);
    } catch (error) {
      console.log(error);
      res.send(error.message || error.sqlMessage);
    }
  }
);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
