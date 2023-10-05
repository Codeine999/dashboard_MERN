import ReactApexChart from 'react-apexcharts';
import {
    Box,
    useTheme,
    Typography,
    Stack,
  } from "@mui/material";


const PieChart = ({title, value, series, colors}) => {
    const theme = useTheme();
  return (
    
    <Box 
       id='chart'
       flex={1}
       display='flex'
       bgcolor={theme.palette.mode === 'dark' ? '#2C2C2C' : '#FCFCFC'}
       flexDirection='row'
       justifyContent='space-between'
       alignItems='center'
       pl={3.5}
       py={2.5}
       gap={2}
       borderRadius='15px'
       minHeight='110px'
       width='fit-content'>
        <Stack direction="column">
            <Typography fontSize={14} >
                {title}
            </Typography>
            <Typography fontSize={24} 
                fontWeight={700} mt={1}>
                {value}
            </Typography>
        </Stack>

        <ReactApexChart 
            options={{
                chart: { type: 'donut'},
                colors,
                legend: {show: false},
                dataLabels: { enabled: false}
            }}
            series={series}
            type='donut'
            width='120px'
            />
    </Box>
  )
}

export default PieChart
