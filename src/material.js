
let chart;
let material;

// Adding funcionality to "Load Material" button
document.getElementById("btnLoadMaterial").addEventListener('click', async () => {
  material = await window.electronAPI.openFile();
  plotMaterial(material)

});

async function plotMaterial(material){
  console.log("Plotting Stress Strain Data");
  let canvas = document.getElementById('materialSN').getContext("2d")
  chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [{
        // label: "Cyclic Stress vs. Strain",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        showLine: true,
        data: material["Cyclic Stress vs. Strain"]
      }]
    },
    options: {
      plugins:{
        title:{
          display: true,
          text: "Cyclic Stress vs. Strain"
        },
        legend: {
          display: false
        }
      },
      scales:{
        x: {
          display: true,
          type: 'linear',
          title: {
            display: true,
            text: "Strain"
          }
        },
        y:{
          display: true,
          title:{
            display: true,
            text: "Cyclic Stress [MPa]"
          }
        }
      }
    }
  });
}
document.getElementById("btnShowSE").addEventListener('click', async () => {
  chart.data.datasets[0].data = material["Cyclic Stress vs. Strain"];
  chart.options.plugins.title.text = "Cyclic Stress vs. Strain"
  chart.options.scales.x.type = 'linear'
  chart.options.scales.x.ticks = {} // Reset values to "linear"
  chart.options.scales.x.title.text = "Strain"
  chart.options.scales.y.title.text = "Cyclic Stress [MPa]"
  chart.update();
});

document.getElementById("btnShowSN").addEventListener('click', async () => {
  chart.data.datasets[0].data = material["Strain Amplitude vs. Cycles"];
  chart.options.plugins.title.text = "Strain Amplitude vs. Cycles"
  chart.options.scales.x.type = 'logarithmic'
  chart.options.scales.x.ticks =  {callback: (val) => (val.toExponential())}
  chart.options.scales.x.title.text = "Cycles"
  chart.options.scales.y.title.text = "Strain Amplitude [MPa]"
  chart.update();
});
