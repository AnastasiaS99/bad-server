import { celebrate, Joi } from 'celebrate'
// Валидация входа пользователя
export const LoginValidation = celebrate({
    body: Joi.object({
        email: Joi.string().email().required(),

        password: Joi.string().required(),
    }),
})
// Валидация регистрации пользователя
export const RegisterValidation = celebrate({
    body: Joi.object({
        email: Joi.string().email().required(),

        password: Joi.string().min(6).required(),

        name: Joi.string().min(2).max(30).required(),
    }),
})
// Валидация обновления информации пользователя
export const UpdateUserValidation = celebrate({
    body: Joi.object({
        name: Joi.string().min(2).max(30),

        email: Joi.string().email(),
    }),
})
// Валидация для обновления продукта
export const UpdateProductValidation = celebrate({
    params: Joi.object({
        productId: Joi.string().hex().length(24).required(),
    }),

    body: Joi.object({
        title: Joi.string().min(2).max(30),

        description: Joi.string().max(1000),

        category: Joi.string(),

        price: Joi.number().min(0).allow(null),

        image: Joi.object({
            fileName: Joi.string().pattern(/^[a-zA-Z0-9._-]+$/),

            originalName: Joi.string(),
        }),
    })
        .min(1)
        .unknown(false),
})