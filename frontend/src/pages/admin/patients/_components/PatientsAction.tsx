import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { PatientResponse } from "../../../../types/order";
import { toast } from "sonner";
import { useState } from "react";
import patientApi from "../../../../apis/patientApis";
import FormEditPatient from "./FormEditPatient";

type Props = {
  patients?: PatientResponse;
};

export default function PatientsAction({ patients }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleDelete = async () => {
    try {
      await patientApi.delete(patients?.id as string);
      toast.success("Delete patient successfully!", {
        duration: 2000,
        richColors: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-20 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <EllipsisVertical size={18} className="text-slate-600" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-white" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer outline-bg-secondary"
              onSelect={(e) => {
                e.preventDefault(); // ngăn Dropdown đóng
                setOpenEdit(true);
              }}
            >
             <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="cursor-pointer outline-bg-secondary"
            >
              Remove Service
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
       <FormEditPatient open={openEdit} setOpen={setOpenEdit} patientEdit={patients} />
    </div>
  );
}
