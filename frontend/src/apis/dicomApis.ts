import axios from "axios";
import type {
  DiagnoseProps,
  InstanceProps,
  PatientProps,
  PatientStudyProps,
  SeriesProps,
} from "../types/types";
import type { ApiResponse, PacsUidResponse } from "../types/order";

// const url = import.meta.env.VITE_DICOM_APIS;
const url = "http://localhost:8081/api/pacsdcm";

export const GetStudiesByStudyInstanceUID = async (
  studyInstanceUID: string
) => {
  const res = await axios
    .get(`${url}/studies/${studyInstanceUID}/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const GetPatientStudy = async (): Promise<PatientStudyProps[]> => {
  const tokenStr = localStorage.getItem("token");
  const Patientres = await axios
    .get(`${url}/patients`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const Studyres: PatientStudyProps[] = await axios
    .get(`${url}/studies/tags`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Lỗi lấy study", err);
      return [];
    });

  for (const patient of Patientres) {
    patient.studies = Studyres.filter(
      (study) => study.patientID === patient.patientID
    );
  }

  return Patientres;
};
export const getStudyCount = async () => {
  const res = await axios
    .get(`${url}/studies/count`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.count;
};
export const getStudySize = async () => {
  const res = await axios
    .get(`${url}/studies/size`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.size;
};
export const getStudies = async () => {
  const res = await axios
    .get(`${url}/studies/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const getAllDiagnoses = async () => {
  const res = await axios
    .get(`${url}/diagnoses`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const uploadDicomImg = async (
  e: React.ChangeEvent<HTMLInputElement>,
  new_name: string,
  sex: string
): Promise<ApiResponse<PacsUidResponse[]>> => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]); // KEY phải là "file" để Spring nhận đúng
  }
  formData.append('new_name', new_name);
    formData.append('sex', sex);
  try {
    const res = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res);
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};


export const getSeries = async (studyUID: string): Promise<SeriesProps[]> => {
  const res = await axios
    .get(`${url}/studies/${studyUID}/series/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const getInstances = async (
  studyUID: string,
  seriesUID: string
): Promise<InstanceProps[]> => {
  const res = await axios
    .get(`${url}/studies/${studyUID}/series/${seriesUID}/instances/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const getPatients = async (token: string): Promise<PatientProps[]> => {
  const res = await axios
    .get(`${url}/patients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
    return res;
}
export const updateDiagnose = async (data: DiagnoseProps) => {
  const res = await axios
    .put(`${url}/diagnose`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
}
export const getDiagnoseByStudyInstanceId = async (studyInstanceUID: string) => {
  const res = await axios
    .get(`${url}/diagnoses/${studyInstanceUID}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
    return res
}