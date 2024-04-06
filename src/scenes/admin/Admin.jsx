import { Box, useTheme, Stack, Button  } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
// import Form from "./form";
import UserTables from "./userTables"; // Corrected import statement
import { tokens } from "../../theme";
import Form from "../../components/basicForm";

const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [view, setView] = useState("User Table");
    return (  
        <Box mb="10px" padding="10px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Admin" subtitle="Welcome to your dashboard" />
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained"
              size="large"
              onClick={() => setView("User Table")} 
              sx={{ 
                backgroundColor: colors.redAccent[500],
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100px', // Set the width to make buttons uniform
              }}
            > 
              User Table
            </Button>
            <Button 
              variant="contained"
              size="large" 
              onClick={() => setView("Form")}
              sx={{ 
                backgroundColor: colors.redAccent[500],
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100px', // Set the width to make buttons uniform
              }}
            > 
              Add user
            </Button>
          </Stack>
        </Box>
        {view === "User Table" ? <UserTables /> : <Form />} 
      </Box>
    );
}
 
export default Admin;
