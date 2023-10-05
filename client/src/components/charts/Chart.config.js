// import { ApexOptions } from 'apexcharts';
// import { Theme } from '@mui/system';

// export const TotalRevenueSeries = [
//   {
//     name: 'Last Month',
//     data: [183, 124, 115, 85, 143, 143, 96],
//   },
//   {
//     name: 'Running Month',
//     data: [95, 84, 72, 44, 108, 108, 47],
//   },
// ];

// export const getTotalRevenueOptions = (theme: Theme): ApexOptions => {
//   return {
//     chart: {
//       type: 'bar',
//       toolbar: {
//         show: false,
        
//       },
//     },
//     colors: ['#475BE8', '#CFC8FF'],
//     plotOptions: {
//       bar: {
//         borderRadius: 4,
//         horizontal: false,
//         columnWidth: '55%',
        
//       },
//     },
//     dataLabels: {
//       enabled: false,
      
//     },
//     grid: {
//       show: false,
//     },
//     stroke: {
//       colors: ['transparent'],
//       width: 4,
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//       labels: {
//         style: {
//           colors: theme.palette.text.primary,
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: '$ (thousands)',
//         style: {
//           color: theme.palette.text.primary,
//         },
//       },
//       labels: {
//         style: {
//           colors: theme.palette.text.primary,
//         },
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'right',
//     },
//     tooltip: {
//       theme: theme.palette.mode,
//       y: {
//         formatter(val: number) {
//           return `$ ${val} thousands`;
//         },
//       },
//     },
//   };
// };
