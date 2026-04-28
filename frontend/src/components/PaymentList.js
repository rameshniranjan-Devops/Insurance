import React, { useEffect, useState } from 'react';
import API from '../api';

const PaymentList = () => {
    const [proposals, setProposals] = useState([]);
    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        API.get('/proposals/status/UNDERWRITING_COMPLETED').then(res => setProposals(res.data));
    }, [receipt]);

    const handlePay = async (id, amount) => {
        try {
            const res = await API.post('/payments/pay', { proposalId: id, amount });
            setReceipt(res.data);
            // Refresh list after payment
            API.get('/proposals/status/UNDERWRITING_COMPLETED').then(res => setProposals(res.data));
        } catch (err) {
            alert('Payment failed: ' + err.response?.data?.message);
        }
    };

    return (
        <div>
            <h3>Pending Payments</h3>
            {receipt && (
                <div className="alert alert-success">
                    Payment successful! Receipt No: {receipt.receiptNumber}, Amount: ₹{receipt.amount}
                </div>
            )}
            <table className="table">
                <thead><tr><th>Proposal ID</th><th>Customer</th><th>Total Premium</th><th>Action</th></tr></thead>
                <tbody>
                    {proposals.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.customerName}</td><td>₹{p.totalPremium}</td>
                            <td><button className="btn btn-primary" onClick={() => handlePay(p.id, p.totalPremium)}>Pay Now</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;