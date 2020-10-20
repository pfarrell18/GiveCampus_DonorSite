import React, { useState } from "react"

const FormatDate = ({ date }) => {
 
    const formatDate = (date) => {
        console.log(date.split(""))
        let split = date.split("")

        if (split[5] === "0") {
            let date = [split[6], "/", split[8], split[9], `/${split[0]}${split[1]}${split[2]}${split[3]}`]
            return date.join("")
        } else {
            let date = ["1", split[6], "/", split[8], split[9], `/${split[0]}${split[1]}${split[2]}${split[3]}`]
            return date.join("")
        }
    }

    return (<div>
        {formatDate(date)}
    </div>)
}

export default FormatDate