import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { SignUp, type userProps } from "../../../../apis/authApis";

export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<userProps>();

  const onSubmit: SubmitHandler<userProps> = async (data) => {
    console.log(data);
    try {
      const res = await SignUp(data);
      if (res) {
        toast.success("Create user successfully!", {
          duration: 2000,
          position: "bottom-right",
          richColors: true,
        });
        navigate(-1);
      }
    } catch (error) {
      toast.error(`create user failed! ${error}`, {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      console.error("create user failed", error);
    }
  };
  return (
    <div className="flex flex-col border border-slate-300 md:p-5 p-2 rounded-md gap-3 md:py-5 py-2">
      <div className="flex flex-col justify-center items-center">
        <img
          src="/src/assets/logo_img.png"
          alt="logo"
          className="md:w-1/3 md:h-1/3 w-1/4 h-1/4"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="md:text-xl text-lg font-semibold py-3">Create User</h3>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="md:text-sm text-xs text-secondary uppercase"
            >
              UserName
            </label>
            <input
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("username", {
                required: "username is required",
                maxLength: 20,
              })}
            />
            {errors.username && (
              <p role="alert" className="text-red-500">
                username is required
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="md:text-sm text-xs text-secondary uppercase"
            >
              Password
            </label>
            <input
              type="password"
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p role="alert" className="text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* <div className="flex flex-col">
            <label
              htmlFor="role"
              className="md:text-sm text-xs text-secondary uppercase"
            >
              role
            </label>
            <input
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("role", {
                required: "role is required",
                maxLength: 20,
              })}
            />
            {errors.role && (
              <p role="alert" className="text-red-500">
                role is required
              </p>
            )}
            <select
              id="role"
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("role", {
                required: "role is required",
              })}
              defaultValue="user"
            >
              <option value="" disabled>
                -- Select role --
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            {errors.role && (
              <p role="alert" className="text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>  */}
          <div className="flex flex-col">
            <label className="md:text-sm text-xs text-secondary uppercase">
              Role
            </label>

            <div className="flex flex-col gap-2 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="admin"
                  {...register("role", {
                    required: "At least one role is required",
                  })}
                />
                <span>Admin</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="user"
                  {...register("role", {
                    required: "At least one role is required",
                  })}
                />
                <span>User</span>
              </label>
            </div>

            {errors.role && (
              <p role="alert" className="text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="md:text-sm text-xs text-secondary uppercase"
            >
              Email
            </label>
            <input
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("email", {
                required: "email is required",
                maxLength: 20,
              })}
            />
            {errors.email && (
              <p role="alert" className="text-red-500">
                email is required
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="md:text-sm text-xs text-secondary uppercase"
            >
              Phone Number
            </label>
            <input
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("phoneNumber", {
                required: "phone number is required",
                maxLength: 20,
              })}
            />
            {errors.phoneNumber && (
              <p role="alert" className="text-red-500">
                username is required
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-bg-secondary w-full font-semibold text-white hover:bg-bg-secondary/70 mt-2 "
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
