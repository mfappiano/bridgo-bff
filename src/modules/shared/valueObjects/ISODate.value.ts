import { z } from 'zod';

// Esquema Zod para validar fechas ISO
export const ISODateSchema = z
  .string()
  .refine((value) => !isNaN(new Date(value).getTime()), { message: 'Invalid ISO date format' });

// Tipo derivado del esquema
export type ISODateType = z.infer<typeof ISODateSchema>;

// Clase ISODate compatible con la API anterior
export class ISODate {
  public readonly value: ISODateType;

  constructor(value: string) {
    // Valida que sea una fecha ISO válida
    this.value = ISODateSchema.parse(value);
  }

  static fromTimestamp(timestamp: number): ISODate {
    return new ISODate(new Date(timestamp).toISOString());
  }

  toTimestamp(): number {
    return new Date(this.value).getTime();
  }

  // Método adicional para validar cadenas directamente sin crear instancias
  static validate(value: unknown): ISODateType {
    return ISODateSchema.parse(value);
  }

  // Método adicional para validar de forma segura
  static safeParse(value: unknown) {
    return ISODateSchema.safeParse(value);
  }
}
