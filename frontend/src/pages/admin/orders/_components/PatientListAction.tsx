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
    const handleScheduled = async () => {
      try {
        // await orderApis.delete(order?.orderId as string);
        await orderApis.ChangeStatus({order_id: order?.orderId as string, new_status: "SCHEDULED"});
        toast.success("Scheduled order successfully!", { duration: 2000, richColors: true } );
        window.location.reload();
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
          <DropdownMenuItem onClick={handleScheduled} className="cursor-pointer">
            Scheduled Order
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
