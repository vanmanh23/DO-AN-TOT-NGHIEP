import type { DiagnoseProps, StudyProps } from "../types/types"


export const mergeStudiesDiagnoseData = (studies: StudyProps[], diagnose: DiagnoseProps[]): StudyProps[] => {
     return studies.map((study) => {
    const matchedDiagnose = diagnose.find(
      (d) => d.studyId === study.studyInstanceUID
    );

    return {
      ...study,
      diagnose: matchedDiagnose ?? undefined, // Nếu không có thì để null hoặc giữ nguyên
    };
  });
}