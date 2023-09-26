import {useStateStore} from "../../hooks/useStateStore.js";
import JsonFormatter from "react-json-formatter";
import {Modal} from "../Modal.js";
import {Box, Button, Icon} from "@mui/material";
import {useRef} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";


export const JsonModal = ({open, onClose, ...props}) => {
    const {jsonViewer:json} = useStateStore();
    const ref = useRef();
    const jsonStyle = {
        propertyStyle: {color: "#871094", fontSize: '1em', fontFamily: 'verdana'},
        stringStyle: {color: "#067D17",  fontSize: '1em', fontFamily: 'verdana'},
        numberStyle: {color: "#0033B3",  fontSize: '1em', fontFamily: 'verdana'},
        booleanStyle:  {color: "#0033B3",  fontSize: '1em', fontFamily: 'verdana'}
    }

    const handleCopyClick = async (e) => {
        const range = document.createRange();
        range.selectNode(ref.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        await navigator.clipboard.writeText(json);
    }

    return  <Modal open={open ?? false} handleClose={onClose}>
        <Box sx={{p: 1, maxHeight: '80vh', overflow: 'auto', backgroundColor: '#f6f6f6'}} ref={ref}>
            <JsonFormatter json={json} tabWith={4} jsonStyle={jsonStyle} />
        </Box>
        <Grid2 columns={30} container sx={{marginTop: '15px'}}>
            <Grid2 xs={28}>
                <Button variant="contained" onClick={handleCopyClick} startIcon={<Icon>content_copy</Icon>}>Copiar</Button>
            </Grid2>
            <Grid2 xs={2}>
                <Button variant="contained" color="error" onClick={onClose} startIcon={<Icon>close</Icon>}>Cerrar</Button>
            </Grid2>
        </Grid2>
    </Modal>
}