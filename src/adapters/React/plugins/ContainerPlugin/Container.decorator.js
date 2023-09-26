import {cloneElement} from "react";
import {Decorator} from "../../components/Decorator.js";
import {BuilderEmptyContainer} from "../../components/Container/BuilderEmptyContainer.js";
import {BuilderDecorator} from "../../components/BuilderMain/BuilderDecorator.js";
import {Box} from "@mui/material";


export const ContainerDecorator = ({component, mode, options, contains, children, parent, ...props}) => {
    const getBoxStyle = (isOverCurrent) => {
        if (!isOverCurrent) {
            return {p:'5px'}
        }
        return {backgroundColor: '#dfffdf', p: '5px'}
    }
    const renderChildren = (mode, c) => {
        const DecoratorComponent = (mode === 'builder') ? BuilderDecorator : Decorator;
        return c.children?.map((c, k) => {
            return <DecoratorComponent component={component.children[k]} mode={mode}
                                       children={c.children}  {...c.props} key={c.id} />
        })
    }
    const renderContainerBuilder = ({mode, ref, component, isOverCurrent}) => {
        if (component?.children.length === 0) {
            return <div ref={ref}><BuilderEmptyContainer /></div>
        }
        return <Box ref={ref} sx={getBoxStyle(isOverCurrent)}>
            {renderChildren(mode, component)}
        </Box>
    }
    return cloneElement(contains, {renderChildren, renderContainerBuilder, mode, ...props});
}
