import { body, validationResult } from "express-validator";

const validation = {
    validateCreateUser: [
        body("username").isString().isLength({ min: 5 }).notEmpty(),
        body("email").isEmail().notEmpty(),
        body("password").isString().isLength({min: 8}).notEmpty(),
        body("photo").isString(),
        (req, res, next) => {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                return res.status(400).json({
                    errors: error.array()
                })
            }

            next();
        }
    ],
    validateLoginUser: [
        body('username').isString().notEmpty(),
        body('password').isString().notEmpty(),
        (req, res, next) => {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                return res.status(400).json({
                    errors: error.array()
                })
            }

            next();
        }
    ]
}

export default validation;