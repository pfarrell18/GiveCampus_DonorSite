import React, { useState } from "react"
import {Redirect} from "react-router-dom"

const Donation = () => {
    const [formData, setFormData] = useState({})
    const [donated, setDonated] = useState(undefined)

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.id]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const settings = {
            method: 'POST',
            body: JSON.stringify({...formData, ["date"]:new Date()}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch("/donation", settings)
        setDonated(true)
        // const data = fetchResponse.json()
    }

    
    return (
        <div className="container">
            {donated && <Redirect to="/"/>}
            <h1 className="title">Donate</h1>
            <form className="donation-form" onSubmit={handleSubmit}>
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

                <label className="label">Donation Amount </label>
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input className="input" type="number" id="donation_amount" placeholder="20.00" min="1.00" max="10000.00" step="0.01" onChange={handleChange} required />
                    </p>
                    <p className="control">
                        <a className="button is-static">
                            dollars
                    </a>
                    </p>
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


export default Donation