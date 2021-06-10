import { connection } from "../index";

export default async function createClass(
  name: string,
  start_date: string,
  end_date: string,
  module: number | undefined
): Promise<any> {
  const result = await connection
    .insert({
      id: Math.round(Date.now() / 10000),
      name: name,
      start_date: start_date,
      end_date: end_date,
      module: module,
    })
    .into("Class");

  return result[0];
}
