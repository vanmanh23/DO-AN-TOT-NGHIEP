// This type is used to define the shape of our data.

import type { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
// import { Link } from "react-router-dom";
import type { DiagnoseProps, StudyProps } from "../../../../types/types";
import StudyDetailsDialog from "./StudyDetailsDialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import DiagnoseUpdate from "./DiagnoseUpdate";

// You can use a Zod schema here if you want.
export type Study = {
  patientName: string;
  studyID: string;
  modality: string;
  studyDates: Date;
  diagnose: DiagnoseProps | undefined;
  studyInstanceUID: string;
  studyTime?: Date;
  accessionNumber?: string;
  studyDescription?: string;
  referringPhysicianName?: string;
  numberOfSeries?: number;
  numberOfInstances?: number;
  patientID?: string;
  sex?: string;
  patientBirthDate?: Date;
  id?: number;
  studyId?: string;
  description?: string;
};

export const columns: ColumnDef<StudyProps>[] = [
  {
    id: "InfoDetails",
    cell: ({ row }) => {
      return (
        <div>
          <StudyDetailsDialog props={row.original} />
        </div>
      );
    },
  },
  {
    accessorKey: "patientName",
    header: "Patient’s name",
  },
  {
    accessorKey: "modality",
    header: "modality",
  },
  {
    id: "studyDate",
    accessorKey: "studyDate",
    header: "Study Date",
    cell: ({ row }) => {
      return (
        <div className="p-1 hover:bg-gray-100 rounded-md text-secondary">
          {new Date(row.original.studyDate).toLocaleDateString("vi-VN")}
        </div>
      );
    },
  },
  {
    accessorKey: "studyTime",
    header: "Study Time",
    cell: ({ row }) => {
      return (
        <div className="p-1 hover:bg-gray-100 rounded-md text-secondary">
          {row.original.studyTime
            ? new Date(row.original.studyTime).toLocaleTimeString("vi-VN")
            : "No study time available"}
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "diagnose",
    header: "Status",
    cell: ({ row }) => {
      return row.original.diagnose?.description ? (
        <p className="px-2 py-1 bg-green-500 rounded-full w-fit text-white">
          Diagnosed
        </p>
      ) : (
        <p className="px-2 py-1 bg-red-500 rounded-full w-fit text-white">
          not diagnosed yet
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end text-secondary">
          <div className=" hover:bg-gray-100 rounded-md">
            {/* <Link to={`/diagnosis/${row.original.studyInstanceUID}`}>
              <Copy size={16} className="text-menu-items" />
            </Link> */}
            {/*  */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Copy size={16} className="text-menu-items" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 flex flex-col items-center justify-center overflow-auto bg-white no-scrollbar">
                <div className="">
                  <DiagnoseUpdate id={row.original.studyInstanceUID} />
                </div>
              </DialogContent>
            </Dialog>

            {/*  */}
          </div>
        </div>
      );
    },
  },
];
