import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './commponents/Beranda/Home.js';
import Login from './commponents/Login/Login.js';
import EditUserProfile from './commponents/Profile/EditUserProfile.js';
import EditAdminProfile from './commponents/Profile/EditAdminProfile.js';
import AdminDashboard from './commponents/Admin/AdminDashboard.js';
import HistoryUser from './commponents/History/HistoryUser.js'
import HistoryAdmin from './commponents/History/HistoryAdmin.js'
import ReceiptUser from './commponents/Receipt/ReceiptUser.js';
import ReceiptAdmin from './commponents/Receipt/ReceiptAdmin.js';
import ProductDetails from './commponents/ProductDetails/ProductDetails.js';
import Cart from './commponents/Carts/Cart.js';
import { ProfileUserProvider } from './context/ProfileUserContext';
import { ProfileAdminProvider } from './context/ProfileAdminContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <ProfileUserProvider>
        <ProfileAdminProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
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
              </Routes>
            </div>
          </Router>
        </ProfileAdminProvider>
      </ProfileUserProvider>
    </CartProvider>
  );
}

export default App;