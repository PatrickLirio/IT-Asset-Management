import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';

const ViewAsset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [totalAssets, setTotalAssets] = useState(0);
  const [availableAssets, setAvailableAssets] = useState(0);

  useEffect(() => {
    const fetchTotalAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/Tasset');
        setTotalAssets(response.data.total);
      } catch (error) {
        console.error('Error fetching total assets:', error);
      }
    };

    const fetchAvailableAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/total-operational-assets');
        setAvailableAssets(response.data.availableAssets);
      } catch (error) {
        console.error('Error fetching available assets:', error);
      }
    };

    fetchTotalAssets();
    fetchAvailableAssets();
  }, []);

  return (
    <Box m="20px">
      <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            backgroundColor={colors.primary[800]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
            height="150px"
            textAlign="center"
          >
            <Typography variant="h1">{totalAssets}</Typography>
            <Typography variant="h2">Total</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            backgroundColor={colors.primary[800]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
            height="150px"
            textAlign="center"
          >
            <Typography variant="h1">{availableAssets}</Typography>
            <Typography variant="h2">Available</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" mt={5}>
        <Grid item xs={12} md={6}>
          <Box
            backgroundColor={colors.primary[800]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
            height={isSmallScreen ? '200px' : '330px'}
          >
            {/* <PieChart /> */}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            backgroundColor={colors.primary[800]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
            boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
            height={isSmallScreen ? '200px' : '330px'}
          >
            {/* <BarChart /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewAsset;
