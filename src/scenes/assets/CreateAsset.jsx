import React, { useState } from "react";
import { Box, useTheme, Stack, Button } from "@mui/material";
import ScannerIcon from '@mui/icons-material/QrCodeScanner';
import DownloadIcon from '@mui/icons-material/Download';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { tokens } from "../../theme";
import Scanner from "../../components/Scanner";
import BulkUpload from "../../components/bulkUpload"; // Corrected import statement
import ManualUpload from "../../components/manualUpload";

const CreateAsset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // or 'dark' depending on your theme mode

  // Define state to manage the view
  const [view, setView] = useState("Scan");

  return (
    <Box mb="10px" padding="10px">
      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end"> {/* Align buttons to the right */}
        <Stack direction="row" spacing={2}>
          {/* Scan button */}
          <Button 
            variant="contained"
            size="small" // Reduced button size
            startIcon={<ScannerIcon />} 
            onClick={() => setView("Scan")}
            sx={{ 
              backgroundColor: view === "Scan" ? colors.redAccent[700] : colors.redAccent[500],
              width: '200px',
            }}
          > 
            Scan
          </Button>
          {/* Bulk Upload button */}
          <Button 
            variant="contained"
            size="small" // Reduced button size
            startIcon={<DownloadIcon />} 
            onClick={() => setView("Bulk Upload")} 
            sx={{ 
              backgroundColor: view === "Bulk Upload" ? colors.redAccent[700] : colors.redAccent[500],
              width: '200px',
            }}
          > 
            Bulk Upload
          </Button>
          
          {/* Manual Upload button */}
          <Button 
            variant="contained"
            size="small" // Reduced button size
            startIcon={<PostAddIcon />} 
            onClick={() => setView("Manual Upload")}
            sx={{ 
              backgroundColor: view === "Manual Upload" ? colors.redAccent[700] : colors.redAccent[500],
              width: '200px',
            }}
          > 
            Manual 
          </Button>
        </Stack>
      </Box>
      
      {/* Display the selected view */}
      {view && (
        <Box mt={2}>
          {/* Here you can render the component or view based on the selected value */}
          {view === "Scan" ? <Scanner /> : view === "Bulk Upload" ? <BulkUpload /> : <ManualUpload />}
        </Box>
      )}
    </Box>
  );
};

export default CreateAsset;
