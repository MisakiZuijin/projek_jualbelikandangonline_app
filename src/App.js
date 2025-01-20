import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Beranda/UserDashboard.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import EditUserProfile from './pages/Profile/EditUserProfile.js';
import HistoryUser from './pages/History/HistoryUser.js'
import ReceiptUser from './pages/Receipt/ReceiptUser.js';
import ProductDetails from './pages/ProductDetails/ProductDetails.js';
import Cart from './pages/Carts/Cart.js';
import PayNow from './pages/PayNow/PayNow.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import ReceiptAdmin from './pages/Receipt/ReceiptAdmin.js';
import HistoryAdmin from './pages/History/HistoryAdmin.js'
import EditAdminProfile from './pages/Profile/EditAdminProfile.js';
import AddProduct from './pages/AddProduct/AddProduct.js';
import EditProduct from './pages/EditProduct/EditProduct.js'
import { ProfileUserProvider } from './context/ProfileUserContext';
import { ProfileAdminProvider } from './context/ProfileAdminContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { PurchaseHistoryProvider } from './context/PurchaseHistoryContext';

function App() {
  return (
    <PurchaseHistoryProvider>
      <ProductProvider>
        <CartProvider>
          <ProfileUserProvider>
            <ProfileAdminProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Register" element={<Register />}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/edit-profile-user" element={<EditUserProfile />} />
                    <Route path="/edit-profile-admin" element={<EditAdminProfile />} />
                    <Route path="/history-user" element={<HistoryUser />} />
                    <Route path="/history-Admin" element={<HistoryAdmin />} />
                    <Route path="/receipt-User/:id" element={<ReceiptUser />} />
                    <Route path="/receipt-Admin/:id" element={<ReceiptAdmin />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pay-now" element={<PayNow />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                  </Routes>
                </div>
              </Router>
            </ProfileAdminProvider>
          </ProfileUserProvider>
        </CartProvider>
      </ProductProvider>
    </PurchaseHistoryProvider>
  );
}

export default App;