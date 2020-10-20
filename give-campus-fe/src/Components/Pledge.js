import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const Pledge = () => {
    const [formData, setFormData] = useState({})
    const [donorbased, setDonorBased] = useState(true)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.id]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        
        evt.preventDefault();
        const settings = {
            method: 'POST',
            body: JSON.stringify({ ...formData, date: new Date()}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch("/pledge", settings)
    }


    return (
        <div className="container">
            <h1 className="title">Create Pledge</h1>
            <form className="donation-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Pledge Name</label>
                    <div className="control">
                        <input className="input" type="name" id="name" placeholder="Pledge Name" onChange={handleChange} required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Donor Email</label>
                    <div className="control">
                        <input className="input" type="email" id="donor_email" placeholder="Donor Email" onChange={handleChange} required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Institution</label>
                    <div className="control">
                        <input className="input" type="text" id="institution" placeholder="Enter Institution" onChange={handleChange} required />
                    </div>
                </div>

                <label className="label">Match Amount </label>
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="number" id="match_amount" placeholder="20.00" min="1.00" max="10000.00" step="0.01" onChange={handleChange} required />
                    </p>
                    <p className="control">
                        <a className="button is-static">
                            dollars
                    </a>
                    </p>
                </div>

                <label className="label">Per </label>
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="number" id="divisor" placeholder="1" min="1.00" max="10000.00" step="1" onChange={handleChange} required />
                    </p>
                    <p className="control">
                        <span className="select" >
                            <select id="donor_based" onChange={handleChange}>
                                <option value={false}>Dollar(s)</option>
                                <option value={true}>Donor(s)</option>
                            </select>
                        </span>
                    </p>
                </div>
                <label className="label">Donation Cap</label>
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="number" id="cap" placeholder="100.00" min="1.00" max="10000.00" step="0.01" onChange={handleChange} required />
                    </p>
                    <p className="control">
                        <a className="button is-static">
                            dollars
                    </a>
                    </p>
                </div>
                <div className="field is-grouped">
                    
                    <div className="control is-expanded">
                        <label className="label">Start Date</label>
                        <input className="input" type="date" id="start_date" onChange={handleChange} required/>
                    </div>
                    <div className="control is-expanded">
                        <label className="label">End Date</label>
                        <input className="input" type="date" id="end_date" onChange={handleChange} required/>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button className="button is-dark" type="submit">Submit </button>
                    </div>
                    <div className="control">
                        <button className="button is-dark" type="reset">Reset </button>
                    </div>
                </div>
            </form >
        </div >
    )
}


export default Pledge