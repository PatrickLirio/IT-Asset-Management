import { Box, useTheme, Stack, Button } from "@mui/material";

import { useState } from "react";
import UserTables from "../../components/userTables"; // Corrected import statement
import Form from "../../components/registrationform";
import { tokens } from "../../theme";
// import TanStackTable from "../../components/";

// Admin page component

const Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [view, setView] = useState("User Table");

  return (  
    <Box mb="10px" padding="10px">
      {/* Align buttons in the center */}
      <Box display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          {/* View User Table button */}
          <Button 
            variant="contained"
            size="large"
            
            onClick={() => setView("User Table")} 
            sx={{ 
              backgroundColor: view === "User Table" ? colors.redAccent[700] : colors.redAccent[500],
              width: '200px',
            }}
          > 
            User Table
          </Button>
          {/* Add User button */}
          <Button 
            variant="contained"
            size="large" 
            onClick={() => setView("Form")}
            sx={{ 
              backgroundColor: view === "Form" ? colors.redAccent[700] : colors.redAccent[500],
              width: '200px',// Set the width to make buttons uniform
            }}
          > 
            Add User
          </Button>
        </Stack>
      </Box>
      {/* Render the appropriate component based on the selected view */}
      {view === "User Table" ? <UserTables /> : <Form />} 
    </Box>
  );
}

export default Admin;
