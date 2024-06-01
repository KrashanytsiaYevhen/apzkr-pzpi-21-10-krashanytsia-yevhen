import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/userStore";
import GuitarStore from "./store/guitarStore";
import OrderStore from "./store/orderStore";
import { CartProvider } from './context/CartContext'; // Імпортуємо CartProvider

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        guitar: new GuitarStore(),
        order: new OrderStore()
    }}>
        <CartProvider>
            <App />
        </CartProvider>
    </Context.Provider>,
    document.getElementById('root')
);
