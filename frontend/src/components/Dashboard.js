import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFileAlt, FaUsers, FaMoneyBillWave, FaClipboardCheck, 
  FaShieldAlt, FaSearch, FaCalendarAlt 
} from 'react-icons/fa';
import API from '../api';

const Dashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [stats, setStats] = useState({
    awaitingUnderwriting: 0,
    policiesIssued: 0,
    premiumCollected: 0,
    activeAgents: 24 // static for demo, could be dynamic
  });

  // Current date/time
  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  useEffect(() => {
    fetchProposalsAndStats();
  }, []);

  const fetchProposalsAndStats = async () => {
    try {
      const res = await API.get('/proposals/all');
      const allProposals = res.data;
      setProposals(allProposals.slice(0, 5)); // show latest 5 in table

      // Count proposals by status
      const awaiting = allProposals.filter(p => p.status === 'PROPOSAL_CREATED').length;
      const issued = allProposals.filter(p => p.status === 'POLICY_ISSUED').length;
      
      // Calculate total premium collected (sum of totalPremium for PAYMENT_COMPLETED, QUALITY_PASSED, POLICY_ISSUED)
      const paidProposals = allProposals.filter(p => 
        ['PAYMENT_COMPLETED', 'QUALITY_PASSED', 'POLICY_ISSUED'].includes(p.status)
      );
      const totalPremiumCollected = paidProposals.reduce((sum, p) => sum + p.totalPremium, 0);

      setStats({
        awaitingUnderwriting: awaiting,
        policiesIssued: issued,
        premiumCollected: totalPremiumCollected,
        activeAgents: 24 // keep static or fetch from another API
      });
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const menuItems = [
    {
      title: 'NEW BUSINESS',
      icon: <FaFileAlt size={32} />,
      description: 'Create new insurance proposals',
      path: '/create-proposal',
      color: 'primary'
    },
    {
      title: 'AGENCY',
      icon: <FaUsers size={32} />,
      description: 'Underwriting & risk assessment',
      path: '/underwriting',
      color: 'success'
    },
    {
      title: 'FINANCE',
      icon: <FaMoneyBillWave size={32} />,
      description: 'Premium payments & receipts',
      path: '/payments',
      color: 'info'
    },
    {
      title: 'CLAIMS',
      icon: <FaClipboardCheck size={32} />,
      description: 'Quality check & verification',
      path: '/qualitycheck',
      color: 'warning'
    },
    {
      title: 'POLICY ISSUE',
      icon: <FaShieldAlt size={32} />,
      description: 'Generate policy documents',
      path: '/issue-policy',
      color: 'danger'
    },
    {
      title: 'SECURITY',
      icon: <FaShieldAlt size={32} />,
      description: 'Access control & audit logs',
      path: '/proposals',
      color: 'secondary'
    }
  ];

  return (
    <div className="container-fluid px-4">
      {/* Top Bar */}
      <div className="row mt-3 mb-4 align-items-center">
        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Main Dashboard</li>
            </ol>
          </nav>
        </div>
        <div className="col-md-6 d-flex justify-content-end gap-3">
          <div className="input-group w-auto">
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <div className="text-muted">
            <FaCalendarAlt className="me-2" />
            {currentDate}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Proposals</h5>
              <p className="card-text display-6">{stats.awaitingUnderwriting}</p>
              <small>Awaiting underwriting</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Policies Issued</h5>
              <p className="card-text display-6">{stats.policiesIssued}</p>
              <small>Total issued</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Premium Collected</h5>
              <p className="card-text display-6">₹{(stats.premiumCollected / 1000).toFixed(1)}L</p>
              <small>Total</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Active Agents</h5>
              <p className="card-text display-6">{stats.activeAgents}</p>
              <small>+3 this week</small>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="row g-4">
        {menuItems.map((item, idx) => (
          <div className="col-md-4 col-lg-3" key={idx}>
            <Link to={item.path} className="text-decoration-none">
              <div className={`card h-100 border-${item.color} shadow-sm hover-shadow`}>
                <div className="card-body text-center">
                  <div className={`text-${item.color} mb-3`}>{item.icon}</div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted small">{item.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0 text-center">
                  <span className={`badge bg-${item.color}`}>Click to access →</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Proposals Table */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <strong>Recent Proposals</strong>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Proposal ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No proposals yet. Use NEW BUSINESS to create one.
                      </td>
                    </tr>
                  ) : (
                    proposals.map(proposal => (
                      <tr key={proposal.id}>
                        <td>{proposal.id}</td>
                        <td>{proposal.customerName}</td>
                        <td>
                          <span className={`badge bg-${
                            proposal.status === 'POLICY_ISSUED' ? 'success' :
                            proposal.status === 'PROPOSAL_CREATED' ? 'primary' :
                            proposal.status === 'UNDERWRITING_COMPLETED' ? 'info' :
                            proposal.status === 'PAYMENT_COMPLETED' ? 'warning' :
                            'secondary'
                          }`}>
                            {proposal.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>₹{proposal.totalPremium}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .hover-shadow {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
        }
        .card-footer {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;