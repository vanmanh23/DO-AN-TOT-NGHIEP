import { ChevronDown, ChevronRight, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GetPatients } from "../apis/dicomApis";
import type {
  InstanceProps,
  PatientProps,
  SeriesProps,
  StudyProps,
} from "../types/types";

export default function TableData() {
  const [listPatient, setListPatient] = useState<PatientProps[]>([]);
  const [headTableforPatients, setHeadTableforPatients] = useState({
    isHeadTitle: true,
    isKey: '',
  });
  const [headTableforStudies, setHeadTableforStudies] = useState({
    isHeadTitle: false,
    isKey: '',
  });
  const [headTableforSeries, setHeadTableforSeries] = useState({
    isHeadTitle: false,
    isKey: '',
  });
  const [headTableforInstances, setHeadTableforInstances] = useState({
    isHeadTitle: false,
    isKey: '',
  });
  const [openPatient, setOpenPatient] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [openStudy, setOpenStudy] = useState<{ [key: string]: boolean }>({}); // key = studyInstanceUID
  const [openSeries, setOpenSeries] = useState<{ [key: string]: boolean }>({}); // key = seriesInstanceUID

  const togglePatient = (index: number) => {
    setOpenPatient((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStudy = (id: string) => {
    setOpenStudy((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSeries = (id: string) => {
    setOpenSeries((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  //
  const forcusOnStudies = (studyInstanceUID: string) => {
    setHeadTableforPatients({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforStudies({
      isHeadTitle: true,
      isKey: studyInstanceUID,
    });
    setHeadTableforSeries({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforInstances({
      isHeadTitle: false,
      isKey: '',
    });
  };
  const forcusOnPatients = (patientID: string) => {
    setHeadTableforPatients({
      isHeadTitle: true,
      isKey: patientID,
    });
    setHeadTableforStudies({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforSeries({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforInstances({
      isHeadTitle: false,
      isKey: '',
    });
  };
  const forcusOnSeries = (id: string) => {
     setHeadTableforPatients({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforStudies({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforSeries({
      isHeadTitle: true,
      isKey: id,
    });
    setHeadTableforInstances({
      isHeadTitle: false,
      isKey: '',
    });
  };
  const forcusOnInstances = (instanceID: string) => {
    setHeadTableforPatients({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforStudies({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforSeries({
      isHeadTitle: false,
      isKey: '',
    });
    setHeadTableforInstances({
      isHeadTitle: true,
      isKey: instanceID,
    });
  };
  useEffect(() => {
      GetPatients().then((res) => setListPatient(res));
  }, []);
  return (
    <div className="container mx-auto w-full flex justify-center">
      <table className="w-[1600px] table-fixed">
        <thead className="bg-gray-800 text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden">
              <th className="px-4 py-2 text-left" colSpan={2}></th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                Patient Name
              </th>
              <th className="px-4 py-2 text-left" colSpan={4}>
                Patient ID
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                BirthDate
              </th>
              <th className="px-4 py-2 text-left">Sex</th>
              <th className="px-4 py-2 text-left">#s</th>
              <th className="px-4 py-2 text-left">#i</th>
            </tr>
          )}
          {headTableforStudies.isHeadTitle && (
            <tr className=" overflow-hidden">
              <th className="px-4 py-2 text-left" colSpan={2}></th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                Study ID
              </th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                studyInstanceUID
              </th>
              <th className="px-4 py-2 text-left">modalities</th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                accession number
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                studyDescription
              </th>
              <th className="px-4 py-2 text-left">#i</th>
            </tr>
          )}
          {headTableforSeries.isHeadTitle && (
            <tr className=" overflow-hidden">
              <th className="px-4 py-2 text-left" colSpan={2}></th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                seriesInstanceUID
              </th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                seriesDescription
              </th>
              <th className="px-4 py-2 text-left">seriesNumber</th>
              <th className="px-4 py-2 text-left">
                modality
              </th>
              <th className="px-4 py-2 text-left" >
                seriesDate
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>numberOfInstances</th>
            </tr>
          )}
          {headTableforInstances.isHeadTitle && (
            <tr className=" overflow-hidden">
              <th className="px-4 py-2 text-left" colSpan={2}></th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                sopInstanceUID
              </th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                sopClassUID
              </th>
              <th className="px-4 py-2 text-left">instanceNumber</th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                instanceCreationDate
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                instanceCreationTime
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Patients */}
          {listPatient?.map((item: PatientProps, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                 className={`bg-gray-100 overflow-hidden ${headTableforPatients.isKey === item.patientID ? "bg-gray-300" : ""}`}
                onMouseMove={() => forcusOnPatients(item.patientID)}
              >
                <td className="px-4 py-2 " colSpan={2}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                    <div className="flex flex-row gap-2 items-center">
                      <List size={20} className="cursor-pointer" />
                      {openPatient[index] ? (
                        <ChevronDown
                          size={20}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <ChevronRight
                          size={20}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.patientName}
                </td>
                <td className="border px-4 py-2" colSpan={4}>
                  {item.patientID}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {new Date(item.patientBirthDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="border px-4 py-2">{item.sex}</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">#</td>
              </tr>
              {/* Studies */}
              {openPatient[index] &&
                item?.studies.map(
                  (item: StudyProps, index: number) => (
                    <React.Fragment key={item.studyInstanceUID}>
                      <tr
                         className={`bg-gray-100 opacity-90 border-t-2 ${headTableforStudies.isKey === item.studyInstanceUID ? "bg-gray-400" : ""}`}
                        onMouseMove={() => forcusOnStudies(item.studyInstanceUID)}
                      >
                        <td className="border px-4 py-2 *:ml-4" colSpan={2}>
                          <div className="flex flex-row justify-between">
                            <p>{index + 1}</p>
                            <div className="flex flex-row gap-2 items-center">
                              <List size={20} className="cursor-pointer" />
                              {openStudy[item.studyInstanceUID] ? (
                                <ChevronDown
                                  size={20}
                                  onClick={() => toggleStudy(item.studyInstanceUID)}
                                  className="cursor-pointer"
                                />
                              ) : (
                                <ChevronRight
                                  size={20}
                                  onClick={() => toggleStudy(item.studyInstanceUID)}
                                  className="cursor-pointer"
                                />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="border px-4 py-2" colSpan={2}>
                          {item.studyID}
                        </td>
                        <td
                          className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                          colSpan={3}
                        >
                          {item.studyInstanceUID}
                        </td>
                        <td className="border px-4 py-2">{item.modality}</td>
                        <td className="border px-4 py-2">
                          {item.accessionNumber}
                        </td>
                        <td className="border px-4 py-2" colSpan={2}>
                          CT
                        </td>
                        <td className="border px-4 py-2">CT1 abdomen</td>
                        <td className="border px-4 py-2">1 5</td>
                      </tr>
                      {/* series */}
                      {openStudy[item.studyInstanceUID] &&
                        item?.series.map((series: SeriesProps) => (
                          <React.Fragment key={series.seriesInstanceUID}>
                            <tr
                               className={`bg-gray-100 opacity-85 border-t-2 ${headTableforSeries.isKey === series.seriesInstanceUID ? "bg-gray-400" : ""}`}
                              onMouseMove={() => forcusOnSeries(series.seriesInstanceUID)}
                              onClick={() =>
                                toggleSeries(series.seriesInstanceUID)
                              }
                            >
                              <td
                                className="border px-4 py-2 *:ml-7"
                                colSpan={2}
                              >
                                <div className="flex flex-row justify-between">
                                  <p>{index + 1}</p>
                                  <div className="flex flex-row gap-2 items-center">
                                    <List
                                      size={20}
                                      className="cursor-pointer"
                                    />
                                    {openSeries[item.studyInstanceUID] ? (
                                      <ChevronDown
                                        size={20}
                                        className="cursor-pointer"
                                      />
                                    ) : (
                                      <ChevronRight
                                        size={20}
                                        className="cursor-pointer"
                                      />
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td
                                className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                colSpan={3}
                              >
                                {series.seriesInstanceUID}
                              </td>
                              <td
                                className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                colSpan={3}
                              >
                                {series.seriesDescription}
                              </td>
                              <td className="border px-4 py-2">
                                {series.seriesNumber}
                              </td>
                              <td className="border px-4 py-2">
                                {series.modality}
                              </td>
                              <td className="border px-4 py-2">
                                {series?.seriesDate?.toLocaleDateString()}
                              </td>
                              <td className="border px-4 py-2"  colSpan={2}>
                                {series.numberOfInstances}
                              </td>
                            </tr>
                            {/* Instances */}
                            {openSeries[series.seriesInstanceUID] &&
                              series?.instances.map(
                                (instance: InstanceProps, index) => (
                                  <tr
                                    key={instance.sopInstanceUID}
                                    className={`bg-gray-100 opacity-80 border-t-5 ${headTableforInstances.isKey === instance.sopInstanceUID ? "bg-gray-300" : ""}`}
                                    onMouseMove={() =>forcusOnInstances(instance.sopInstanceUID)}
                                  >
                                    <td
                                      className="border px-4 py-2 *:ml-11"
                                      colSpan={2}
                                    >
                                      <div className="flex flex-row justify-between">
                                        <p>{index + 1}</p>
                                        <div className="flex flex-row gap-2 items-center">
                                          <List
                                            size={20}
                                            className="cursor-pointer"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td
                                      className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                      colSpan={3}
                                    >
                                      {instance.sopInstanceUID}
                                    </td>
                                    <td
                                      className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                      colSpan={3}
                                    >
                                      {instance.sopClassUID}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {instance.instanceNumber}
                                    </td>
                                    <td className="border px-4 py-2" colSpan={2}>
                                      {new Date(instance?.instanceCreationDate).toLocaleDateString() || ""}
                                    </td>
                                    <td
                                      className="border px-4 py-2"
                                      colSpan={2}
                                    >
                                      {new Date(instance?.instanceCreationTime).toLocaleDateString() || ""}
                                    </td>
                                  </tr>
                                )
                              )}
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  )
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
