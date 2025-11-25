import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import { toast } from "sonner";

type Props = {
    order?: OrderResponse;
};

export default function PatientListAction({ order }: Props) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/admin/receive", {
         state: { orderUpdate: order }
    });
    }
    const handleCancel = async () => {
      try {
        await orderApis.delete(order?.orderId as string);
        toast.success("Hủy phiếu chỉ định thành công!", { duration: 2000, richColors: true } );
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="z-20">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
             <EllipsisVertical size={18} className="text-slate-600"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 bg-white" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleNavigate} className="cursor-pointer">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancel} className="cursor-pointer">
            cancel order
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
