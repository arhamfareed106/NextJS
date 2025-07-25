"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { Separator } from "@radix-ui/react-dropdown-menu";

// Mock user data
interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
];

export default function UserEdit() {
  const params = useParams();
  const id = params.id as string;
  const user = mockUsers.find((u) => u.id === id);

  const [formData, setFormData] = useState(
    user
      ? {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: "",
          repeatPassword: "",
        }
      : null
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Implement delete logic here
      console.log("Deleting user:", id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Users", href: "/admin/users" },
    {
      label: `${user?.name} ${user?.lastName}`,
      href: `/admin/users/${user?.id}`,
    },
  ];

  return (
    <ContentLayout title={`Admin Panel: User Management`}>
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2" />
      {!user || !formData ? (
        <div className="md:w-1/2">
          <Card>
            <CardContent>
              <Separator className="py-4" />
              <div className="text-center">
                <p>User not found</p>
                <Link href="/admin/users">
                  <Button variant="ghost" className="mt-2">
                    Return to Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="">
          <h1 className="text-2xl font-semibold mb-8">
            Edit user{" "}
            <span className="text-purple-500">
              {user.name} {user.lastName}
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeatPassword">Repeat password</Label>
                  <Input
                    id="repeatPassword"
                    type="password"
                    placeholder="••••••••••"
                    value={formData.repeatPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        repeatPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex  gap-2">
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  className="w-full text-red-600 hover:bg-red-400"
                >
                  Delete User
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </ContentLayout>
  );
}
