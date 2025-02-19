import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ProfileAdminContext } from '../../context/ProfileAdminContext';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import { PurchaseHistoryContext } from '../../context/PurchaseHistoryContext';
import { CartContext } from '../../context/CartContext';
import BackButton from '../../components/ButtonBack';
import './PayNow.css';

const PayNow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useContext(CartContext);
    const { profile: adminProfile } = useContext(ProfileAdminContext);  // Accessing admin data
    const { profile: userProfile } = useContext(ProfileUserContext);    // Accessing user data
    const { addTransaction } = useContext(PurchaseHistoryContext);

    const [paymentMethod, setPaymentMethod] = useState('');
    const [quantities, setQuantities] = useState({});
    const products = location.state?.products || [];

    const shippingCost = 15000; // Ongkir tetap Rp 15.000

    // Set initial quantities
    if (Object.keys(quantities).length === 0) {
        products.forEach(product => {
            quantities[product.id_product] = product.quantity || 1;
        });
    }

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Number(value) });
    };

    const calculateTotal = () => {
        // Total harga produk
        const productTotal = products.reduce((total, product) => {
            const quantity = quantities[product.id_product] || 1;
            return total + product.price * quantity;
        }, 0);

        // Total harga + Ongkir
        return productTotal + shippingCost;
    };

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width; // Lebar halaman PDF
        const title = 'INVOICE';
        const marginLeft = 10;
        const lineHeight = 10;
        const yStart = 10;

        const textWidth = doc.getTextWidth(title);
        const centerX = (pageWidth - textWidth) / 2;
    
        // Title
        doc.setFontSize(20);
        doc.text(title, centerX, yStart);
        doc.setFontSize(12);
    
        let yPosition = yStart + lineHeight + 5;
    
        // Data Pembeli
        doc.text(`Nama Pembeli: ${userProfile.username}`, marginLeft, yPosition);
        yPosition += lineHeight;
        doc.text(`Alamat Pembeli: ${userProfile.address}`, marginLeft, yPosition);
        yPosition += lineHeight + 5;
    
        // Garis pemisah
        doc.line(marginLeft, yPosition, 200, yPosition); // Horizontal line
        yPosition += 5;
    
        // Data Penjual
        doc.text(`Nama Penjual: ${adminProfile.username}`, marginLeft, yPosition);
        yPosition += lineHeight;
        doc.text(`Rekening Penjual: ${adminProfile.rekening}`, marginLeft, yPosition);
        yPosition += lineHeight + 5;
    
        // Tanggal Pemesanan
        const orderDate = new Date().toLocaleDateString();
        doc.text(`Tanggal Pemesanan: ${orderDate}`, marginLeft, yPosition);
        yPosition += lineHeight;
    
        // Metode Pembayaran
        doc.text(`Metode Pembayaran: ${paymentMethod}`, marginLeft, yPosition);
        yPosition += lineHeight + 5;
    
        // Garis pemisah
        doc.line(marginLeft, yPosition, 200, yPosition); // Horizontal line
        yPosition += 5;
    
        // Daftar Produk
        doc.setFontSize(10);
        const headers = ["Produk", "Quantity", "Harga", "Total"];
        const tableData = products.map(product => {
            const quantity = quantities[product.id_product] || 1;
            const total = product.price * quantity;
            return [product.name, quantity, `Rp ${product.price.toLocaleString('Id-ID')}`, `Rp ${total.toLocaleString('Id-ID')}`];
        });
    
        // Menambahkan Tabel dengan Warna
        doc.autoTable({
            startY: yPosition,
            head: [headers],
            body: tableData,
            margin: { left: marginLeft },
            styles: { 
                fontSize: 10, 
                textColor: [33, 33, 33], // Warna teks (abu-abu tua)
                lineColor: [44, 62, 80], // Warna garis
            },
            headStyles: {
                fillColor: [97, 153, 77], // Warna latar belakang header (biru cerah)
                textColor: [255, 255, 255], // Warna teks header (putih)
                fontStyle: 'bold', // Gaya font pada header
            },
            bodyStyles: {
                fillColor: [250, 250, 250], // Warna latar belakang baris
                textColor: [44, 62, 80], // Warna teks isi
            },
            alternateRowStyles: {
                fillColor: [235, 235, 235], // Warna latar baris alternatif
            },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 40 },
                2: { cellWidth: 40 },
                3: { cellWidth: 50 },
            }
        });
    
        // Biaya Ongkir
        yPosition = doc.lastAutoTable.finalY + 10; // Mendapatkan posisi terakhir tabel
        doc.setFontSize(12);
        doc.text(`Biaya Ongkir: Rp ${shippingCost.toLocaleString('Id-ID')}`, marginLeft, yPosition);
    
        // Total Harga
        yPosition += 10; // Jarak setelah ongkir
        doc.text(`Total Harga: Rp ${calculateTotal().toLocaleString('Id-ID')}`, marginLeft, yPosition);
    
        // Unduh PDF
        doc.save('invoice.pdf');
    };    

    const handlePayment = () => {
        const orderDate = new Date().toLocaleDateString();

        if (!paymentMethod) {
            alert('Pilih metode pembayaran terlebih dahulu!');
            return;
        }

        // Add transaction to history context
        const transaction = {
            id: Date.now(), // Unique ID for transaction
            products: products.map((product) => ({
                id: product.id_product,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: quantities[product.id] || 1,
            })),
            total: calculateTotal(),
            buyer: userProfile.username,
            address: userProfile.address,
            date: orderDate,
            paymentMethod,
            shippingCost,
        };
        addTransaction(transaction);

        // Handle payment
        if (paymentMethod === 'COD') {
            alert('Pesanan Anda telah dikonfirmasi untuk COD!');
        } else if (paymentMethod === 'Transfer') {
            handleDownloadInvoice();
        }

        // window.history.pushState({prevUrl: window.location.href}, null, "/history-user")
        // Navigate to history page after payment
        navigate('/history-user', {state: {prevUrl: window.location.href}});
        clearCart();
    };

    const formatCurrency = (price) => {
        return `Rp ${Number(price).toLocaleString('id-ID')}`;
    };

    return (
        <div className="pay-now-container">
            <div className="pay-now-card">
                <h2 className="pay-now-title">Bayar Sekarang</h2>
                <div className="products-list">
                    {products.map((product) => (
                        <div key={product.id_product} className="product-item">
                            <span>{product.name}</span>
                            <span>Harga: {formatCurrency(product.price)}</span>
                            <input
                                type="number"
                                min="1"
                                value={quantities[product.id_product]}
                                onChange={(e) =>
                                    handleQuantityChange(product.id, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
                <div className="total">
                    <strong>Total Harga Produk: Rp {products.reduce((total, product) => {
                        const quantity = quantities[product.id_product] || 1;
                        return total + product.price * quantity;
                    }, 0).toLocaleString('Id-ID')}</strong>
                </div>
                <div className="shipping-cost">
                    <strong>Biaya Ongkir: Rp {shippingCost.toLocaleString('Id-ID')}</strong>
                </div>
                <div className="total-price">
                    <strong>Total Harga: Rp {calculateTotal().toLocaleString('Id-ID')}</strong>
                </div>
                <div className="payment-method">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            className="payment-radio"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        COD
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Transfer"
                            className="payment-radio"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Transfer
                    </label>
                </div>
                <button onClick={handlePayment} className="pay-now-button">Bayar Sekarang</button>
            </div>
            <BackButton />
        </div>
    );
};

export default PayNow;