import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import './AddProduct.css';

const TambahProduk = () => {
    const { productList, setProductList } = useContext(ProductContext);
    const [productData, setProductData] = useState({
        id: Date.now(),
        image: '', // Menyimpan gambar sebagai base64
        name: '',
        price: '',
        stock: '',
        description: '',
        rating: 0,
        area: "Karanganyar",
        sold: 0, // Nilai default untuk "Terjual"
    });

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setProductData({ ...productData, image: reader.result }); // Simpan gambar dalam format base64
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            alert('Gambar tidak valid!');
        }
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSave = () => {
        if (!productData.name || !productData.price || !productData.stock || !productData.description || !productData.image) {
            alert('Harap lengkapi semua bidang!');
            return;
        }

        // Tambahkan produk baru
        setProductList([...productList, productData]);
        navigate('/admin');
    };

    return (
        <div className="tambah-produk-container">
            <h2>Tambah Produk</h2>
            <form className="tambah-produk-form">
                <div className="form-group">
                    <label>Foto Produk</label>
                    <input type="file" onChange={handleImageUpload} />
                    {productData.image && <img src={productData.image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <div className="form-group">
                    <label>Nama Produk</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Masukkan nama produk" />
                </div>
                <div className="form-group">
                    <label>Harga Produk</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Masukkan harga produk" />
                </div>
                <div className="form-group">
                    <label>Stok Produk</label>
                    <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="Masukkan stok produk" />
                </div>
                <div className="form-group">
                    <label>Deskripsi Produk</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Masukkan deskripsi produk"></textarea>
                </div>
                <button type="button" onClick={handleSave}>
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default TambahProduk;