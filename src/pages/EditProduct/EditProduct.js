import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/ButtonBack';
import './EditProduct.css';

const EditProduct = () => {
    const [productData, setProductData] = useState({
        image: '',
        name: '',
        price: '',
        stock: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
    const [error, setError] = useState(null); // Tambahkan state untuk error
    const { id } = useParams(); // Ambil ID produk dari URL
    const navigate = useNavigate();

    // Fetch product by ID
    useEffect(() => {
        console.log('Fetching product with ID:', id); // Debugging
        const fetchProductById = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data produk');
                }
                const product = await response.json();
                setProductData({
                    image: product.img_product || '',
                    name: product.name_product || '',
                    price: product.price || '',
                    stock: product.stock || '',
                    description: product.desc || '',
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
            }
        };
    
        fetchProductById();
    }, [id]);    

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('File tidak valid!');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:4000/api/products/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Gagal mengunggah file');
            }

            const data = await response.json();
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
        if (!productData.name || !productData.price || !productData.stock || !productData.description || !productData.image) {
            alert('Harap lengkapi semua bidang!');
            return;
        }
    
        // Pemetaan data sesuai dengan format backend
        const payload = {
            img_product: productData.image,
            name_product: productData.name,
            price: productData.price,
            stock: productData.stock,
            desc: productData.description,
        };
    
        console.log('Payload yang dikirim:', payload); // Debug
    
        try {
            const response = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Kirim payload
            });
    
            if (!response.ok) {
                throw new Error('Gagal mengupdate produk');
            }
    
            alert('Produk berhasil diupdate!');
            navigate('/admin'); // Kembali ke halaman admin setelah berhasil
        } catch (error) {
            alert('Terjadi kesalahan saat mengupdate produk: ' + error.message);
            console.error('Error updating product:', error);
        }
    };    

    if (isLoading) {
        return <p>Loading...</p>; // Tampilkan pesan loading
    }

    if (error) {
        return <p>Error: {error}</p>; // Tampilkan pesan error jika ada
    }

    return (
        <div className="tambah-produk-container">
            <div className="tambah-produk-content">
                <h2>Edit Produk</h2>
                <form className="tambah-produk-form">
                    <div className="form-group">
                        <label>Foto Produk</label>
                        {productData.image && (
                            <img
                                src={`http://localhost:4000/uploads/${productData.image}`}
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
                            value={productData.name || ''}
                            onChange={handleChange}
                            placeholder="Masukkan nama produk"
                        />
                    </div>
                    <div className="form-group">
                        <label>Harga Produk</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price || ''}
                            onChange={handleChange}
                            placeholder="Masukkan harga produk"
                        />
                    </div>
                    <div className="form-group">
                        <label>Stok Produk</label>
                        <input
                            type="number"
                            name="stock"
                            value={productData.stock || ''}
                            onChange={handleChange}
                            placeholder="Masukkan stok produk"
                        />
                    </div>
                    <div className="form-group">
                        <label>Deskripsi Produk</label>
                        <textarea
                            name="description"
                            value={productData.description || ''}
                            onChange={handleChange}
                            placeholder="Masukkan deskripsi produk"
                        ></textarea>
                    </div>
                    <button className="button-save" type="button" onClick={handleSave}>
                        Simpan
                    </button>
                </form>
            </div>
            <BackButton />
        </div>
    );
};

export default EditProduct;
