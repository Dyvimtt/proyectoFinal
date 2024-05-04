export interface EmployeeInfo {

  id_employee: string;
  first_name: string | null;
  second_name: string | null;
  DNI: string | null;
  email_employee: string;
  phone: string | null;
  role: string | null;
  hire_date: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
  token_employee: string;
  token_exp_employee: number;
}
