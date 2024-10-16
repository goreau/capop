import { helpers, minLength, maxLength, required, minValue, maxValue, between, numeric, sameAs, integer, email, requiredIf, decimal } from '@vuelidate/validators';

export const required$ = helpers.withMessage('Esse campo é obrigatório', required)

export const numeric$ = helpers.withMessage('Apenas caracteres numéricos são aceitos', numeric)

export const integer$ = helpers.withMessage('Apenas números inteiros são permitidos', integer)

export const decimal$ = helpers.withMessage('Informe um número válido', decimal)

export const email$ =  helpers.withMessage('Informe um email válido', email)

export const combo$ = (min) => helpers.withMessage('Escolha um valor para esse campo.', minValue(min))

export const sameAs$ = (field) => helpers.withMessage('Os campos não conferem', sameAs(field))

export const minLength$ = (min) => helpers.withMessage(({ $params}) => `O tamanho mínimo permitido é de ${$params.min} caracteres.`, minLength(min))

export const maxLength$ = (max) => helpers.withMessage(({ $params}) => `O tamanho máximo permitido é de ${$params.max} caracteres.`, maxLength(max))

export const minValue$ = (min) => helpers.withMessage(({ $params}) => `O valor mínimo permitido é ${$params.min}.`, minValue(min))

export const maxValue$ = (max) => helpers.withMessage(({ $params}) => `O valor máximo permitido é ${$params.max}.`, maxValue(max))

export const between$ = (min, max) => helpers.withMessage(({ $params}) => `O valor deve estar entre ${$params.min} e ${$params.max}.`, between(min, max))

export const requiredIf$ = (cond) => helpers.withMessage('Informe o valor desse campo.', requiredIf(cond))