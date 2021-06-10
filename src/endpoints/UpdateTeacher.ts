import { Request, Response } from "express";
import addTeacher from "../data/addTeacher";
import getClass from "../data/getClass";
import getTeacher from "../data/getTeacher";

export const UpdateTeacher = async (
  req: Request,
  res: Response
): Promise<any> => {
  let errorCode: number = 400;
  try {
    if (!req.body.id || !req.body.class_id) {
      errorCode = 422;
      throw new Error("Preencha todos os campos e tente novamente.");
    }

    if (isNaN(Number(req.body.class_id)) || isNaN(Number(req.body.id))) {
      errorCode = 422;
      throw new Error("Id inválido");
    }

    const teacher = await getTeacher(Number(req.body.id));
    if (teacher.length === 0) {
      errorCode = 422;
      throw new Error("Professor inexistente.");
    }

    const group = await getClass(Number(req.body.class_id));
    if (group.length === 0) {
      errorCode = 422;
      throw new Error("Turma inexistente.");
    }

    await addTeacher(Number(req.body.id), Number(req.body.class_id));

    res.status(200).send("Professor cadastrado na turma com sucesso");
  } catch (err) {
    res.status(errorCode).send({
      message: err.message,
    });
  }
};
