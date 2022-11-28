import { getBookById, getBooksByName } from '../controllers/book';
import { Router } from 'express';

const bookRouterPublic = Router();
bookRouterPublic.get('/all/:name?', getBooksByName);
bookRouterPublic.get('/:bookId', getBookById);

export { bookRouterPublic };
