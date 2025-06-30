// @jest-environment node
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="jest" />

import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateName,
  validateDate,
  validateValue,
  formatDateForBackend,
} from '../validation';

describe('validateEmail', () => {
  it('should require email', () => {
    expect(validateEmail('')).toBe('Email é obrigatório');
  });
  it('should validate email format', () => {
    expect(validateEmail('invalid-email')).toBe('Email inválido');
    expect(validateEmail('test@example.com')).toBeNull();
  });
});

describe('validateUsername', () => {
  it('should require username', () => {
    expect(validateUsername('')).toBe('Usuário é obrigatório');
  });
  it('should validate min and max length', () => {
    expect(validateUsername('ab')).toBe('Usuário deve ter pelo menos 3 caracteres');
    expect(validateUsername('a'.repeat(51))).toBe('Usuário deve ter no máximo 50 caracteres');
  });
  it('should validate allowed characters', () => {
    expect(validateUsername('user!')).toBe('Usuário deve conter apenas letras, números e underscore');
    expect(validateUsername('user_123')).toBeNull();
  });
});

describe('validatePassword', () => {
  it('should require password', () => {
    expect(validatePassword('')).toBe('Senha é obrigatória');
  });
  it('should validate min and max length', () => {
    expect(validatePassword('12345')).toBe('Senha deve ter pelo menos 6 caracteres');
    expect(validatePassword('a'.repeat(101))).toBe('Senha deve ter no máximo 100 caracteres');
    expect(validatePassword('123456')).toBeNull();
  });
});

describe('validateName', () => {
  it('should require name', () => {
    expect(validateName('')).toBe('Nome é obrigatório');
  });
  it('should validate min and max length', () => {
    expect(validateName('A')).toBe('Nome deve ter pelo menos 2 caracteres');
    expect(validateName('A'.repeat(101))).toBe('Nome deve ter no máximo 100 caracteres');
  });
  it('should validate allowed characters', () => {
    expect(validateName('João1')).toBe('Nome deve conter apenas letras');
    expect(validateName('João da Silva')).toBeNull();
  });
});

describe('validateDate', () => {
  it('should require date', () => {
    expect(validateDate('')).toBe('Data é obrigatória');
  });
  it('should validate format', () => {
    expect(validateDate('2020-01-01')).toBe('Data deve estar no formato DD/MM/AAAA');
    expect(validateDate('01/01')).toBe('Data deve estar no formato DD/MM/AAAA');
  });
  it('should validate numbers', () => {
    expect(validateDate('aa/bb/cccc')).toBe('Data deve conter apenas números');
  });
  it('should validate day, month, year ranges', () => {
    expect(validateDate('32/01/2020')).toBe('Dia deve estar entre 1 e 31');
    expect(validateDate('01/13/2020')).toBe('Mês deve estar entre 1 e 12');
    expect(validateDate('01/01/1800')).toBe('Ano deve estar entre 1900 e o ano atual');
  });
  it('should validate real date', () => {
    expect(validateDate('31/02/2020')).toBe('Data inválida');
  });
  it('should not allow future dates', () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(validateDate(`01/01/${nextYear}`)).toBe('Ano deve estar entre 1900 e o ano atual');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = futureDate.getFullYear();
    expect(validateDate(`${day}/${month}/${year}`)).toBe('Data não pode ser no futuro');
  });
  it('should accept valid date', () => {
    expect(validateDate('01/01/2000')).toBeNull();
  });
});

describe('validateValue', () => {
  it('should require value', () => {
    expect(validateValue('')).toBe('Valor é obrigatório');
  });
  it('should validate number', () => {
    expect(validateValue('abc')).toBe('Valor deve ser um número');
  });
  it('should validate positive and max value', () => {
    expect(validateValue('0')).toBe('Valor deve ser maior que zero');
    expect(validateValue('-1')).toBe('Valor deve ser maior que zero');
    expect(validateValue('1000001')).toBe('Valor deve ser menor que R$ 1.000.000');
    expect(validateValue('100')).toBeNull();
  });
});

describe('formatDateForBackend', () => {
  it('should return empty string for empty input', () => {
    expect(formatDateForBackend('')).toBe('');
  });
  it('should format DD/MM/YYYY to YYYY-MM-DD', () => {
    expect(formatDateForBackend('01/02/2020')).toBe('2020-02-01');
  });
  it('should return input if not in DD/MM/YYYY', () => {
    expect(formatDateForBackend('2020-02-01')).toBe('2020-02-01');
  });
}); 