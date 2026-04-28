import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateProposal from './components/CreateProposal';
import UnderwritingList from './components/UnderwritingList';
import PaymentList from './components/PaymentList';
import QCList from './components/QCList';
import PolicyIssueList from './components/PolicyIssueList';
import ProposalList from './components/ProposalList';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create-proposal" element={<CreateProposal />} />
                    <Route path="/proposals" element={<ProposalList />} />
                    <Route path="/underwriting" element={<UnderwritingList />} />
                    <Route path="/payments" element={<PaymentList />} />
                    <Route path="/qualitycheck" element={<QCList />} />
                    <Route path="/issue-policy" element={<PolicyIssueList />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;