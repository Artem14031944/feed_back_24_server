import { body } from "express-validator";

const validateFieldsNotEmpty = (field, errorMessage) => body(field).notEmpty().trim().withMessage(errorMessage);

const validateApplicationCreateFields = Object.values({
  message: validateFieldsNotEmpty('message', 'Напишите заявку'),
});

const validateApplicationResolvedFields = Object.values({
  comment: validateFieldsNotEmpty('comment', 'Напишите ответ на заявку'),
});

export {
  validateApplicationCreateFields,
  validateApplicationResolvedFields
};