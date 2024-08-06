import React, { useEffect, useState } from 'react';
import userApi from '../../../api/axiosconfig';
import AdminNavbar from '../contents/AdminNavbar';
import AdminSidebar from '../contents/AdminSidebar';
import { useSelector } from 'react-redux';

const AdminPayments = () => {
    const [paymentSummary, setPaymentSummary] = useState([]);
    const isSidebarOpen = useSelector(state=>state.admin.isSidebarOpen)

    useEffect(() => {
        fetchPaymentSummary();
    }, []);

    const fetchPaymentSummary = async () => {
        try {
            const response = await userApi.get('payment_details');
            setPaymentSummary(response.data);
        } catch (error) {
            console.error('Error fetching payment summary:', error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
                <div className={`flex-grow p-8 bg-gray-100 font-kanit  ${ isSidebarOpen ? 'ml-64' : ''}`}>
                    <h1 className="text-2xl font-bold mb-4">Admin Payments</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">ID</th>
                                    <th className="py-2 px-4 border">Academy Name</th>
                                    <th className="py-2 px-4 border">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentSummary.length > 0 ? (
                                    paymentSummary.map((academy, index) => (
                                        <tr key={index} className='text-center'>
                                            <td className="py-2 px-4 border">{academy.academy_id}</td>
                                            <td className="py-2 px-4 border">{academy.academy_name}</td>
                                            <td className="py-2 px-4 border">₹{academy.total_amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-2 px-4 border" colSpan="3">
                                            No Payments Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

        </>
    );
};

export default AdminPayments;
