import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import type { Modality } from "../../../../types/order";
import { toast } from "sonner";
import FormEditService from "./FormEditDevice";
import { useState } from "react";
import devicesApi from "../../../../apis/deviceApis";

type Props = {
  devices?: Modality;
};

export default function DevicesAction({ devices }: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleDelete = async () => {
    try {
      await devicesApi.delete(devices?.id as string);
      toast.success("Delete device successfully!", {
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
          <div className="flex justify-end">
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
              Remove device
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
       <FormEditService open={openEdit} setOpen={setOpenEdit} devices={devices} />
    </div>
  );
}
