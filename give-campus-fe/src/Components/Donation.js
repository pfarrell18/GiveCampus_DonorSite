import React, { useState} from "react"
import InstitutionSelect from "./AutoComplete"

const Donation = () => {
    const [donated, setDonated] = useState(undefined)
    const [formData, setFormData] = useState({})
    const [institutionValue, setInstitutionValue] = useState([])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.id]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        if (institutionValue.length === 0) {
            alert("Please select institution")
            return
        }
        evt.preventDefault();
        const settings = {
            method: 'POST',
            body: JSON.stringify({ ...formData, institution_id: institutionValue.id, date: new Date() }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch("/donation", settings)
        const data = await fetchResponse.json()
        setDonated(data)
    }

    return (
        <div className="container">
            {donated && <div className="subtitle header">{`Congrats, You donated to ${institutionValue.institution}!`}</div>}
            {!donated &&
                <React.Fragment><h1 className="title">Donate</h1>
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
                                <InstitutionSelect value={institutionValue} setValue={setInstitutionValue} />
                                {/* <input className="input" type="text" id="institution" placeholder="Enter Institution" onChange={handleChange} required /> */}
                            </div>
                        </div>


                        <label className="label">Donation Amount </label>
                        <div className="field has-addons">
                            <p className="control is-expanded">
                                <input className="input" type="number" id="donation_amount" placeholder="20.00" min="1.00" max="10000.00" step="0.01" onChange={handleChange} required />
                            </p>
                            <div className="control">
                                <p className="button is-static">
                                    dollars
                    </p>
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
                </React.Fragment>}
        </div >
    )
}


export default Donation