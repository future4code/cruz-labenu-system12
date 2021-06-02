import { student } from "./Types"

export type user = {
   id: string,
   name: string,
   email: string,
   recipes: student[],
   password: string
}
