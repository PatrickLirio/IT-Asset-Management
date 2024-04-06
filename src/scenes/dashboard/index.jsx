import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import Header from "../../components/Header";
import HeaderButtons from "./HeaderButtons";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Table from "../assets/Table";

const Dashboard = () => {
    return (
        <Box mb="10px" padding="10px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
            
                    <HeaderButtons />
                 
            </Box>
        </Box>
    );
};

export default Dashboard;