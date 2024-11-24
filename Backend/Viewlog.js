const { ipcRenderer } = require('electron');
function changeColor(color) {
  function applica(newFirstColor, newSecondColor, newThirdColor, newFourthColor, bodycolor){
    document.documentElement.style.setProperty('--first-color', newFirstColor);
    document.documentElement.style.setProperty('--second-color', newSecondColor);
    document.documentElement.style.setProperty('--third-color', newThirdColor);
    document.documentElement.style.setProperty('--fourth-color', newFourthColor);
    document.documentElement.style.setProperty('--body-color', bodycolor);
  }
  if (color == `light`){
    let newFirstColor = "#f2f2f0";
    let newSecondColor = "#47555e";
    let newThirdColor = "#151719";
    let newFourthColor = "#2c365d";
    let bodycolor = "#e1ebff";
    applica(newFirstColor, newSecondColor, newThirdColor, newFourthColor, bodycolor);
  } else {
    let newFirstColor = "#151719";
    let newSecondColor = "#47555e";
    let newThirdColor = "#7aa5d2";
    let newFourthColor = "#eeeeee";
    let bodycolor = "#1d1e20";
    applica(newFirstColor, newSecondColor, newThirdColor, newFourthColor, bodycolor);
  }
}
function changeMode() {
  let button = document.getElementById('change-mode');
  button.addEventListener('click', function() {
    let sunImage = document.querySelector('.fa-sun');
    button.disabled = true;
    let moonImage = document.querySelector('.fa-moon');
    if (sunImage.classList.contains('hidden')) {
      moonImage.classList.add('falling-animation');
      changeColor(`light`);
      setTimeout(() => {
        moonImage.classList.add('hidden');
        moonImage.classList.remove('falling-animation');
        sunImage.classList.add('appear'); 
        sunImage.classList.remove('hidden');
        setTimeout(() => {
          sunImage.classList.remove('appear');
          button.disabled = false;
        }, 1000);
    }, 2000);
    } else {
      sunImage.classList.add('falling-animation');
      changeColor(`dark`);
      setTimeout(() => {
        sunImage.classList.add('hidden');
        sunImage.classList.remove('falling-animation');
        moonImage.classList.add('appear'); 
        moonImage.classList.remove('hidden');
        setTimeout(() => {
          moonImage.classList.remove('appear');
          button.disabled = false;
        }, 1000);
    }, 2000);
    }
  });
}
function iniTable (alldate){
  let table = document.getElementById('table').getElementsByTagName('tbody')[0];
  table.innerHTML = ``;
  
  for (i = 0; i < alldate.length; i++){
    let row = table.insertRow();

    let statusCell = row.insertCell(0);
    let data = row.insertCell(1);
    let hour = row.insertCell(2);
    let Position = row.insertCell(3);

    let checkStatus = alldate[i][`Status`];

    if (checkStatus){
      statusCell.textContent = `Approved`;
      statusCell.className = `Green`
    } else {
      statusCell.textContent = `Denied`;
      statusCell.className = `Red`
    }
    
    data.textContent = alldate[i][`data`];
    hour.textContent = alldate[i][`hour`];
    Position.textContent = alldate[i][`Position`];

  }
};
window.addEventListener('load', function() {
  const main = document.getElementById('main');
  ipcRenderer.send('request-logs');
  ipcRenderer.on('response-logs', (event, datacr) => {
    let alldate = datacr; 
    iniTable (alldate);
  });
});
// Funzioni finali
changeMode();