import mongoose from 'mongoose';
import { ICartItem, IUserDocument } from './user.types';

export async function addToCart(this: IUserDocument, bookId: mongoose.Types.ObjectId): Promise<void> {
	const cartBookIndex = this.cart.findIndex((cb: any) => cb.bookId.toString() === bookId.toString());
	let newQuantity = 1;
	const updatedCartItems = [...this.cart] as ICartItem[];
	if (cartBookIndex >= 0) {
		newQuantity = this.cart[cartBookIndex].quantity + 1;
		updatedCartItems[cartBookIndex].quantity = newQuantity;
	} else {
		updatedCartItems.push({ bookId, quantity: newQuantity });
	}
	this.cart = updatedCartItems;
	await this.save();
}

export async function removeFromCart(this: IUserDocument, bookId: mongoose.Types.ObjectId): Promise<number> {
	const cartBookIndex = this.cart.findIndex((cb: any) => cb.bookId.toString() === bookId.toString());
	let quantity = 0;
	if (cartBookIndex < 0) {
		return quantity;
	}
	const updatedCartItems = [...this.cart] as ICartItem[];
	if (updatedCartItems[cartBookIndex].quantity > 1) {
		updatedCartItems[cartBookIndex].quantity -= 1;
		quantity = updatedCartItems[cartBookIndex].quantity;
	} else updatedCartItems.splice(cartBookIndex, 1);
	this.cart = updatedCartItems;
	await this.save();
	return quantity;
}
