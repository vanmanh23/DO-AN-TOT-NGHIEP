import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateUser, type CreateUserRequest } from "../../../../apis/authApis";
import { toast } from "sonner";

export default function AddAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserRequest>();
  const onSubmit = async (data: CreateUserRequest) => {
    const res = await CreateUser(data);
    if (res) {
      toast.success("Create user successfully!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      window.location.reload();
    } else {
      toast.error("Create user failed!", {
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
          <Button className=" bg-bg-secondary hover:bg-bg-secondary/70 text-white h-fit">
            <div className="flex flex-row items-center justify-center h-full">
              <Plus />
              <span className="ml-2 text-sm">Add User</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[43%] md:h-[93%] h-full overflow-y-scroll no-scrollbar  rounded-xl bg-white md:p-3 p-2 xl:space-y-3 md:space-y-3 space-y-2 shadow-lg">
          <div className="w-full flex justify-center items-center min-h-fit">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg  p-1 w-full "
            >
              <h2 className="text-center md:text-xl text-sm font-semibold mb-3">
                + Add Account
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
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
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "password is required",
                  })}
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
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your email"
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
                <label htmlFor="role-access" className="block mb-1 font-medium">
                  Access <span className="text-red-500">*</span>
                </label>
                <select
                  id="role-access"
                  multiple
                  className="border p-2 rounded w-full h-40"
                  {...register("role", {
                    required: "Access user role is required",
                  })}
                >
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_DOCTOR">Doctor</option>
                  <option value="REGISTRATION_STAFF">Registration Staff</option>
                </select>
              </div>

              {/* Submit */}
              <div className="flex flex-row justify-end gap-2 text-center mb-5">
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
