import {Decorator} from "../Decorator.js";
import {StoreContext} from "../../context/StoreContext.js";
import {Builder} from "../../../../classes/Builder.js";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";



export const LWTRenderComponent = ({lwtInstance}) => {
    const Container = lwtInstance?.mode === 'full' ? Decorator : BuilderDecorator;
    return <>
        {lwtInstance ? <StoreContext.Provider value={lwtInstance.store}>
            {lwtInstance?.schema ?
                <Container component={lwtInstance.schema} children={lwtInstance.schema.children}/> : null}
        </StoreContext.Provider> : null}
    </>
}