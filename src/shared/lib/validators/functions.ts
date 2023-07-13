import { createValidator } from "./utils";

export const validateEmail = createValidator<string>((email) => {
  if (email.length === 0) {
    return "Введите e-mail";
  }

  const test = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (test) {
    return null;
  }

  return "Неверный формат";
});

export const isRequired = createValidator<string>((value) => {
  if (!value) {
    return "Укажите значение";
  }

  return null;
});

export const validateNewPassword = createValidator<string>((password) => {
  if (password.length === 0) return "Введите пароль";
  if (password.length < 6) return "Длина пароля должна не меньше 6-ти символов";

  if (password.match(/[а-яА-ЯЁё]/)) return "Пароль должен содержать только латинские символы";

  if (!password.match(/(?=.*[0-9])/)) return "Пароль должен содержать хотя бы одну цифру";

  if (!password.match(/(?=.*[A-Z])/)) return "Пароль должен содержать хотя бы заглавную букву";

  if (!password.match(/(?=.*[a-z])/)) return "Пароль должен содержать хотя бы строчную букву";

  if (!password.match(/(?=.*[!@#$%^&*])/)) return "Пароль должен содержать хотя бы спецсимвол";

  return null;
});

export const validateLogin = createValidator<string>((login) => {
  if (login.length === 0) return "Введите логин";
  if (login.length < 1) return "Длина логина должна не меньше 1-го символа";

  return null;
});
