import React, { useEffect, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';

const ViewAsset = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(24, 1fr)"
        gridAutoRows="80px"
        gap="50px"
        marginTop={3}
        justifyContent="center"
      >
        <Box gridColumn="span 6"></Box> {/* Empty box to create space before the first box */}

        {/* First Box - Total Assets */}
        <Box
          key="Total"
          gridColumn="span 6"
          backgroundColor={colors.primary[800]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
          height="150px"
        >
          <h1>{totalAssets}</h1>
          <h2>Total</h2>
        </Box>

        {/* Second Box - Available Assets */}
        <Box
          key="Available"
          gridColumn="span 6"
          backgroundColor={colors.primary[800]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
          height="150px"
        >
          <h1>{availableAssets}</h1>
          <h2>Available</h2>
        </Box>

        <Box gridColumn="span 6"></Box> {/* Empty box to create space after the second box */}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="330px"
        gap="20px"
        marginTop={10}
      >
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[800]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
        >
          {/* <PieChart /> */}
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[800]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="15px"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.15)"
        >
          {/* <BarChart /> */}
        </Box>
      </Box>
    </>
  );
};

export default ViewAsset;
