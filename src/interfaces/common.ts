import { IGenericErrorMessage } from './Error';

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  // errorMessages: {
  //   path: string
  //   message: string
  // }[]
  errorMessages: IGenericErrorMessage[];
}
