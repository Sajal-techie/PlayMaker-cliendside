// PaymentInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentInfo = ({ payments }) => {
    const navigate = useNavigate()
    return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h3>
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Received: ₹{payments.totalReceived.toFixed(2)}</p>
      </div>
      <h4 className="text-lg font-semibold mb-2">Recent Payments</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.recentPayments.map((payment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:underline hover:text-indigo-400" onClick={()=>navigate(`/profile/${payment.pl_id}`)}>{payment.player__username}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:underline hover:text-indigo-400" onClick={()=>navigate(`/academy/trial_details/${payment.tr_id}`)}> {payment.trial__name}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{payment.payment_amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.payment_date).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentInfo;