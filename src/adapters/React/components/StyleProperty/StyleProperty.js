import Grid2 from "@mui/material/Unstable_Grid2";
import {FormControl,
    InputLabel,
    MenuItem, Select,
    TextField
} from "@mui/material";
import React, {useMemo} from "react";
import {Decorator} from "../Decorator.js";
import {cloneDeep} from "lodash";

const units = ['px', 'pt','rem', 'em']

export const StyleProperty = ({component, ...props}) => {
    const getUnitValue = useMemo(() => {
        if (!props.value) {
            return 'px';
        }
        if (typeof props.value === 'number') {
            return 'px';
        }
        let result = props.value;
        units.forEach(p => {
            if (result.indexOf(p) !== -1) {
                result = p;
            }
        });
        return result;
    }, [props.value])
    const onChangeUnit = (e) => {
        if (e.target.value === '') {
            props.onChange('');
            return;
        }
        props.onChange(getInputValue + e.target.value);
    }

    const getInputType = () => {
        return props.type;
    }
    const onChangeValue = (e) => {
        if (!e.target.value || e.target.value === '') {
            props.onChange('');
            return;
        }
        props.onChange(e.target.value + getUnitValue);
    }
    const getInputValue = useMemo(() => {
        if (!props.value) {
            return props.value;
        }
        if (typeof props.value === 'number') {
            return props.value;
        }
        let result = props.value;
        units.forEach(p => {
            result = result.replace(p, '');
        });
        return result;
    }, [props.value]);

    const render = () => {
        switch (props.type) {
            case "number":
                return <>
                    <Grid2 container={true} spacing={2}>
                        <Grid2 xs={10}>
                            <TextField type={getInputType()} label={props.label} fullWidth={true} value={getInputValue} onChange={onChangeValue} onInput={onChangeValue} />
                        </Grid2>
                        <Grid2 xs={2}>
                            <FormControl>
                                <InputLabel id={`label-${component.id}`}>Unidad</InputLabel>
                                <Select
                                    MenuProps={{ autoFocus: false }}
                                    labelId={`label-${component.id}`}
                                    id={`select-${component.id}`}
                                    value={getUnitValue}
                                    onChange={onChangeUnit}
                                    label="Unidad"
                                >
                                    {units.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                </>
           default:
                const copyComponent = cloneDeep(component);
                copyComponent.type = 'textfield';
                return <><Decorator component={copyComponent}  fullWidth={true}  {...props} /></>
        }
    }

    return render();
}