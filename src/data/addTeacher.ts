import { connection } from "../index";

export default async function addTeacher(
  id: number,
  class_id: number | string
): Promise<void> {
  await connection.raw(`
      UPDATE Teacher
      SET class_id = ${class_id}
      WHERE id = ${id};
    `);
}
