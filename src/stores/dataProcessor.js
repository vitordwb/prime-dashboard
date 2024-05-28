export function processRelayData(data) {
  return {
    getCycle:                 () => data.map(item => item.cycle),
    getDatetime:              () => data.map(item => item.datetime),

    getTemperaturaCobre:      () => data.map(item => item.temperatura_cobre[1]),
    getTemperaturaInterna:    () => data.map(item => item.temperatura_interna[1]),
    getTemperaturaExterna:    () => data.map(item => item.temperatura_externa[1]),

    getConsumoBaixo:          () => data.map(item => item.corrente_baixo[1].consumo),
    getPotenciaAparenteBaixo: () => data.map(item => item.corrente_baixo[1].potencia_apa),
    getPotenciaAtivaBaixo:    () => data.map(item => item.corrente_baixo[1].potencia_ativ),
    getPotenciaRmsBaixo:      () => data.map(item => item.corrente_baixo[1].potencia_rms),

    getConsumoCima:           () => data.map(item => item.corrente_cima[1].consumo),
    getPotenciaAparenteCima:  () => data.map(item => item.corrente_cima[1].potencia_apa),
    getPotenciaAtivaCima:     () => data.map(item => item.corrente_cima[1].potencia_ativ),
    getPotenciaRmsCima:       () => data.map(item => item.corrente_cima[1].potencia_rms),
  };
}

// const chartData = {
//   "labels": [
//     "01",
//     "02",
//     "03"
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
