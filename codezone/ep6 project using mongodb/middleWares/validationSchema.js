const { body } = require("express-validator");

const validationShema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title should has at least 2 chars"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};

module.exports = validationShema;
