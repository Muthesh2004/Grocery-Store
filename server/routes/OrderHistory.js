import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Order History</h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="border-t">
                      <td className="px-4 py-2">{order.address || 'N/A'}</td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Pending'
                            ? 'bg-yellow-400 text-white'
                            : order.status === 'Delivered'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500 py-6">
                      No past orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
