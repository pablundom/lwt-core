import {Box, Modal as ModalMui} from "@mui/material";

const defaultStyle = {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translate(-50%, -5%)',
    minWidth: '90vw',
    maxWidth: '90w',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const Modal = ({open, style, handleClose, children,...props}) =>{
    style = style ?? defaultStyle;
    const onClose = (o, reason) => {
        handleClose && handleClose(o, reason)
    }
    return <ModalMui
        open={!!open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            {children}
        </Box>
    </ModalMui>
}