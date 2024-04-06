import * as React from 'react';
import { Button, Stack, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/AddBox';
import AssignIcon from '@mui/icons-material/AssignmentInd';
import ReturnIcon from '@mui/icons-material/AssignmentReturn';
import Table from '../assets/Table'; // Import the table component

const HeaderButtons = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State to track if "Assigned Assets" button is clicked
    const [showTable, setShowTable] = React.useState(false);

    // Function to handle button click and toggle table visibility
    const handleShowTable = () => {
        setShowTable(!showTable);
    };

    return (
        <div>
            {/* Buttons container */}
            <div style={{ marginBottom: showTable ? '20px' : '0' }}>
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
                        <VisibilityIcon /> View Assets
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
                        <AddIcon/> Create Assets
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
                        // Add onClick to trigger handleShowTable
                        onClick={handleShowTable}
                    >
                        <AssignIcon /> Assigned Assets
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
                        <ReturnIcon /> Returned Assets
                    </Button>
                </Stack>
            </div>
            {/* Render the table component if showTable is true */}
            {showTable && (
            // Table container
            <div style={{ display:'inherit', marginTop: '20px' }}>
                <Table />
            </div>
        )}
            
        </div>
       
    );
}; 

export default HeaderButtons;

