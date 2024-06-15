import { body } from "express-validator";

const validateFieldsIsEmail = (field, errorMessage) => body(field).isEmail().withMessage(errorMessage);
const validateFieldsNotEmpty = (field, errorMessage) => body(field).notEmpty().trim().withMessage(errorMessage);
const validateFieldsLength = (field, minLength, maxLength, errorMessage) => body(field).isLength({ min: minLength, max: maxLength }).trim().withMessage(errorMessage);

const validateUserLoginFields = Object.values({
  email: validateFieldsIsEmail('email', 'Введите email'),
  password: validateFieldsNotEmpty('password', 'Введите пароль'),
});
  
const validateUserRegistrationFields = Object.values({
  email: validateFieldsIsEmail('email', 'Введите ваш email'),
  name: validateFieldsLength('name', 3, 25, `Введите имя(мин. ${3} символа)`),
  password: validateFieldsLength('password', 3, 25, `Введите пароль(мин. ${3} символа)`),
});

export {
  validateUserLoginFields,
  validateUserRegistrationFields
};