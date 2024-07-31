export interface IBasicStudent {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  grade: string;
}
export interface IStudent extends IBasicStudent {
  id: number;
  createdAt: string;
  updatedAt: string;
}
