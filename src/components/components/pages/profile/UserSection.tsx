import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { nameSchema, NameType } from "@/schema/schema";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addUser } from "@/store/userSlice";
import { SyncLoader } from "react-spinners";
import { updateMyName } from "@/services/backend";

function UserSection() {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameType>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (name: NameType) => updateMyName(name),
    onSuccess: (user) => {
      if (user) {
        dispatch(addUser(user));
      }
      toast.success("Name Updated Successfully!");
    },
    // onError: handleApiError,
  });

  if (!user) return null;

  const onSubmit = (data: NameType) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <div className="flex items-center gap-2">
          <Input {...register("name")} className="mt-0.5" />
          <Button type="submit" disabled={isPending} className="text-white">
            {isPending ? <SyncLoader color="#FFF" size={10} /> : "Update Name"}
          </Button>
        </div>
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input value={user.email} disabled className="mt-0.5" />
      </div>
    </form>
  );
}

export default UserSection;
