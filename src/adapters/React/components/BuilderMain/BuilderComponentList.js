import React, {useState} from "react";
import {Icon, InputAdornment, List, TextField} from "@mui/material";
import "./BuilderMain.css"
import {EditComponent} from "../EditComponent/EditComponent.js";
import {useStateStore} from "../../hooks/useStateStore.js";
import {BuilderGroup} from "./BuilderGroup.js";
import {EditComponentContainer} from "../EditComponent/EditComponentContainer.js";
export const BuilderComponentList = ({...props}) => {
    const {builderGroup} = useStateStore();

    const [searchComponent, setSearchComponent] = useState('')
    const renderGroupList = () => {
        return <List>
            {builderGroup.map(g => <BuilderGroup group={g} filter={searchComponent} key={g.name} />)}
        </List>
    }
    return <>
        <div className="BuilderMainContainer">
            <TextField type="search" placeholder="Buscar componente..." value={searchComponent} label="Buscar Componente"
                       onInput={(e) => setSearchComponent(e.target.value)}
                       fullWidth size="small"   InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon>search</Icon>
                    </InputAdornment>
                ),
            }}  />
            {renderGroupList()}
        </div>
    </>
}