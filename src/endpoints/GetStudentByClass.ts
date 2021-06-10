import { Request, Response } from "express";
import getClass from "../data/getClass";
import getStudentFromClass from "../data/getStudentFromClass";

export const GetStudentByClass = async (
  req: Request,
  res: Response
): Promise<any> => {
  let errorCode: number = 400;
  try {
    if (isNaN(Number(req.params.id))) {
      errorCode = 422;
      throw new Error("Id inválido");
    }

    const result = await getStudentFromClass(Number(req.params.id));

    const group = await getClass(Number(req.params.id));
    if (group.length === 0) {
      errorCode = 422;
      throw new Error("Turma inexistente.");
    }

    if (result.length === 0) {
      errorCode = 422;
      throw new Error("Nenhum aluno nesta turma.");
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(errorCode).send({
      message: err.message,
    });
  }
};
