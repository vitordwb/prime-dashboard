export function processRelayData(data) {
  return {
    getTemperaturaInterna: () => data.map(item => item.temperatura_interna[1]),
    getCycle: () => data.map(item => item.cycle),
    getDatetime: () => data.map(item => item.datetime),
    getCorrenteBaixo: () => data.map(item => item.corrente_baixo[1]),
    getCorrenteCima: () => data.map(item => item.corrente_cima[1]),
    getRpmBaixo: () => data.map(item => item.rpm_baixo[1]),
    getRpmCima: () => data.map(item => item.rpm_cima[1]),
    getTemperaturaCobre: () => data.map(item => item.temperatura_cobre[1]),
    getTemperaturaExterna: () => data.map(item => item.temperatura_externa[1]),
  };
}

// <!--    Bar       -->
// <!--    Doughnut  -->
// <!--    Line      -->
// <!--    Pie       -->
// <!--    PolarArea -->
// <!--    Radar     -->
// <!--    Bubble    -->
// <!--    Scatter   -->

// const chartData = {
//   "labels": [
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09"
//   ],
//   "datasets": [
//     {
//       "fill": false,
//       "borderColor": "#00D1B2",
//       "borderWidth": 2,
//       "borderDash": [],
//       "borderDashOffset": 0,
//       "pointBackgroundColor": "#00D1B2",
//       "pointBorderColor": "rgba(255,255,255,0)",
//       "pointHoverBackgroundColor": "#00D1B2",
//       "pointBorderWidth": 20,
//       "pointHoverRadius": 4,
//       "pointHoverBorderWidth": 15,
//       "pointRadius": 4,
//       "data": [
//         38,
//         92,
//         141,
//         26,
//         74,
//         57,
//         81,
//         119,
//         140
//       ],
//       "tension": 0.5,
//       "cubicInterpolationMode": "default"
//     },
//     {
//       "fill": false,
//       "borderColor": "#209CEE",
//       "borderWidth": 2,
//       "borderDash": [],
//       "borderDashOffset": 0,
//       "pointBackgroundColor": "#209CEE",
//       "pointBorderColor": "rgba(255,255,255,0)",
//       "pointHoverBackgroundColor": "#209CEE",
//       "pointBorderWidth": 20,
//       "pointHoverRadius": 4,
//       "pointHoverBorderWidth": 15,
//       "pointRadius": 4,
//       "data": [
//         18,
//         61,
//         15,
//         56,
//         32,
//         37,
//         93,
//         135,
//         195
//       ],
//       "tension": 0.5,
//       "cubicInterpolationMode": "default"
//     },
//     {
//       "fill": false,
//       "borderColor": "#FF3860",
//       "borderWidth": 2,
//       "borderDash": [],
//       "borderDashOffset": 0,
//       "pointBackgroundColor": "#FF3860",
//       "pointBorderColor": "rgba(255,255,255,0)",
//       "pointHoverBackgroundColor": "#FF3860",
//       "pointBorderWidth": 20,
//       "pointHoverRadius": 4,
//       "pointHoverBorderWidth": 15,
//       "pointRadius": 4,
//       "data": [
//         66,
//         35,
//         35,
//         93,
//         159,
//         73,
//         97,
//         141,
//         106
//       ],
//       "tension": 0.5,
//       "cubicInterpolationMode": "default"
//     }
//   ]
// }
