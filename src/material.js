// document.getElementById("btnLoadMaterial").addEventListener("click", () => {
//   console.log('Loading material...');
//   const filePath = await window.electronAPI.openFile()
//   filePathElement.innerText = filePath
// })



// Adding funcionality to "Load Material" button
document.getElementById("btnLoadMaterial").addEventListener('click', async () => {
  const material = await window.electronAPI.openFile()
  console.log(material);
});

document.getElementById("btnChart").addEventListener('click', async () => {
  let canvas = document.getElementById('materialSN')
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  let chart = await window.electronAPI.returnChart();
});

// Drawing Plot
