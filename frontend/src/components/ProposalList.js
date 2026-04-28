import React, { useEffect, useState } from 'react';
import API from '../api';

const ProposalList = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        API.get('/proposals/all').then(res => setProposals(res.data));
    }, []);

    return (
        <div>
            <h3>All Proposals</h3>
            <table className="table table-striped">
                <thead><tr><th>ID</th><th>Name</th><th>Base Premium</th><th>Extra</th><th>Total</th><th>Status</th><th>Policy No</th></tr></thead>
                <tbody>
                    {proposals.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td><td>{p.customerName}</td><td>{p.basePremium}</td><td>{p.extraPremiumAmount}</td>
                            <td>{p.totalPremium}</td><td>{p.status}</td><td>{p.policyNumber || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProposalList;