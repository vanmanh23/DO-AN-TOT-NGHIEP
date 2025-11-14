import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { SquarePen } from "lucide-react";
import type { User } from "./columns";
import { useForm } from "react-hook-form";
import { UpdateUser } from "../../../../apis/authApis";
import { toast } from "sonner";

export default function PatientDetailsDialog({ props }: { props: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = async (data: User) => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("You are not logged in!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      return;
    }
    console.log("input---------------",data);
    const res = await UpdateUser(data, props.id, token);
    console.log("output---------------",res);
    if (res) {
      toast.success("User updated successfully!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      window.location.reload();
    } else {
      toast.error("User update failed!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white outline-none hover:bg-gray-100">
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-96 md:h-[50%] h-full overflow-y-scroll no-scrollbar rounded-xl bg-white md:p-3 p-2 xl:space-y-3 md:space-y-3 space-y-2 shadow-lg">
          <div className="w-full flex justify-center items-center min-h-fit">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg  p-1 w-full "
            >
              <h2 className="text-center text-xl font-semibold mb-3">
                Edit user
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={props.username}
                  {...register("username", { required: "Name is required" })}
                  className="w-full px-2 py-1 border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Password <span className="text-secondary">(optional)</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your new password (optional)"
                  {...register("password")}
                  className="w-full  px-2 py-1  border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={props.phoneNumber}
                  {...register("phoneNumber", { required: "Name is required" })}
                  className="w-full  px-2 py-1  border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  defaultValue={props.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full px-2 py-1  border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              {/* role */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Access <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    id="role"
                    value="admin"
                    {...register("role")}
                  />
                  <label htmlFor="vehicle1">Admin</label>
                  <input
                    type="checkbox"
                    id="role"
                    value="user"
                    checked
                    {...register("role", {
                      required: "Access user role is required",
                    })}
                  />
                  <label htmlFor="vehicle2"> User</label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-row justify-end gap-2 text-center">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-bg-secondary hover:bg-bg-secondary/75 text-white font-semibold px-6 rounded-md transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
