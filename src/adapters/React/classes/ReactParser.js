import React from 'react';
import {Parser} from "../../../classes/Parser.js";
import {createRoot} from "react-dom/client";
import {Main} from "../components/Main.js";
import {HTML5Backend} from "react-dnd-html5-backend";
import {StoreContext} from "../context/StoreContext.js";
import {DndProvider} from "react-dnd";

export class ReactParser extends Parser {

    parse() {
        if (this.element instanceof HTMLElement && !this.root) {
            this.root = createRoot(this.element);
            this.root.render(
                <React.Fragment>
                    <StoreContext.Provider value={this.store}>
                        <DndProvider backend={HTML5Backend}>
                    <Main  {...this.schema?.props}  />
                        </DndProvider>
                    </StoreContext.Provider>
                </React.Fragment>
            );
        }
    }

}