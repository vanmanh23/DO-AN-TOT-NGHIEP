// Types/Interfaces
export interface Department {
  id: string;
  name: string;
  location: string;
}

export interface ServiceItem {
  id: string;
  serviceCode: string;
  serviceName: string;
  unitPrice: number;
}

export interface Modality {
  id: string;
  type: string;
  manufacturer: string;
  model: string;
  status: string;
  departmentId: string;
  department: Department;
  serviceItems: ServiceItem[];
}
// Patient Types
export interface Patient {
  name: string;
  birthdate: string;
  gender: 'M' | 'F' | 'O';
  address: string;
  phoneNumber: string;
}

export interface PatientResponse {
  name: string;
  birthdate: string;
  gender: string;
  address: string;
  phoneNumber: string;
}

// // Modality Types
// export interface Department {
//   id: string;
//   name: string;
//   location: string;
// }

// export interface ServiceItem {
//   id: string;
//   serviceCode: string;
//   serviceName: string;
//   unitPrice: number;
// }

//  export interface Modality {
//   id: string;
//   type: string;
//   manufacturer: string;
//   model: string;
//   status: string;
//   departmentId: string;
//   department: Department;
//   serviceItems: ServiceItem[];
// }
export interface ApiResponse<T> {
  message: string;
  result: T;
  errors: string[] | null;
  success: boolean;
}