import { api } from "@/lib/api";

export type UserRole = "EMPLOYER" | "EMPLOYEE";

export async function getUser(address: string) {
  const res = await api.get(`/user/${address}`);
  return res.data;
}

export async function createUser(address: string, role: UserRole) {
  const res = await api.post("/user/role", {
    address,
    role,
  });
  return res.data;
}
