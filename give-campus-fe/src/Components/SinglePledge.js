import React, { useEffect, useState } from "react"
import FormatDate from "../Helper Functions/formatDate"

const SinglePledge = (props) => {
    const [donations, setDonations] = useState(undefined)
    const [total, setTotal] = useState(undefined)
    const [donors, setDonors] = useState(undefined)
    const pledge = props.location.pledge


    let totalRaised_dollarBased = (Math.floor(total / pledge.divisor)) * pledge.match_amount
    let totalRaised_donorBased = Math.floor(donors / pledge.divisor) * pledge.match_amount


    useEffect(() => {

        const fetchDonations = async () => {
            const settings = {
                method: 'POST',
                body: JSON.stringify({ "institution": props.location.pledge.institution, "start_date": props.location.pledge.start_date, "end_date": props.location.pledge.end_date }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const fetchResponse = await fetch("/getdonation", settings)
            const data = await fetchResponse.json()
            setDonations(data)
            console.log(data)
            let sum = 0
            for (let item of data) {
                sum = sum + Number(item.amount)
            }
            setTotal(sum)
            setDonors(data.length)
        }
        fetchDonations()
    }, [])
    return (
        <div className="single-pledge">
            <div className="title">{pledge.name}</div>
            <div className="subtitle">{pledge.institution}</div>
            <hr></hr>
            <div className="subtitle">Pledge: {pledge.match_amount} Dollars for every {pledge.divisor} {pledge.donor_based ? "Donor(s)" : "Dollar(s)"} </div>
            <div>Cap: ${pledge.cap}</div>
            <div>Total Donors: {donors}</div>
            {pledge.donor_based && <div>Total Raised:${pledge.cap < totalRaised_donorBased ? pledge.cap : totalRaised_donorBased} </div>}
            {!pledge.donor_based && <div>Total Raised: ${pledge.cap < totalRaised_dollarBased ? pledge.cap : totalRaised_dollarBased}  </div>}
            <div className="progress-bar">
                {pledge.donor_based && <progress class="progress is-large is-link" value={pledge.cap < totalRaised_donorBased ? pledge.cap : totalRaised_donorBased} max={pledge.cap}>30%</progress>}
                {!pledge.donor_based && <progress class="progress is-large is-link" value={pledge.cap < totalRaised_dollarBased ? pledge.cap : totalRaised_dollarBased} max={pledge.cap}>30%</progress>}
            </div>
            <hr></hr>
            <div>Start Date:
                 <FormatDate date={pledge.start_date} />
            </div>
            <div>End Date:
                <FormatDate date={pledge.end_date} />
            </div>


        </div>
    )
}


export default SinglePledge