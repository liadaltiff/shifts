import { Shift } from "../types/shift.interface";

export async function getShift(id: string) {
  const response = await fetch(`http://localhost:5000/shifts/${id}`);

  if (response.ok) {
    return (await response.json()) as Shift;
  } else {
    return null;
  }
}
