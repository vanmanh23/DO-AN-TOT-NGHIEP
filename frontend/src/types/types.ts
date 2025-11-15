// export type PatientProps = {
//     patientName: string;
//     patientID: string;
//     sex: string;
//     patientBirthDate: Date;
// };
export type PatientProps = {
    name: string;
    patientID: string;
    gender: string;
    birthdate: Date;
    // studies: StudyProps[];
};

export type StudyProps = {
  studyInstanceUID: string;
  studyID: string;
  studyDate: Date;
  studyTime?: Date;
  accessionNumber?: string;
  studyDescription?: string;
  referringPhysicianName?: string;
  modality: string;
  numberOfSeries?: number;
  numberOfInstances?: number;

  patientID?: string;
  patientName: string;
  series: SeriesProps[]
  diagnose?: DiagnoseProps| undefined;
  studyDates: Date;

  sex?: string;
  patientBirthDate?: Date;
  id?: number;
  studyId?: string;
  description?: string;
}

export type SeriesProps = {
  seriesInstanceUID: string;
  seriesDescription: string;
  seriesNumber: string;
  modality: string;
  numberOfInstances: number;
  seriesDate: Date;
  seriesTime: Date;
  studyInstanceUID: string;
  instances?: InstanceProps[]
}
export type InstanceProps = {
  referencedSopInstanceUID: string;
  instanceNumber: string;
  sopClassUID: string;
  sopInstanceUID: string;
  studyInstanceUID: string;
  seriesInstanceUID: string;
  pixelData: string;
  instanceCreationDate: Date;
  instanceCreationTime: Date;
}
export type DiagnoseProps = {
  id?: number;
  description: string;
  studyId: string;
}

// export type ModalitiesProps = {
//   id: string;
//   type: string;
//   manufacturer: string;
//   model: string;
//   status: string;
//   departmentId: string;
//   department: DepartmentProps;
//   serviceItems: Set<ServiceItemProps>;
// }
// export type ServiceItemProps = {
//   id: string;
//   serviceCode: string;
//   serviceName: string;
//   // modality: ModalitiesDTO;
//   unitPrice: number;
// }
// export type DepartmentProps = {
//     id: string;
//     name: string;
//     location: string;
// }
// export type BaseResponse<T = unknown, E = unknown> = {
//   isSuccess: boolean;
//   message: string;
//   result: T;
//   errors: E;
// };