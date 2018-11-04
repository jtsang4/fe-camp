export const calculatePrice = (items) => {
  const totalPrice =  items.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0).toFixed(2);
  return `$${totalPrice}`;
}