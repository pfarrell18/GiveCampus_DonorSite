import React, { useState } from "react"
import { Link } from "react-router-dom"
import FormatDate from "./formatDate"
import InstitutionSelect from "./AutoComplete"

const SchoolPledges = () => {
    const [pledges, setPledges] = useState(undefined)
    const [institutionValue, setInstitutionValue] = useState([{institution:"still fetching data!"}])
    const [institutionInfo, setInstitutionInfo] = useState(undefined)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (institutionValue.length === 0) {
            alert("Please select institution")
            return
        }
        const settings = {
            method: 'POST',
            body: JSON.stringify({ "institution_id": institutionValue.id }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch("/findschoolpledges", settings)
        const data = await fetchResponse.json()
        setPledges(data)

        const fetchInfo= await fetch("/findschoolinfo", settings)
        const Info= await fetchInfo.json()
        setInstitutionInfo(Info)
    }



    return (
        <div>
            <h1 className="title header">Pledges</h1>
            <h1 className="subtitle header">Search by Institution</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <InstitutionSelect value={institutionValue} setValue={setInstitutionValue} />
                        {/* <input className="input" type="text" id="institution" placeholder="Enter Institution Name" onChange={handleChange} required /> */}
                    </div>
                    <div className="control">
                        <button className="button is-dark square" type="submit">Submit </button>
                    </div>
                    {/* <div className="control">
                        <button className="button is-dark" type="reset">Reset </button>
                    </div> */}
                </div>
            </form>
            {pledges && pledges.length===0 && <div className="header">No Pledges for {institutionValue.institution} Exist!</div>}
            <div className="card-container">
                {pledges && pledges.sort((a, b) => { return new Date(b.end_date) - new Date(a.end_date) }).filter((item) => { return !item.expired }).map((pledge, idx) => {
                    return (<div className={`card ${pledge.expired && "expired"}`} key={idx}>
                        {institutionInfo && <img src = {institutionInfo.imgsrc} alt={institutionInfo.institution}/>}
                        <hr></hr>
                        <div className="subtitle">{pledge.name}</div>
                        <div>End Date:
                            <FormatDate date={pledge.end_date} />
                        </div>
                        <hr></hr>
                        <Link to={{ pathname: "/singlepledge", pledge: pledge, institution:institutionInfo }} className="button is-info">See More</Link>
                    </div>)
                })}
            </div>
        </div>
    )
}


export default SchoolPledges