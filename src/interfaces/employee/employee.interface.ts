export interface EmployeeI {
  id: string;
  profileId: string;
  name: string;
  identification: string;
  photo: null;
  email: string;
  phone: string;
  role: string;
  office: OfficeI;
}

export interface OfficeI {
  id: string;
  name: string;
}
