import {Checkbox as MuiCheckbox, FormControlLabel, FormGroup, Switch as MuiSwitch} from "@mui/material";


export const Switch = ({component, label, onInput, value, onChange, value_on_toggled, value_on_untoggled, ...props}) => {
    const isToggled = (value === value_on_toggled) ?? false;
    const handleChange = (e) => {
        onChange(isToggled === true ? value_on_untoggled : value_on_toggled);
    }
    const switchComponent = () =>  <MuiSwitch checked={isToggled}  onChange={handleChange} {...props}  />;
    return <>{label && label !== '' ? <FormGroup> <FormControlLabel control={switchComponent()} label={label} />
    </FormGroup> : switchComponent() }

    </>
}