import ReactApexChart from 'react-apexcharts';
import {
    Box,
    useTheme,
    Typography,
    Stack,
  } from "@mui/material";
import { ArrowCircleUpRounded } from '@mui/icons-material';



const Count = () => {
    const theme = useTheme();
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={theme.palette.mode === 'dark' ? '#2C2C2C' : '#FCFCFC'}
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={500}>
        Total
      </Typography>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={23} fontWeight={400}>
          200K 
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475BE8' }} />
          <Stack>
            <Typography fontSize={14} >
              0.8%
            </Typography>
            <Typography fontSize={12} >
              The Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={getTotalRevenueOptions(theme)}
      /> */}
    </Box>
  )
}

export default Count
