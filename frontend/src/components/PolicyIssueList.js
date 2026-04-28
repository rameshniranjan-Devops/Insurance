import React, { useEffect, useState } from 'react';
import API from '../api';

const PolicyIssueList = () => {
    const [proposals, setProposals] = useState([]);

    const fetchReady = async () => {
        const res = await API.get('/proposals/status/QUALITY_PASSED');
        setProposals(res.data);
    };

    useEffect(() => { fetchReady(); }, []);

    const handleIssue = async (id) => {
        await API.post(`/policy/issue/${id}`);
        fetchReady();
    };

    return (
        <div>
            <h3>Issue Policy</h3>
            <table className="table">
                <thead><tr><th>Proposal ID</th><th>Customer</th><th>Policy Number</th><th>Action</th></tr></thead>
                <tbody>
                    {proposals.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.customerName}</td><td>{p.policyNumber || 'Not issued'}</td>
                            <td><button className="btn btn-warning" onClick={() => handleIssue(p.id)}>Issue Policy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PolicyIssueList;