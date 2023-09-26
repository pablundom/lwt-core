import {Box, Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, {useRef, useState} from "react";
import {useDropController} from "../../hooks/useDropController.js";
import {BuilderEmptyContainer} from "../Container/BuilderEmptyContainer.js";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";

export const TabsBuilder = ({component, ...props}) => {
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
        return tabs.map((t, k) => <Tab key={k} onDragEnter={onDragOver(`${k}`)} label={t.label} value={`${k}`}/>)
    }
    const renderTabPanels = () => {
        if (!component.children) {
            return null;
        }
        return component.children.map((c, k) => {
            return <TabPanel value={`${k}`} key={`${k}`} ><LWTReactBuilderTabPanel index={k} key={c.id}  component={component}
                                                               data={c} /></TabPanel>;
        })
    }

    return <Box style={{border: '2px dashed #7597f2', padding: '25px'}}>
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

const LWTReactBuilderTabPanel = ({component, data, ...props}) => {
    const ref = useRef();
    const {drop} = useDropController({ref, index: props.index, component});
    drop(ref);
    const render = () => {
        if (data.length === 0) {
            return <div ref={ref}><BuilderEmptyContainer /></div>
        }
        return data.map((p, k) => {
            return <BuilderDecorator key={`${p.id}_${k}`} component={p}
                                           children={p.children}  {...p.props} />
        })
    }

    return <>
        {render()}
    </>

}