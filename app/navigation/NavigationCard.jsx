import React from "react";
import { useRouter } from "next/navigation";

export default function NavigationCard() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard/settings");
  };

  return (
    <div>
      <h3>Account Overview</h3>
      <button type="button" onClick={handleNavigate}>
        Go to Settings
      </button>
    </div>
  );
}
