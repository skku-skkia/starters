"use client";

import { Badge } from "@/components/ui/badge";
import { useAdmins } from "@/features/user/api/get-admins";
import { useViewer } from "@/features/user/api/get-viewer";

export default function UserList() {
  const { data: viewer } = useViewer();
  const { data: admins } = useAdmins();

  return (
    <div>
      {admins &&
        admins.map((admin) => (
          <div key={admin.id} className="p-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{admin.username}</h2>
              {viewer && viewer.id === admin.id ? <Badge>me</Badge> : null}
            </div>

            <p className="text-sm text-gray-600">{admin.email}</p>
          </div>
        ))}
    </div>
  );
}
