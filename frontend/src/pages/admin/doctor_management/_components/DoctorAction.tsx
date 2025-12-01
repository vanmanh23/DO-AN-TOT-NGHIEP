import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { DoctorResponse } from "../../../../types/order";
import { toast } from "sonner";
import FormEditDoctor from "./FormEditDoctor";
import { useState } from "react";
import doctorsApi from "../../../../apis/doctorApis";

type Props = {
  doctors?: DoctorResponse;
};

export default function ServiceItemsAction({ doctors }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleDelete = async () => {
    try {
      await doctorsApi.delete(doctors?.id as string);
      toast.success("Delete service successfully!", {
        duration: 2000,
        richColors: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-20">
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
              Remove Doctor
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
       <FormEditDoctor open={openEdit} setOpen={setOpenEdit} doctors={doctors} />
    </div>
  );
}
