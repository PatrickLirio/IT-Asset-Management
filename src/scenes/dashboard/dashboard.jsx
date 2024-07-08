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

  // Function to handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <Box mb="10px" p="10px">
      {/* Buttons */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained"
            size="large" 
            startIcon={<AddIcon />} 
            onClick={() => handleViewChange("View Assets")}
            sx={{ 
                backgroundColor: view === "View Assets" ? colors.redAccent[700] : colors.redAccent[500],
                width: '200px',
            }}
          >
            View Assets
          </Button>

          <Button 
            variant="contained" 
            size="large"
            onClick={() => handleViewChange("Assigned Assets")}
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
      <Box>
        {view === "View Assets" && <ViewAsset />}
        {view === "Assigned Assets" && <Table />}
      </Box>
    </Box>
  );
};

export default Dashboard;
