import { connection } from "../index";

export default async function createTeacher(
  name: string,
  email: string,
  birth_date: string,
  class_id: number
): Promise<any> {
  const result = await connection
    .insert({
      id: Math.round(Date.now() / 10000),
      name: name,
      email: email,
      birth_date: birth_date,
      class_id: class_id,
    })
    .into("Teacher");

  return result[0];
}
