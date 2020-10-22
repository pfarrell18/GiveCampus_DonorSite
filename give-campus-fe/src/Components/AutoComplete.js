
import React,{useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const  InstitutionSelect = ({value, setValue}) => {
    const [institutions, setInstitutions] = useState(["Still fetching institutions"])
    
    useEffect(()=>{
        const fetchInstitutions = async () => {
            const settings = {
                method: 'GET',
                // body: JSON.stringify(),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const fetchResponse = await fetch("/getinstitutions", settings)
            const data = await fetchResponse.json()
            setInstitutions(data)
        }
        fetchInstitutions()
    },[])


  return (
    <Autocomplete
      value={value}
      onChange={(evt, newValue) => {
        setValue(newValue);
      }}
      id="institution-select"
      options={institutions}
      getOptionLabel={(option) =>option.institution}
      renderOption={(option) => (
        <React.Fragment>
          {option.institution}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an Institution"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default InstitutionSelect
