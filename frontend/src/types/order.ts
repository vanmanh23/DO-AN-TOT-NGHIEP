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
  modality: Modality;
}

export interface Modality {
  id: string;
  type: string;
  manufacturer: string;
  model: string;
  status: string;
  departmentId: string;
  department: Department;
  // serviceItems: ServiceItem[];
}
// Patient Types
export interface Patient {
  name: string;
  birthdate: string;
  gender: "M" | "F" | "O";
  address: string;
  phoneNumber: string;
}

export interface PatientResponse {
  id?: string;
  patientName: string;
  patientBirthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  age: number;
}

export interface Order {
  patientId?: "";
  priority: "ROUTINE";
  status: "NEW";
  studyId?: "";
  scheduledAt: "";
  serviceItemIds?: string[];
  completedAt?: "";
}

export interface OrderResponse {
  orderId: string;
  priority: string;
  status: string;
  createdAt: string;        // ISO datetime string
  scheduledAt: string | null;
  completedAt: string | null;
  patientId: string;
  patientBirthday: string;
  patientName: string;
  patient?: PatientResponse;
  studyId: string | null;
  serviceItems: ServiceItem[];
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
