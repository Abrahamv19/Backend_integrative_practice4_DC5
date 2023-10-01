import express from 'express';
import CartController from '../controller/carts.controller.js';
import { ticketsController } from '../controller/ticket.controller.js';
import { isCartOwner, isLogged, isNotAdmin } from '../middleware/auth.js';
const cartController = new CartController();
const cartsRouter = express.Router();

cartsRouter.post('/', cartController.createCart);
cartsRouter.get('/:cid', cartController.getCartById);
cartsRouter.post('/:cid/product/:pid', isCartOwner, isLogged, /* checkCartPermissions, */ isNotAdmin, cartController.addProductToCart);
cartsRouter.put('/:cid', cartController.updateCart);
cartsRouter.delete('/delete/:cid/product/:pid', cartController.deletOneProductFromCart);
cartsRouter.delete('/empty/:cid', cartController.clearCart);
cartsRouter.get('/:cid/purchase', isLogged, isNotAdmin, ticketsController.checkOut);
cartsRouter.post('/:cid/purchase', isLogged, isNotAdmin, ticketsController.addTicket);
cartsRouter.get('/purchase/:cid', isLogged, isNotAdmin, ticketsController.addTicket);

export default cartsRouter;
