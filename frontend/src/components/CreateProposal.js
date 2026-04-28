import React, { useState } from 'react';
import API from '../api';

const CreateProposal = () => {
    const [form, setForm] = useState({
        customerName: '', age: 30, sumAssured: 500000, term: 20,
        occupation: 'Salaried', healthStatus: 'Good', habit: 'Non-smoker',
        productName: 'LifeSecure'
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/proposals', form);
            setMessage(`Proposal created with ID: ${res.data.id}, Status: ${res.data.status}`);
            setForm({ ...form, customerName: '', age: 30 });
        } catch (err) {
            setMessage('Error creating proposal');
        }
    };

    return (
        <div className="card">
            <div className="card-header">Create New Proposal</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Customer Name</label>
                            <input name="customerName" className="form-control" value={form.customerName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Age</label>
                            <input type="number" name="age" className="form-control" value={form.age} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Sum Assured (₹)</label>
                            <input type="number" name="sumAssured" className="form-control" value={form.sumAssured} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Term (years)</label>
                            <input type="number" name="term" className="form-control" value={form.term} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Occupation</label>
                            <select name="occupation" className="form-select" value={form.occupation} onChange={handleChange}>
                                <option>Salaried</option><option>Self-employed</option><option>High Risk</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Health Status</label>
                            <select name="healthStatus" className="form-select" value={form.healthStatus} onChange={handleChange}>
                                <option>Excellent</option><option>Good</option><option>Average</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Habit</label>
                            <select name="habit" className="form-select" value={form.habit} onChange={handleChange}>
                                <option>Non-smoker</option><option>Smoker</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Proposal</button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
};

export default CreateProposal;