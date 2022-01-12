import { User } from "../types/user.interface";

export async function getUser(id: string) {
  const response = await fetch(`http://localhost:5000/users/${id}`);

  if (response.ok) {
    return (await response.json()) as User;
  } else {
    return null;
  }
}
