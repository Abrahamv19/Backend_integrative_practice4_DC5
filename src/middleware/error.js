import EErrors from '../error/enum.js';

export default (err, req, res, next) => {
  switch (err?.code) {
    case EErrors.PRODUCT_ALREADY_EXISTS:
      res.status(400).json({ error: 'Product already exists', cause: err.cause });
      break;
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).json({ error: 'Invalid types', cause: err.cause });
      break;
    case EErrors.INVALID_REQUEST:
      res.status(400).json({ error: 'Invalid request', cause: err.cause });
      break;
    case EErrors.ADD_PRODUCT_ERR:
      res.status(500).json({ error: 'Internal server error EErrors', cause: err.cause });
      break;
    default:
      console.error('Error no manejado:', err);
      res.status(500).json({ error: 'Internal server error EErrors', cause: err.cause });
      break;
  }
};
