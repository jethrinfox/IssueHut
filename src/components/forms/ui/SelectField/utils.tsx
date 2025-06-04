import { type Persona } from "@/server/db/schema/personas";

import { type SelectOptions } from "./";

export const formatSelectOptions = <
  T extends { id: number } & Record<string, unknown>,
>(
  items: T[],
  key: keyof T,
): SelectOptions => {
  return items.map((item) => {
    const value = item[key];
    if (!value) {
      throw new Error("Missing value in SelectField option");
    }

    return {
      text: value,
      value: item.id.toString(),
    };
  });
};

export const formatSelectPersons = (personas: Persona[]) => {
  return personas
    .sort((a, b) => {
      if (a.apellido < b.apellido) {
        return -1;
      }
      if (a.apellido > b.apellido) {
        return 1;
      }
      return 0;
    })
    .map((persona) => ({
      text: persona.apellido + " " + persona.nombre,
      value: String(persona.id),
    }));
};
