import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordUpdateSchema, TypePasswordUpdate } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { updateMyPassword } from "@/services/backend";

function PasswordSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypePasswordUpdate>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TypePasswordUpdate) => updateMyPassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      reset();
    },
    // onError: handleApiError,
  });

  const onSubmit = (data: TypePasswordUpdate) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 border-t flex flex-col items-end space-y-2"
    >
      <div className="w-full">
        <label className="text-sm font-medium">Current Password</label>
        <Input
          type="password"
          disabled={isPending}
          placeholder="Enter current password"
          {...register("currentPassword")}
          className="mt-0.5"
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label className="text-sm font-medium">New Password</label>
        <Input
          type="password"
          disabled={isPending}
          placeholder="Enter new password"
          {...register("password")}
          className="mt-0.5"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          type="password"
          disabled={isPending}
          placeholder="Confirm new password"
          {...register("passwordConfirm")}
          className="mt-0.5"
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-red-500 mt-1">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-4 text-white max-w-40"
      >
        {isPending ? <SyncLoader color="#FFF" size={8} /> : "Update Password"}
      </Button>
    </form>
  );
}

export default PasswordSection;
