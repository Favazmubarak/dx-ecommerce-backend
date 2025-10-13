import { body, validationResult } from "express-validator";


export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegister = [
  body("username").notEmpty().withMessage("shouldnt be empty"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  body("email").isEmail().withMessage("give correct email"),
  handleValidation,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid username required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
] 