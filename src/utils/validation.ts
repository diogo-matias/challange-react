export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email é obrigatório';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email inválido';
  }
  
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Usuário é obrigatório';
  
  if (username.length < 3) {
    return 'Usuário deve ter pelo menos 3 caracteres';
  }
  
  if (username.length > 50) {
    return 'Usuário deve ter no máximo 50 caracteres';
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return 'Usuário deve conter apenas letras, números e underscore';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Senha é obrigatória';
  
  if (password.length < 6) {
    return 'Senha deve ter pelo menos 6 caracteres';
  }
  
  if (password.length > 100) {
    return 'Senha deve ter no máximo 100 caracteres';
  }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Nome é obrigatório';
  
  if (name.length < 2) {
    return 'Nome deve ter pelo menos 2 caracteres';
  }
  
  if (name.length > 100) {
    return 'Nome deve ter no máximo 100 caracteres';
  }
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!nameRegex.test(name)) {
    return 'Nome deve conter apenas letras';
  }
  
  return null;
};

export const validateDate = (date: string): string | null => {
  if (!date) return 'Data é obrigatória';
  
  if (!date.includes('/')) {
    return 'Data deve estar no formato DD/MM/AAAA';
  }
  
  const [day, month, year] = date.split('/');
  
  if (!day || !month || !year) {
    return 'Data deve estar no formato DD/MM/AAAA';
  }
  
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
    return 'Data deve conter apenas números';
  }
  
  if (dayNum < 1 || dayNum > 31) {
    return 'Dia deve estar entre 1 e 31';
  }
  
  if (monthNum < 1 || monthNum > 12) {
    return 'Mês deve estar entre 1 e 12';
  }
  
  if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
    return 'Ano deve estar entre 1900 e o ano atual';
  }
  
  const dateObj = new Date(yearNum, monthNum - 1, dayNum);
  if (dateObj.getDate() !== dayNum || dateObj.getMonth() !== monthNum - 1 || dateObj.getFullYear() !== yearNum) {
    return 'Data inválida';
  }
  
  if (dateObj > new Date()) {
    return 'Data não pode ser no futuro';
  }
  
  return null;
};

export const validateValue = (value: string): string | null => {
  if (!value) return 'Valor é obrigatório';
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return 'Valor deve ser um número';
  }
  
  if (numValue <= 0) {
    return 'Valor deve ser maior que zero';
  }
  
  if (numValue > 1000000) {
    return 'Valor deve ser menor que R$ 1.000.000';
  }
  
  return null;
};

export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  
  if (dateString.includes('/')) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  return dateString;
}; 