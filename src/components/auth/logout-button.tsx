"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await authService.logout();
        router.replace("/login");
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
