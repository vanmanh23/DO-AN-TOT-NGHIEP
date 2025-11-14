import { ChevronRight, Copy } from 'lucide-react';
import React, { useEffect } from 'react'
import { GetPatients } from '../apis/dicomApis';

interface DataD {
        namePatients: string,
        idPatients: string,
        divice: string,
        birthday: Date,
        numberIntances: string
    }
type PatientProps = {
    patientName: string,
    patientID: string,
    sex: string,
    patientBirthDate: Date,
}
export default function ListPatients() {
    const [patients, setPatients] = React.useState([]);

    useEffect(() => {
        const fetchdata = async () => {
        const res = await GetPatients();
        setPatients(res);
    }
    fetchdata();

    }, [])

  return (
     <div className="container mx-auto  bg-gray-900 text-white">
                    <div className="flex p-4 justify-between items-center mb-4">
                        <div className="text-2xl font-semibold">Danh sách</div>
                        <div className="text-gray-400">77 Studies</div>
                    </div>

                    <div className="grid px-4 grid-cols-6 gap-2 mb-3">
                        <div>
                            <div className="flex items-center">
                                Tên Bệnh nhân
                                <i className="fas fa-sort text-gray-400 ml-1"></i>
                            </div>
                            <input type="text" className="bg-gray-700 text-white rounded p-1 w-full" />
                        </div>
                        <div>
                            <div className="flex items-center">
                                Mã Bệnh nhân
                                <i className="fas fa-sort text-gray-400 ml-1"></i>
                            </div>
                            <input type="text" className="bg-gray-700 text-white rounded p-1 w-full" />
                        </div>
                        <div>
                            <div className="flex items-center">
                                Giới tính
                                <i className="fas fa-sort text-gray-400 ml-1"></i>
                            </div>
                            <select className="bg-gray-700 text-white rounded p-1 w-full">
                                <option></option>
                                <option>Trai</option>
                                <option>Gái</option>
                                <option>Khác</option>
                            </select>
                        </div>
                        <div>
                            <div className="flex items-center">
                                Mã phiếu
                                <i className="fas fa-sort text-gray-400 ml-1"></i>
                            </div>
                            <select className="bg-gray-700 text-white rounded p-1 w-full">
                                <option></option>
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            Instances
                        </div>
                    </div>

                    <div className='bg-white h-3 w-full'/>
                    
                    <div className="overflow-x-auto p-5">
                        <table className="table-auto w-full">
                            <tbody className=''>
                                {patients.map((patient: PatientProps) => (
                                    <TableRow
                                        key={patient.patientID}
                                        namePatients={patient.patientName}
                                        idPatients={patient.patientID}
                                        divice={patient.sex}
                                        birthday={patient.patientBirthDate}
                                        numberIntances='11'
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
  )
  
}

 function TableRow({ namePatients, idPatients, divice, birthday, numberIntances }: DataD) {
            return (
                <tr className="hover:bg-gray-800 grid grid-cols-6 gap-2 mb-2">
                    <td className="p-1 pl-2 flex flex-row gap-3">
                        <ChevronRight size={18} />
                        {namePatients}
                    </td>
                    <td className="p-1">{idPatients}</td>
                    <td className="p-1">{divice}</td>
                    <td className="p-1">{new Date(birthday).toLocaleDateString("vi-VN")}</td>

                    <td className="p-1 text-right pr-2 col-span-2  flex flex-row justify-end gap-3">
                        <Copy size={18} />
                        {numberIntances}
                    </td>
                </tr>
            );
        }