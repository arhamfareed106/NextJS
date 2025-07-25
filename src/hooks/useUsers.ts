import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "waiting_activation";
  roles?: string[];
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        roles: ["User"],
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "waiting_activation",
        roles: ["User"],
      },
      {
        id: "3",
        name: "Admin User",
        email: "admin@example.com",
        status: "active",
        roles: ["Administrator"],
      },
    ];
    setUsers(mockUsers);
  }, []);

  return { users };
};
