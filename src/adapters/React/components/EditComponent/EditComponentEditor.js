import {useStateStore} from "../../hooks/useStateStore.js";
import {useEffect, useState} from "react";
import {cloneDeep} from "lodash";
import {LWTRenderComponent} from "../LWTRenderComponent/LWTRenderComponent.js";
import {getNewStore} from "../../../../store/zustand.store.js";
import {useLwtInstance} from "../../hooks/useLwtInstance.js";
import {FilterEventEmitter} from "../../../../classes/FilterEventEmitter.js";
import {getEditSchema} from "./editComponent.util.js";

export const EditComponentEditor = ({onEditStoreChange, ...props}) => {
    const globalState = useStateStore();
    const {componentEditting} = globalState;
    const [eventEmitter] = useState(new FilterEventEmitter());
    const state = useState();
    const [lwtInstance, setLwtInstance] = state;
    const {newInstance} = useLwtInstance();
    const modifyPluginsProps = () => {
        let result = cloneDeep(componentEditting.component.props);
        globalState.callPluginHook({props: result, hookName:'onEditSchemaBefore', component: componentEditting.component, state})
        return result;
    }
    useEffect(() => {
        const editSchema = getEditSchema({component: componentEditting?.component, state: globalState})
        if (editSchema) {
            const _store = getNewStore();
            const _schema = cloneDeep(editSchema);
            const props = modifyPluginsProps();
            const newProps = {
                schema: _schema,
                store: _store,
                eventEmitter: eventEmitter,
                components: globalState.components,
                value: props,
                plugins: globalState.plugins,
                options: globalState.options,
                mode: 'full',
                builderGroup: globalState.builderGroup
            };
            setLwtInstance(newInstance(newProps));
        }

    }, [componentEditting?.component]);

    useEffect(() => {
        if (lwtInstance?.eventEmitter) {
            lwtInstance.eventEmitter.listen({
                event: 'schema:value:changed', callback: (a) => {
                    const payload = cloneDeep(a.payload.value);
                    onEditStoreChange && onEditStoreChange(payload);
                }, id: 'previewId'
            })
        }
    }, [lwtInstance]);
    return <>{!lwtInstance ? null :
        <LWTRenderComponent lwtInstance={lwtInstance}/>
    }
    </>
}