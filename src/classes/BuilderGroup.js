
export class BuilderGroup {

    /**
     *
     * @param name
     * @param index
     * @param title
     * @param icon
     */
    constructor({name, index = 0, title, icon}) {
        Object.assign(this, {name, index, icon, title});
    }
}