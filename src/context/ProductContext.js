import React, { createContext, useState } from 'react';
import products from '../data/ProductData'; // Import data produk

// Buat context
export const ProductContext = createContext();

// Buat provider untuk context
export const ProductProvider = ({ children }) => {
    // Jadikan data produk state global
    const [productList, setProductList] = useState(products);

    return (
        <ProductContext.Provider value={{ productList, setProductList }}>
            {children}
        </ProductContext.Provider>
    );
};