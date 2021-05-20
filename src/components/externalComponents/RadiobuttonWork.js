import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
export default function RadioButtonWork(props) {
    const [value, setValue] = React.useState('Office');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <FormControl component="fieldset">
        <FormLabel component="workLocation">Work location</FormLabel>
      <RadioGroup aria-label="workLocation" name="workLocation" value={value} onChange={handleChange}>
        <FormControlLabel value="Office" control={<Radio />} label="Office" />
        <FormControlLabel value="Remote" control={<Radio />} label="Remote" />
      </RadioGroup>
    </FormControl>
    );
  }

  