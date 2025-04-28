import { CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserSection from "./UserSection";
import PasswordSection from "./PasswordSection";

function RightSection() {
  const user = useCurrentUser();

  if (!user) return null;
  return (
    <div className="md:w-2/3 space-y-6">
      <CardContent className="space-y-4">
        <UserSection />
        <PasswordSection />
      </CardContent>
    </div>
  );
}

export default RightSection;
