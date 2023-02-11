export const validateEmail = (email: string) => {
  if (email.length === 0) return { error: "Введите e-mail" };
  const test = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (test) return { success: true };

  return { error: "Неверный формат" };
};

export const validatePassword = (password: string) => {
  if (password.length === 0) return { error: "Введите пароль" };
  if (password.length < 6)
    return { error: "Длина пароля должна не меньше 6-ти символов" };

  if (password.match(/[а-яА-ЯЁё]/))
    return { error: "Пароль должен содержать только латинские символы" };

  if (!password.match(/(?=.*[0-9])/))
    return { error: "Пароль должен содержать хотя бы одну цифру" };

  if (!password.match(/(?=.*[A-Z])/))
    return { error: "Пароль должен содержать хотя бы заглавную букву" };

  if (!password.match(/(?=.*[a-z])/))
    return { error: "Пароль должен содержать хотя бы строчную букву" };

  if (!password.match(/(?=.*[!@#$%^&*])/))
    return { error: "Пароль должен содержать хотя бы спецсимвол" };

  return { success: true };
};

export const validateLogin = (password: string) => {
  if (password.length === 0) return { error: "Введите логин" };
  if (password.length < 3)
    return { error: "Длина логина должна не меньше 3-х символов" };

  return { success: true };
};
