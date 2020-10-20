import React, {useState} from "react"
import FormatDate from "../Helper Functions/formatDate"

const SchoolPledges = () => {
    const [formData, setFormData] = useState({})
    const [pledges, setPledges]=useState(undefined)

    const handleChange = (evt) => {
        setFormData(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        
        evt.preventDefault();
        const settings = {
            method: 'POST',
            body: JSON.stringify({"institution": formData}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch("/findschoolpledges", settings)
        const data= await fetchResponse.json()
        setPledges(data)
    }



    return (
        <div>
            <h1 className="title header">Search your Institution</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" id="institution" placeholder="Enter Institution Name" onChange = {handleChange} required/>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-dark" type="submit">Submit </button>
                    </div>
                    <div className="control">
                        <button className="button is-dark" type="reset">Reset </button>
                    </div>
                </div>
            </form>
            <div className="card-container">
            {pledges && pledges.map((pledge, idx)=>{
                return(<div className={`card ${pledge.expired && "expired"}`} key={idx}>
                    <div className="subtitle">{pledge.institution}</div>
                    <div className="subtitle">{pledge.name}</div>
                    <div>Start Date: 
                    <FormatDate date={pledge.start_date}/>
                    </div>
                    <div>End Date: 
                    <FormatDate date={pledge.end_date}/>
                    </div>
                    </div>)
            })}
            </div>
        </div>
    )
}


export default SchoolPledges