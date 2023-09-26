import {
    Box,
    Button,
    FormControl,
    Icon,
    InputAdornment,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select as MuiSelect,
    TextField, Typography
} from "@mui/material";
import React, {useMemo, useState} from "react";
import JsxParser from "react-jsx-parser";
const containsText = (option, searchText) =>
    option?.key?.toLowerCase()?.indexOf(searchText.toLowerCase()) > -1;
export const Select = ({component, value, label, onChange, ...props}) => {
    const [searchText, setSearchText] = useState("");
    const options = component.props.options ?? [];
    const displayedOptions = useMemo(
        () => options.filter((option) => containsText(option, searchText)),
        [searchText, options]
    );
    return <FormControl {...props}>
        <InputLabel id={`label-${component.id}`}>{label}</InputLabel>
        <MuiSelect
            MenuProps={{ autoFocus: false }}
            labelId={`label-${component.id}`}
            id={`select-${component.id}`}
            value={value}
            onChange={onChange}
            label={label}
            onClose={() => setSearchText("")}
        >
            <ListSubheader>
                <TextField
                    size="small"
                    autoFocus
                    placeholder="Escribe para buscar..."
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>search</Icon>
                            </InputAdornment>
                        )
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                            e.stopPropagation();
                        }
                    }}
                />
            </ListSubheader>
            {displayedOptions.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                    <JsxParser
                        bindings={{option}}
                        components={{ Box, Button, Icon, Typography }}
                        jsx={`${option.template}`}
                    />
                </MenuItem>
            ))}
        </MuiSelect>
    </FormControl>
}