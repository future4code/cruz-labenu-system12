export type student = {
   id: number,
   name: string,
   email: string,
   birthday: Date,
   hobby: string,
   classId: number,
}

export type teacher = {
   id: number,
   name: string,
   email: string,
   birthday: Date,
   specialty: string,
   classId: number,
}

export type Class = {
   id: number,
   name: string,
   startDate: Date,
   endDate: Date,
   module: string,
}

