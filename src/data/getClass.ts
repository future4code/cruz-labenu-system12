import { connection } from "../index";

export default async function getClass(id: number): Promise<any> {
  const result = await connection.raw(`
    SELECT * FROM Class
    WHERE id = ${id};
    `);
  return result[0];
}
