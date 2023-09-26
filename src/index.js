import {LWT} from "./classes/LWT.js";
import json from "../model.example.json"
import {ReactParser} from "./adapters/React/classes/ReactParser.js";
import "./index.css";
import {ReactBuilder} from "./adapters/React/classes/ReactBuilder.js";
import {getNewStore} from "./store/zustand.store.js";
import {FilterEventEmitter} from "./classes/FilterEventEmitter.js";
import {builderGroups, components, options, plugins} from "./adapters/React/default/index.js";
const eventEmitter = new FilterEventEmitter();
const lwt = new LWT({
    schema: json, store: getNewStore(), options: options,
    builder: ReactBuilder, parser: ReactParser, eventEmitter: eventEmitter
});


lwt.addGroups(builderGroups);
lwt.addComponents(components);
lwt.addPlugins(plugins);
lwt.addBuilder(document.getElementById('builder-components'));
lwt.render();
