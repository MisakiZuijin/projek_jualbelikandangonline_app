import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ButtonBack';
import './AddProduct.css';

const TambahProduk = () => {
    const [productData, setProductData] = useState({
        image: '', // Menyimpan gambar sebagai base64
        name: '',
        price: '',
        stock: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
    
        if (!file) {
            alert('File tidak valid!');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file); // Nama field harus 'image'
    
        try {
            const response = await fetch('http://localhost:4000/api/products/upload', {
                method: 'POST',
                body: formData,
            });
        
            console.log('Response status:', response.status); // Log status respons
            if (!response.ok) {
                const errorText = await response.text(); // Ambil pesan error
                console.error('Backend Error:', errorText);
                throw new Error('Gagal mengunggah file');
            }
        
            const data = await response.json();
            console.log('File uploaded successfully:', data); // Log respons sukses
            setProductData({ ...productData, image: data.filename });
        } catch (error) {
            console.error('Upload error:', error);
        }        
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSave = async () => {
        // Validasi input form
        if (!productData.name || !productData.price || !productData.stock || !productData.description || !productData.image) {
            alert('Harap lengkapi semua bidang!');
            return;
        }
    
        try {
            // Kirim data ke backend
            const response = await fetch('http://localhost:4000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menambahkan produk');
            }
    
            alert('Produk berhasil ditambahkan!');
            navigate('/admin'); // Kembali ke halaman admin setelah berhasil
        } catch (error) {
            alert('Terjadi kesalahan saat menambahkan produk: ' + error.message);
            console.error('Error adding product:', error);
        }
    };    

    return (
        <div className="tambah-produk-container">
            <div className="tambah-produk-content">
                <h2>Tambah Produk</h2>
                <form className="tambah-produk-form">
                    <div className="form-group">
                        <label>Foto Produk</label>
                        {productData.image && (
                           <img 
                           src={productData.image 
                               ? `http://localhost:4000/uploads/${productData.image}` 
                               : 'http://via.placeholder.com/150'} 
                           alt="Preview" 
                           style={{ width: '125px', marginTop: '10px', alignSelf: 'center', borderRadius: '5px' }} 
                            />                       
                        )}
                        <input type="file" onChange={handleImageUpload} />
                    </div>
                    <div className="form-group">
                        <label>Nama Produk</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={productData.name} 
                            onChange={handleChange} 
                            placeholder="Masukkan nama produk" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Harga Produk</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={productData.price} 
                            onChange={handleChange} 
                            placeholder="Masukkan harga produk" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Stok Produk</label>
                        <input 
                            type="number" 
                            name="stock" 
                            value={productData.stock} 
                            onChange={handleChange} 
                            placeholder="Masukkan stok produk" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Deskripsi Produk</label>
                        <textarea 
                            name="description" 
                            value={productData.description} 
                            onChange={handleChange} 
                            placeholder="Masukkan deskripsi produk"
                        ></textarea>
                    </div>
                    <button 
                        className="button-save" 
                        type="button" 
                        onClick={handleSave}
                    >
                        Simpan
                    </button>
                </form>
            </div>
            <BackButton />
        </div>
    );
};

export default TambahProduk;
