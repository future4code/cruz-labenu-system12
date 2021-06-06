import { connection } from "../index";

export default async function getStudentFromClass(id: number): Promise<any> {
  const result = await connection.raw(`
    SELECT name, email FROM Student
    WHERE class_id = ${id};
    `);
  return result[0];
}
