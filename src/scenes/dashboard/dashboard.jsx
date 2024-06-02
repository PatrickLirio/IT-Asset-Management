import React, { useState } from "react";
import { Box, useTheme, Stack, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/AddBox';
import ViewAsset from "./ViewAsset";
import { tokens } from "../../theme";
import Table from "../../components/AssetTable";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define state to manage the view
  const [view, setView] = useState("View Assets");

  return (
    <Box mb="10px" padding="10px">

      {/* Buttons */}
      <Box display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          {/* View Assets button */}
          <Button 
              variant="contained"
              size="large" 
              startIcon={<AddIcon />} 
              onClick={() => setView("View Assets")}
              sx={{ 
                  backgroundColor: view === "View Assets" ? colors.redAccent[700] : colors.redAccent[500],
                  width: '200px',
              }}
          > 
              View Assets
          </Button>

          {/* Assigned Assets button */}
          <Button 
              variant="contained" 
              size="large"
              onClick={() => setView("Assigned Assets")} 
              sx={{ 
                  backgroundColor: view === "Assigned Assets" ? colors.redAccent[700] : colors.redAccent[500],
                  width: '200px',
              }}
          >
              Assigned Assets
          </Button>
        </Stack>
      </Box>
      
      {/* Display the selected view */}
      <Box mt={2}>
        {view === "View Assets" ? <ViewAsset /> : view === "Assigned Assets" ? <Table /> : null}
      </Box>
      
    </Box>
  );
};

export default Dashboard;
