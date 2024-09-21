const {check}= require('express-validator');
const validatorMiddleware= require('../../middlewares/validatorMiddleware');

// the validation layer of the getCategory route
exports.getCategoryValidator= [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

// the validation layer of createCategory route
exports.createCategoryValidator= [
    check('name')
    .notEmpty().withMessage('Category required')
    .isLength({min:3}).withMessage('Too short category name')
    .isLength({max:32}).withMessage('Too long cagetory name'),
    validatorMiddleware
]

// the validation layer of updateCategory route
exports.updateCategoryValidator= [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]
// the validation layer of deleteCategory route
exports.deleteCategoryValidator= [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]









//notices
//  the difference between "param" and "check" is that param can check only the parameters in the url
//  while "chck" can check all kinds of data (params, body, arguments) in the request
