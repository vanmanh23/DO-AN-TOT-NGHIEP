import { Trash } from "lucide-react";
import { DeleteUser } from "../../../../apis/authApis";
import { toast } from "sonner";

export default function RemoveHandle({id}: { id:string }) {
  const token = localStorage.getItem("token");
  if (token === null) {
    toast.error("You are not logged in!", {
      duration: 2000,
      position: "bottom-right",
      richColors: true,
    });
    return;
  }
  const handleRemove = async () => {
    const res = await DeleteUser(id, token);
    if (res) {
      toast.success("User deleted successfully!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      window.location.reload();
    } else {
      toast.error("User delete failed!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
    }
  };
  return (
    <div>
      <Trash
        size={18}
        className="text-red-500 cursor-pointer"
        onClick={handleRemove}
      />
    </div>
  );
}
