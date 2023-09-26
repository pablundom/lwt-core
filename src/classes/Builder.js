import React from "react";
import {LWT} from "./LWT.js";

export class Builder {

    /**
     * @param {object | any }schema
     * @param {object | any }options
     * @param {LWT} LWT
     * @param {object} props
     * @param {LWT} lwtInstance
     * @returns {JSX.Element}
     * @constructor
     */
    constructor({schema, element, options = {}, store, lwtInstance, ...props}) {
        Object.assign(this, {...this, schema, store, options, element, lwtInstance, ...props});
    }


    build() {

    }
}