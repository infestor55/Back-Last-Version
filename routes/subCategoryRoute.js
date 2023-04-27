import express from 'express';

import { addSubCategoryController, deleteSubCategoryController, singleSubCategoryController, subCategoriesController, updateSubCategoryController } from '../controllers/subCategoryController.js';
const router = express.Router()
//----------------- CREATE SUB-CATEGORY ROUTE ------------------
router.post('/add-subCategory', addSubCategoryController);

//----------------- UPDATE SUB-CATEGORY ROUTE ------------------
router.put('/update-subcategory/:id', updateSubCategoryController)

//----------------- GET ALL SUB-CATEGORIES ROUTE ------------------
router.get('/subcategories', subCategoriesController)

//----------------- GET SINGLE SUB-CATEGORY ROUTE ------------------
router.get('/single-subcategory/:id', singleSubCategoryController);

//----------------- DELETE SUB-CATEGORY ROUTE ------------------
router.delete('/delete-subcategory/:id', deleteSubCategoryController)


export default router