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