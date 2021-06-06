import { connection } from "../index";

export default async function addStudent(
  id: number,
  class_id: number | string
): Promise<void> {
  await connection.raw(`
      UPDATE Student
      SET class_id = ${class_id}
      WHERE id = ${id};
    `);
}
