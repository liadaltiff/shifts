export interface User {
  _id: string;
  fullName: string;
  password: string;
  role: Roles;
}

export type Roles = "Officer" | "Soldier";
