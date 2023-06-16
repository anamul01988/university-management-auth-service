import { IGenericErrorMessage } from './Error';

export interface IGenericResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}
export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  // errorMessages: {
  //   path: string
  //   message: string
  // }[]
  errorMessages: IGenericErrorMessage[];
}


export type IAcademicSemesterFilters = {
  searchTerm: string;
};