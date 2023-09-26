import {createRoot} from "react-dom/client";
import React from "react";
import {Builder} from "../../../classes/Builder.js";
import {Builder as BuilderComponent} from "../components/BuilderMain/Builder.js"
export class ReactBuilder extends Builder {
    build() {
        if (this.element instanceof HTMLElement && !this.root) {
            this.root = createRoot(this.element);
            this.root.render(
               <BuilderComponent store={this.store} schema={this.schema} />
            );
        }
    }

}