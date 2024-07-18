import React, { useState } from "react";
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';
export const FailureAlert = (props) => {
   const [click, setClick] = useState(true)
   if(click === false){
    setClick(props.open)
   }
    return(
        <div>
         {click=== true?<Alert
        key='Error'
        sx={{ alignItems: 'flex-start' }}
        startDecorator= {<ReportIcon />}
        variant="soft"
        color={props.color}
        endDecorator={
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setClick(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        }
      >
        <div>
          <div>{props.title}</div>
          <Typography level="body-sm" color={props.color}>
         {props.message} 
          </Typography>
        </div>
      </Alert>:null}
      </div>
    )
}