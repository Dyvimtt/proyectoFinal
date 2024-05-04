import { EmployeeInfo } from "./employeeinfo.model";

export interface LoginResponse {
  status: number;
  results: EmployeeInfo[];
}
