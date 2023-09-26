import {useEffect, useState} from "react";
import {getNewStore} from "../../../../store/zustand.store.js";
import {cloneDeep} from "lodash";
import {useStateStore} from "../../hooks/useStateStore.js";
import {LWTRenderComponent} from "../LWTRenderComponent/LWTRenderComponent.js";
import {useLwtInstance} from "../../hooks/useLwtInstance.js";
import {plugins} from "../../default/index.js";


export const EditComponentPreview = ({newSchema, ...props}) => {
    const globalState = useStateStore();
    const {componentEditting} = globalState;
    const [lwtInstance, setLwtInstance] = useState();
    const {newInstance} = useLwtInstance();
    useEffect(() => {
        if (componentEditting?.component) {
            const _store = getNewStore();
            let _schema = newSchema ? cloneDeep(newSchema) : cloneDeep(componentEditting.component);
            const value = cloneDeep(componentEditting.component.props);
            _schema.schema = {
                type: 'container',
                main: true,
                children: [_schema]
            };
            const props = {schema: _schema, store: _store, components: globalState.components, value,
                options: globalState.options, mode: 'full', builderGroup: globalState.builderGroup};
            const instance =    newInstance(props);
            instance.addPlugins(globalState.plugins);
            setLwtInstance(instance)
        }
    }, [componentEditting?.component, newSchema]);


    return <> {!lwtInstance ? null :   <LWTRenderComponent lwtInstance={lwtInstance} />}
    </>
}