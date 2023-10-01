import express from 'express';
import { productsController } from '../controller/products.controller.js';
import { checkProductPermissions } from '../middleware/auth.js';
import { uploader } from '../middleware/multer.js';
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductsById);
productsRouter.post('/', uploader.single('thumbnail'), productsController.createOneProducts);
productsRouter.put('/:id', checkProductPermissions, checkProductPermissions, productsController.updateOneProducts);
productsRouter.delete('/:id', checkProductPermissions, checkProductPermissions, productsController.deleteOneProducts);
productsRouter.get('/products/search', productsController.searchProducts);

export default productsRouter;
