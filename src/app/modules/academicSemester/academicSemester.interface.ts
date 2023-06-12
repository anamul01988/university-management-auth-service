import { Model } from 'mongoose';

// export type IAcademicSemester = {
//   year: string;
//   code: string;
//   startMonth: string;
//   endMonth: string;
// };
type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IAcademicSemester {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: number;
  code: '01' | '02' | '03';
  startMonth: Month;
  endMonth: Month;
}

export type AcademicSemesterModel = Model<IAcademicSemester>; //static methods
