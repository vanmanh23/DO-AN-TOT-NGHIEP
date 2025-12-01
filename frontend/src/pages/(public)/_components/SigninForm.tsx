import { Button } from "../../../components/ui/button";
import { SignIn } from "../../../apis/authApis";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type SignInProps = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInProps>();

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    try {
      const res = await SignIn(data);
      localStorage.setItem("token", res.result.accessToken);
      if (res.result.accessToken) {
        toast.success("Login successfully!", { duration: 2000, position: "bottom-right",richColors: true }, );
        navigate("/admin");
      }
      // const role = await verifyToken(res.access_tocken);
      // if (role.role === "admin") {
      //   window.location.href = "/admin";
      // } else {
      //   window.location.reload();
      // }
    } catch (error) {
      toast.error("Login failed!", { duration: 2000, position: "bottom-right", richColors: true }, );
      console.error("Login failed", error);
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
        <h3 className="md:text-xl text-lg font-semibold py-3">Login to your account</h3>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="md:text-sm text-xs text-secondary uppercase">Email</label>
            <input
              className="rounded-sm p-1 border border-slate-200 outline-bg-secondary"
              {...register("email", {
                required: "email is required",
                maxLength: 100,
              })}
            />
            {errors.email && (
              <p role="alert" className="text-red-500">
                username is required
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="md:text-sm text-xs text-secondary uppercase">Password</label>
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
          <Button
            type="submit"
            className="bg-bg-secondary w-full font-semibold text-white hover:bg-bg-secondary/70 mt-2 "
          >
            Login now
          </Button>
        </form>
      </div>
    </div>
  );
}
