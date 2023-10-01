import { logger } from '../utils/logger.js';
import ServiceProducts from '../services/products.service.js';
const serviceProducts = new ServiceProducts();

export const isLogged = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'user') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not user' });
};

export const isPremium = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'premium') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not premium' });
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not admin' });
};

export const isNotAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, user is admin' });
};

export const isAdminOrPremium = (req, res, next) => {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'premium')) {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied' });
};

export const isCartOwner = (req, res, next) => {
  if (req.session.user && req.session.user.cartID) {
    return next();
  }
  return res.status(403).json({ message: 'Cart ID missing' });
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/products');
  }
  return next();
};
export const checkProductPermissions = async (req, res, next) => {
  try {
    const user = req.session.user;
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: 'error',
        msg: 'Product ID is missing in the request parameters',
      });
    }
    const product = await serviceProducts.getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        msg: 'Product not found',
      });
    }
    if (user.role === 'admin') {
      return next();
    } else if (user.role === 'premium') {
      if (product.owner === user.email) {
        return next();
      } else {
        return res.status(403).json({
          status: 'error',
          msg: 'Permission denied',
        });
      }
    } else {
      return res.status(403).json({
        status: 'error',
        msg: 'Permission denied',
      });
    }
  } catch (error) {
    logger.error('Error in checkProductPermissions middleware:', error);
    return res.status(500).json({
      status: 'error',
      msg: 'Internal server error with middleware',
    });
  }
};
export const checkCartPermissions = async (req, res, next) => {
  try {
    const user = req.session.user;
    const productId = req.params.id;
    const product = await serviceProducts.getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        msg: 'Product not found',
      });
    }
    if (user.role === 'premium' && product.owner === user.email) {
      return res.status(403).json({
        status: 'error',
        msg: 'Premium users cannot add their own products to the cart',
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: 'Internal server error with middleware',
    });
  }
};
export function checkRequiredDocuments(req, res, next) {
  const user = req.user;
  if (req.body.role === 'premium') {
    if (
      user.documents &&
      user.documents.some((document) => document.documentType === 'identificación') &&
      user.documents.some((document) => document.documentType === 'comprobanteDomicilio') &&
      user.documents.some((document) => document.documentType === 'comprobanteEstadoCuenta')
    ) {
      next();
    } else {
      return res.status(403).json({ message: 'El usuario no ha terminado de procesar su documentación.' });
    }
  } else {
    next();
  }
}
