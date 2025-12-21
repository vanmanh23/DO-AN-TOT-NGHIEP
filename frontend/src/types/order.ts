// Types/Interfaces
export interface Department {
  id?: string;
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

export interface ServiceItemRequest {
  serviceCode: string;
  serviceName: string;
  unitPrice: number;
  modalityId: string;
}

export interface Modality {
  id?: string;
  type: string;
  manufacturer: string;
  model: string;
  status: string;
  departmentId?: string;
  department?: Department;
  nameDepartment?: string;
  locationDepartment?: string;
  // serviceItems: ServiceItem[];
}
// Patient Types
export interface Patient {
  name: string;
  birthdate: string;
  gender: "M" | "F" | "O";
  address: string;
  phoneNumber: string;
  identityCard?: string;
  gmail?: string;
}

export interface PatientResponse {
  id?: string;
  patientName: string;
  patientBirthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  age?: number;
  identityCard?: string;
  gmail?: string;
}

export interface PatientDTO {
  id: string;
  name: string;
  birthdate: string;        
  age: number | null;       
  gender: string;          
  address: string;
  identityCard?: string;
  phoneNumber?: string | null;
  orderIds: string[];
  paymentIds: string[];
  gmail?: string;
}

export interface Order {
  patientId?: "";
  priority: "ROUTINE";
  status: "SCHEDULED";
  studyId?: "";
  scheduledAt: "";
  serviceItemIds?: string[];
  completedAt?: "";
  doctorId?: string;
}

export interface DoctorResponse {
  id?: string;
  fullName: string;
  dateOfBirth: string; 
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  doctorCode?: string;
  specialization: string;
  degree: string;
  yearsOfExperience: number;
  clinicRoom: string;
  status: string;
}

export interface StudyResponse {
  id?: string;
  orderId?: string;
  studyInstanceUID: string;
  seriesInstanceUID: string;
  instanceUID: string;
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
  study: StudyResponse;
  serviceItems: ServiceItem[];
  doctor: DoctorResponse;
  payment?: PaymentResponse;
}

export interface PacsUidResponse {
  studyInstanceUID: string;
  seriesInstanceUID: string;
  instanceUID: string;
}

export interface PaymentRequest {
  status: string;
  createdAt: string;  
  paidAt?: string | null;
  method?: string | null;
  orderId: string;
  patientId: string;
}

export interface PaymentResponse {
  id?: string;
  status: string;
  createdAt: string;  
  paidAt?: string | null;
  method: string;
  amount: number;
}

export interface ChangeStatus {
  order_id: string;
  new_status: "NEW" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export interface ReportResult {
  description: string;
  conclusion: string;
  suggestion: string;
  orderId: string;
  studyUID: string;
  seriesUID: string;
  instances: string;
  aiNutriRecommen?: string;
}

export interface ApiResponse<T> {
  message: string;
  result: T;
  errors: string[] | null;
  success: boolean;
}

export interface AIPredict {
  mo_ta: string;
  ket_luan: string;
}