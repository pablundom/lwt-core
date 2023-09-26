import {Checkbox as MuiCheckbox, FormControlLabel, FormGroup} from "@mui/material"


export const Checkbox = ({component, label, onInput, value, onChange, value_on_checked, value_on_non_checked, ...props}) => {
    const isChecked = (value === value_on_checked) ?? false;
    const handleChange = (e) => {
            onChange(isChecked === true ? value_on_non_checked : value_on_checked);
    }
    const checkboxComponent = () =>  <MuiCheckbox checked={isChecked}  onChange={handleChange} {...props}  />;
    return <>{label && label !== '' ? <FormGroup> <FormControlLabel control={checkboxComponent()} label={label} />
    </FormGroup> : checkboxComponent() }

        </>
}