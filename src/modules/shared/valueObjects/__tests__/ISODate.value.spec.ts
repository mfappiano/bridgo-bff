import { describe, it, expect } from 'vitest';
import { ISODate, ISODateSchema } from '../ISODate.value';

describe('ISODate', () => {
  // Prueba del constructor
  describe('constructor', () => {
    it('debería crear una instancia con una fecha ISO válida', () => {
      const validDate = '2023-01-01T00:00:00.000Z';
      const isoDate = new ISODate(validDate);
      expect(isoDate.value).toBe(validDate);
    });

    it('debería lanzar un error cuando se proporciona una fecha inválida', () => {
      const invalidDate = 'fecha-invalida';
      expect(() => new ISODate(invalidDate)).toThrow();
    });

    it('debería aceptar varios formatos de fecha ISO válidos', () => {
      // Formato completo
      expect(() => new ISODate('2023-01-01T12:30:45.123Z')).not.toThrow();

      // Sin milisegundos
      expect(() => new ISODate('2023-01-01T12:30:45Z')).not.toThrow();

      // Formato con offset
      expect(() => new ISODate('2023-01-01T12:30:45+01:00')).not.toThrow();
    });
  });

  // Prueba del método fromTimestamp
  describe('fromTimestamp', () => {
    it('debería crear una instancia desde un timestamp válido', () => {
      const timestamp = 1672531200000; // 2023-01-01T00:00:00.000Z
      const isoDate = ISODate.fromTimestamp(timestamp);
      expect(isoDate).toBeInstanceOf(ISODate);
      expect(isoDate.toTimestamp()).toBe(timestamp);
    });

    it('debería manejar timestamp cero correctamente', () => {
      const timestamp = 0; // 1970-01-01T00:00:00.000Z (Epoch)
      const isoDate = ISODate.fromTimestamp(timestamp);
      expect(isoDate).toBeInstanceOf(ISODate);
      expect(isoDate.value).toBe(new Date(0).toISOString());
    });

    it('debería manejar timestamps negativos correctamente', () => {
      const timestamp = -1672531200000; // Fecha antes de Epoch
      const isoDate = ISODate.fromTimestamp(timestamp);
      expect(isoDate).toBeInstanceOf(ISODate);
      expect(isoDate.toTimestamp()).toBe(timestamp);
    });
  });

  // Prueba del método toTimestamp
  describe('toTimestamp', () => {
    it('debería convertir correctamente a timestamp', () => {
      const validDate = '2023-01-01T00:00:00.000Z';
      const isoDate = new ISODate(validDate);
      const expectedTimestamp = new Date(validDate).getTime();
      expect(isoDate.toTimestamp()).toBe(expectedTimestamp);
    });

    it('debería manejar diferentes zonas horarias correctamente', () => {
      // Fecha con offset
      const dateWithOffset = '2023-01-01T02:00:00+02:00'; // Equivalente a 00:00:00Z
      const isoDate = new ISODate(dateWithOffset);
      const expectedTimestamp = new Date(dateWithOffset).getTime();
      expect(isoDate.toTimestamp()).toBe(expectedTimestamp);
    });
  });

  // Prueba del método estático validate
  describe('validate', () => {
    it('debería validar una fecha ISO válida sin crear una instancia', () => {
      const validDate = '2023-01-01T00:00:00.000Z';
      const result = ISODate.validate(validDate);
      expect(result).toBe(validDate);
    });

    it('debería lanzar un error al validar una fecha inválida', () => {
      const invalidDate = 'fecha-invalida';
      expect(() => ISODate.validate(invalidDate)).toThrow();
    });

    it('debería lanzar un error al validar un valor no string', () => {
      // Número
      expect(() => ISODate.validate(12345)).toThrow();

      // Null
      expect(() => ISODate.validate(null)).toThrow();

      // Undefined
      expect(() => ISODate.validate(undefined)).toThrow();

      // Objeto
      expect(() => ISODate.validate({})).toThrow();
    });
  });

  // Prueba del método estático safeParse
  describe('safeParse', () => {
    it('debería devolver éxito para una fecha ISO válida', () => {
      const validDate = '2023-01-01T00:00:00.000Z';
      const result = ISODate.safeParse(validDate);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(validDate);
      }
    });

    it('debería devolver error para una fecha inválida', () => {
      const invalidDate = 'fecha-invalida';
      const result = ISODate.safeParse(invalidDate);
      expect(result.success).toBe(false);
    });

    it('debería devolver error para valores no string', () => {
      expect(ISODate.safeParse(12345).success).toBe(false);
      expect(ISODate.safeParse(null).success).toBe(false);
      expect(ISODate.safeParse(undefined).success).toBe(false);
      expect(ISODate.safeParse({}).success).toBe(false);
    });
  });

  // Prueba del esquema ISODateSchema directamente
  describe('ISODateSchema', () => {
    it('debería validar una fecha ISO correctamente', () => {
      const validDate = '2023-01-01T00:00:00.000Z';
      const result = ISODateSchema.safeParse(validDate);
      expect(result.success).toBe(true);
    });

    it('debería rechazar una fecha inválida', () => {
      const invalidDate = 'fecha-invalida';
      const result = ISODateSchema.safeParse(invalidDate);
      expect(result.success).toBe(false);
    });
  });
});
