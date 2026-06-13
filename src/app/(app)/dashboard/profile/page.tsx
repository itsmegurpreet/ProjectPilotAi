"use client";

import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { useProfile } from "@/hooks/use-profile";

export default function ProfilePage() {
  const query = useProfile();

  if (query.isLoading) return <LoadingCards />;
  if (query.isError || !query.data)
    return <ErrorState onRetry={() => query.refetch()} />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">User Profile</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage profile preferences and account details.
        </p>
      </div>
      <ProfileForm
        initialData={{
          name: query.data.name,
          email: query.data.email,
          role: query.data.role,
          timezone: query.data.timezone,
        }}
      />
    </div>
  );
}
