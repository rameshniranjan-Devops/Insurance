import React, { useEffect, useState } from 'react';
import API from '../api';

const UnderwritingList = () => {
    const [proposals, setProposals] = useState([]);
    const [extra, setExtra] = useState({});

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        const res = await API.get('/proposals/status/PROPOSAL_CREATED');
        setProposals(res.data);
    };

    const handleExtraChange = (id, value) => {
        setExtra({ ...extra, [id]: parseFloat(value) || 0 });
    };

    const handleApprove = async (id) => {
        const extraAmount = extra[id] || 0;
        await API.post(`/underwriting/${id}`, { extraPremiumAmount: extraAmount, remarks: 'Risk assessed' });
        fetchProposals();
    };

    return (
        <div>
            <h3>Underwriting Queue</h3>
            <table className="table table-bordered">
                <thead><tr><th>ID</th><th>Name</th><th>Base Premium</th><th>Extra Loading (₹)</th><th>Action</th></tr></thead>
                <tbody>
                    {proposals.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.customerName}</td><td>₹{p.basePremium}</td>
                            <td><input type="number" className="form-control" value={extra[p.id] || 0} onChange={e => handleExtraChange(p.id, e.target.value)} /></td>
                            <td><button className="btn btn-sm btn-success" onClick={() => handleApprove(p.id)}>Submit Underwriting</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnderwritingList;