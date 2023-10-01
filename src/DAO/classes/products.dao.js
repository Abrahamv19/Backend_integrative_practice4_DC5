import ProductModel from '../models/products.model.js';

class ProductsDAO {
  async getAllProductsDao(filter, options) {
    try {
      const products = await ProductModel.paginate(filter, options);
      return products;
    } catch (err) {
      throw err;
    }
  }
  async getProductByIdDao(productId) {
    const product = ProductModel.findById(productId);
    return product;
  }
  async getProductByCodeDao(code) {
    try {
      const product = await ProductModel.findOne({ code });
      return product;
    } catch (err) {
      throw `No se encontró el producto.`;
    }
  }
  async createOneProductDao(productData) {
    const product = ProductModel.create(productData);
    return product;
  }
  async deleteOneProductDao(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  }

  async updateOneProductDao(productId, updatedData) {
    const product = ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
    return product;
  }
}
export default ProductsDAO;
