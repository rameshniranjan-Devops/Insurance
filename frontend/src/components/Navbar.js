import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Insurance Demo</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
						<li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/create-proposal">New Proposal</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/proposals">Proposals List</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/underwriting">Underwriting</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/payments">Payments</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/qualitycheck">Quality Check</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/issue-policy">Issue Policy</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;