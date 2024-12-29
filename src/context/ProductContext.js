import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productList, setProductList] = useState([]); // State untuk menyimpan produk
    const [loading, setLoading] = useState(true); // Untuk status loading
    const [error, setError] = useState(null); // Untuk status error

    // Fungsi untuk mengambil data produk dari backend
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/products/all');
            if (!response.ok) {
                throw new Error('Gagal mengambil data produk');
            }
            const data = await response.json();
            setProductList(data); // Simpan data ke state
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Panggil fetch saat komponen dimuat
    }, []);

    return (
        <ProductContext.Provider value={{ productList, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
