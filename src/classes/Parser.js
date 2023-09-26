import React from "react";
import {LWT} from "./LWT.js";

export class Parser {

    /**
     * @param {object | any }schema
     * @param {object | any }options
     * @param {LWT} LWT
     * @param {string} mode
     * @param {object} props
     * @param {LWT} lwtInstance
     * @returns {JSX.Element}
     * @constructor
     */
    constructor({schema, element, options = {}, store, lwtInstance, component, mode, ...props}) {
        Object.assign(this, {...this, schema, store, options, lwtInstance, element, component, mode, ...props});
    }


    parse() {

    }
}