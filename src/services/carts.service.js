import CartsDAO from '../DAO/classes/carts.dao.js';
import CartModel from '../DAO/models/carts.model.js';
import ProductModel from '../DAO/models/products.model.js';
import ServiceProducts from './products.service.js';

const serviceProducts = new ServiceProducts();
const cartsDAO = new CartsDAO();

class ServiceCarts {
  async createOneCartService() {
    const cartCreated = await cartsDAO.createCart({});
    return { status: 200, result: { status: 'success', payload: cartCreated } };
  }

  async getCartService(cartId) {
    const cart = await cartsDAO.getCartDao(cartId);
    if (!cart) {
      throw new Error(`Error finding cart. ${err}`);
    }
    return cart;
  }

  async addProductToCartService(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      const product = await ProductModel.findById(productId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      if (!product) {
        throw new Error('Product not found');
      }
      const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error adding product to cart. ${err}`);
    }
  }

  async updateCartService(cid, cartUpdate) {
    try {
      const updatedCart = await cartsDAO.updateCartDao({ _id: cid }, { products: cartUpdate });
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to find cart. ${err}`);
    }
  }
  async updateProductQuantityService(cartId, productId, quantity) {
    try {
      const cart = await cartsDAO.getCartDao(cartId);
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error updating product quantity in cart');
    }
  }
  async deleteProductFromCartService(cartId, productId, quantityP) {
    try {
      const productToCart = await serviceProducts.getProductByIdService(productId);
      productToCart
        ? productToCart
        : (() => {
            new Error('The product does not exist in the database, please check.');
          })();
      const cart = await CartModel.findById(cartId);
      cart
        ? cart
        : (() => {
            throw Error(`No cart with ID ${cartId} was found.`);
          })();
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      productIndex === -1 ? '' : cart.products[productIndex].quantity--;
      quantityP || cart.products[productIndex].quantity == 0 ? (cart.products[productIndex].product == productId ? cart.products.splice(productIndex, 1) : '') : '';
      const updatedCart = await cartsDAO.deleteProductFromCartDao({ _id: cartId }, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error deleting product from cart. ${err}`);
    }
  }
  async clearCartService(cid) {
    try {
      const emptyCart = await cartsDAO.emptyCartDao({ _id: cid });
      return emptyCart;
    } catch (error) {
      throw new Error(`Failed to find cart. ${err}`);
    }
  }
}
export default ServiceCarts;
