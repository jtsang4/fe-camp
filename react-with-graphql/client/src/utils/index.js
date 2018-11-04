export const calculatePrice = (items) => {
  const totalPrice =  items.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0).toFixed(2);
  return `$${totalPrice}`;
};

// Cart
export const CART_KEY = 'CART';

export const setCart = (value, cartKey = CART_KEY) => {
  if(localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export const getCart = (cartKey = CART_KEY) => {
  if(localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};

// Auth
export const TOKEN_KEY = 'jwt';

export const setToken = (value, tokenKey = TOKEN_KEY) => {
  if(localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
};

export const getToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
};