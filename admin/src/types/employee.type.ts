export enum EmployeeStatus {
  ACTIVE = 'Active',
  RESIGNED = 'Resigned',
  PROBATION = 'Probation',
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  workLine: string | null;
  department: string | null;
  position: string | null;
  status: EmployeeStatus;
}
