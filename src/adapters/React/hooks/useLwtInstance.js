import {useState} from "react";
import {ReactParser} from "../classes/ReactParser.js";
import {ReactBuilder} from "../classes/ReactBuilder.js";
import {getNewStore} from "../../../store/zustand.store.js";
import {FilterEventEmitter} from "../../../classes/FilterEventEmitter.js";
import {cloneDeep} from "lodash";
import {LWT} from "../../../classes/LWT.js";


export const useLwtInstance = () => {
    const [lwtInstance, setLwtInstance] = useState();
    const newInstance = ({schema = {}, components = [], store = getNewStore(), value = {},
                             options = {}, plugins = [], mode = 'full', parser = ReactParser, builder = ReactBuilder,
                             eventEmitter = new FilterEventEmitter(), builderGroup = []}) => {
        let _schema = cloneDeep(schema);
        const lwt = new LWT({
            schema: _schema, eventEmitter: eventEmitter,
            store, parser, builder, options, builderGroup, value, components, mode, plugins
        });
        setLwtInstance(lwt);
        lwt.render();

        return lwt;
    }

    return {newInstance};
}