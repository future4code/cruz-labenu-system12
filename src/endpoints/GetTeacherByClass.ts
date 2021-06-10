import { Request, Response } from "express";
import getClass from "../data/getClass";
import getTeacherFromClass from "../data/getTeacherFromClass";

export const GetTeacherByClass = async (
  req: Request,
  res: Response
): Promise<any> => {
  let errorCode: number = 400;
  try {
    if (isNaN(Number(req.params.id))) {
      errorCode = 422;
      throw new Error("Id inválido");
    }

    const result = await getTeacherFromClass(Number(req.params.id));

    const group = await getClass(Number(req.params.id));
    if (group.length === 0) {
      errorCode = 422;
      throw new Error("Turma inexistente.");
    }

    if (result.length === 0) {
      errorCode = 422;
      throw new Error("Nenhum professor nesta turma.");
    }

    let teachers = [];

    for (let i = 0; i < result.length; i++) {
      let sameName = false;
      for (let j = 0; j < i; j++) {
        if (teachers[j] && result[i].name === teachers[j].name) {
          teachers[j].specialtys.push(result[i].specialty);
          sameName = true;
          break;
        }
      }
      if (!sameName) {
        teachers.push({
          name: result[i].name,
          email: result[i].email,
          specialtys: [result[i].specialty],
        });
      }
    }

    res.status(200).send(teachers);
  } catch (err) {
    res.status(errorCode).send({
      message: err.message,
    });
  }
};
