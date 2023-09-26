import {Typography} from "@mui/material";


export const BuilderEmptyContainer = ({ref, content, ...props}) => {

    return <div ref={ref} style={{ padding: '35px', backgroundColor: '#dfffdf'}}>
        <Typography component="span">
            {!content ? 'Arrastra componentes aquí': content}
        </Typography>
    </div>
}