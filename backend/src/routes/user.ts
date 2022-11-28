import { Router } from 'express';
import { addToCart, getCartItems, getSelf, removeFromCart } from '../controllers/user';

const userRoutes = Router();

userRoutes.get('/', getSelf);
userRoutes.put('/cart/:bookId', addToCart);
userRoutes.delete('/cart/:bookId', removeFromCart);
userRoutes.get('/cart', getCartItems);

export { userRoutes };
