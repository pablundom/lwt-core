import {Box, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, {useRef, useState} from "react";
import {Decorator} from "../Decorator.js";

export const Tabs = ({component, mode, ...props}) => {
    const {tabs} = component.props;
    const [value, setValue] = useState("0");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onDragOver =(value) => {
        return (e) => {
            setValue(value);
        }
    }
    const renderTabLabels = () => {
        return tabs.map((t, k) => <Tab onDragEnter={onDragOver(`${k}`)} label={t.label} value={`${k}`} key={`${k}`}  />)
    }
    const renderTabPanels = () => {
        if (!component.children) {
            return null;
        }
        return component.children.map((c, k) => {
            return <TabPanel value={`${k}`} key={`${k}`} ><LWTReactTabPanel mode={mode} index={k} component={component}
                                                                                  data={c} /></TabPanel>;
        })
    }

    return <Box style={{border: '1px solid #CCC',}}>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    {renderTabLabels()}
                </TabList>
            </Box>
            {renderTabPanels()}
        </TabContext>
    </Box>
}

const LWTReactTabPanel = ({component, data, mode, ...props}) => {
    const render = () => {
        return data.map((p, k) => {
            return <Decorator  mode={mode} component={p}
                              children={p.children}  {...p.props} key={`${p.id}_${k}`} />
        })
    }

    return <>
        {render()}
    </>

}