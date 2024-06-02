import { Box, Button, Stack } from "@mui/material";
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";
import AddIcon from '@mui/icons-material/AddBox';
import CreateAsset from "./CreateAsset";
import Update from "../../components/updateForm";
import Deletion from "../../components/deleteForm";

const Assets = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Define state to manage the view
    const [view, setView] = useState("Create Asset");

    return (
        <Box mb="10px" padding="10px">
            {/* Buttons */}
            <Box display="flex" justifyContent="center">
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="contained"
                        size="large" 
                        startIcon={<AddIcon />} 
                        onClick={() => setView("Create Asset")}
                        sx={{ 
                            backgroundColor: view === "Create Asset" ? colors.redAccent[700] : colors.redAccent[500],
                            width: '200px',
                        }}
                    > 
                        Create 
                    </Button>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => setView("Update Asset")} 
                        sx={{ 
                            backgroundColor: view === "Update Asset" ? colors.redAccent[700] : colors.redAccent[500],
                            width: '200px',
                        }}
                    >
                        Update 
                    </Button>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => setView("Delete Asset")} 
                        sx={{ 
                            backgroundColor: view === "Delete Asset" ? colors.redAccent[700] : colors.redAccent[500],
                            width: '200px',
                        }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>
            {/* Display the selected view */}
            {view && (
                <Box mt={2}>
                    {view === "Create Asset" ? <CreateAsset /> : view === "Update Asset" ? <Update /> : <Deletion />}
                </Box>
            )}
        </Box>
    );
}; 

export default Assets;
