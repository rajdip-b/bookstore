import { Router } from 'express';
import { createBook, deleteBook, updateBook } from '../controllers/book';

const bookRouterPrivate = Router();
bookRouterPrivate.post('/', createBook);
bookRouterPrivate.put('/', updateBook);
bookRouterPrivate.delete('/:bookId', deleteBook);

export { bookRouterPrivate };
