//categoryRoutes.js
const express= require('express');
const {getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator}= require('../utils/validators/categoryValidator')

const {
    getCategories,
     createCategory,
      getCategory,
      updateCategory,
      deletCategory
    } = require('../services/categoryService');
const subCategoryRoute= require('./subCategoryRoute');

const router= express.Router(); 

router.use('/:categoryId/subcategories', subCategoryRoute); // subcategories of a specific category
// http://localhost:8000/api/v1/categories/66e1351096a827871476a6f6/subcategories
router.route('/')               
    .get(getCategories)
    .post(createCategoryValidator, createCategory)
router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deletCategory)
module.exports= router;