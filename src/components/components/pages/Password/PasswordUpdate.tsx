import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (password !== passwordConfirm)
        throw new Error("password and confirmPassword is not matching");
    },
    onSuccess: () => {
      toast.success("Password update successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Password update Failed");
    },
  });

  return (
    <div className="flex justify-center pt-10 sm:pt-32 p-4 bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg bg-card rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Update Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Old Password
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter old password"
              className="mt-1"
              required={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              New Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1"
              required={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1"
              required
            />
          </div>
          <Button className="w-full" onClick={() => mutation.mutate()}>
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordUpdate;
