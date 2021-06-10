import { Request, Response } from "express";
import getStudentByAge from "../data/getStudentByAge";

export const GetAgeStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  let errorCode: number = 400;
  try {
    if (isNaN(Number(req.params.id))) {
      errorCode = 422;
      throw new Error("Id inválido");
    }

    const student = await getStudentByAge(Number(req.params.id));
    if (student.length === 0) {
      errorCode = 422;
      throw new Error("Estudante inexistente.");
    }

    res.status(200).send(student);
  } catch (err) {
    res.status(errorCode).send({
      message: err.message,
    });
  }
};
