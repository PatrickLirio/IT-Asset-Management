import { Box } from "@mui/material";
import  Button from '@mui/material/Button';
import Header from "../../components/Header";

import Table from "./Table";
import { useState } from 'react';
import { Stack, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/AddBox';
import AssignIcon from '@mui/icons-material/AssignmentInd';


const Assets = () => {
    
    return (
    
    <Box mb="10px" padding="10px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title = "Assets" subtitle = "Welcome to your dashboard"/>
        </Box> 
        {/* <Box display="flex" justifyContent="center" alignItems="center">
             <h3
               onClick={() => setView("basic")}
               style={{ color: view === "basic" ? "#fff" : "" }}
             >
               Assign Asset
             </h3>
             <h3
               onClick={() => setView("advanced")}
               style={{ color: view === "advanced" ? "#fff" : "" }}
             >
               Advanced
             </h3>
   
      
        </Box>    */}
        {/* {view === "basic" ? <BasicForm /> : <AdvancedForm />} */}
    </Box>
    );
};
const HeaderButtons = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [view, setView] = useState("basic");
    // const [expand, setExpand] = useState(false);
    // const toggleExpand = () => setExpand(prevExpand => !prevExpand);
    
    return (
        <Stack direction="row" spacing={2}>
            <Button 
                variant="contained"
                size="large" 
                sx={{ 
                    backgroundColor: colors.redAccent[500],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%', // Set the width to make buttons uniform
                }}
            > 
                <VisibilityIcon /> 
                Assign Asset
            </Button>
            <Button 
                variant="contained"
                size="large" 
                // onClick={toggleExpand}
                onClick={() => setView("Return Asset")}
                sx={{ 
                    backgroundColor: colors.redAccent[500],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%', // Set the width to make buttons uniform
                }}
            > 
                <AddIcon/> 
                Return Asset 
                
            </Button>
            <Button 
                variant="contained"
                size="large"
                sx={{ 
                    backgroundColor: colors.redAccent[500],
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%', // Set the width to make buttons uniform
                }}
            > 
                <AssignIcon /> 
                Report Asset
            </Button>
        </Stack>
    );
}; 

export default Assets;