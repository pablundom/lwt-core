import {Modal} from "../Modal.js";
import {useStateStore} from "../../hooks/useStateStore.js";
import {useEffect, useState} from "react";
import {EditComponent} from "./EditComponent.js";


/**
 *
 * @returns {JSX.Element}
 * @constructor
 * TODO: All this structure of the Edit component could be highly improved but atm is servicial, not liking how the preview
 * component is updated (through the event emitter of the lwt instance of the edit form)
 */
export const EditComponentContainer = () => {
    const store = useStateStore();
    const {componentEditting, setComponentEditting, lwtInstance} = store;

    const onClose = (e) => {
        setComponentEditting(null);
    }
    useEffect(() => {
    }, []);

    return <Modal open={(componentEditting !== null && componentEditting !== undefined)} handleClose={onClose}>
        <EditComponent onClose={onClose} />
    </Modal>
}