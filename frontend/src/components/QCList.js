import React, { useEffect, useState } from 'react';
import API from '../api';

const QCList = () => {
    const [proposals, setProposals] = useState([]);

    const fetchQC = async () => {
        const res = await API.get('/proposals/status/PAYMENT_COMPLETED');
        setProposals(res.data);
    };

    useEffect(() => { fetchQC(); }, []);

    const handleApprove = async (id) => {
        await API.post(`/qualitycheck/${id}`);
        fetchQC();
    };

    return (
        <div>
            <h3>Quality Check</h3>
            <table className="table">
                <thead><tr><th>ID</th><th>Customer</th><th>Sum Assured</th><th>Total Paid</th><th>Action</th></tr></thead>
                <tbody>
                    {proposals.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.customerName}</td><td>{p.sumAssured}</td><td>{p.totalPremium}</td>
                            <td><button className="btn btn-success" onClick={() => handleApprove(p.id)}>Approve QC</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QCList;