const { ipcRenderer } = require('electron');
const messageContainer = document.getElementById("message-container");
function displayMessage(message, messageType) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.classList.add(messageType);
  messageContainer.innerHTML = '';
  messageContainer.appendChild(messageElement);
}
function toggleAnimation() {
  let buttonPlus = document.getElementById(`button-plus`);
  buttonPlus.addEventListener(`click`, function(){
    buttonPlus.disabled = true;
    let idPlus = document.getElementById(`plus.id`);
    let create_card = document.getElementById('create-card');
    let content_cr = document.getElementById('content-cr');
    let title = document.getElementById('title');
    let info_disp = document.getElementById('info-disp');
    let buttonCard = document.getElementById('buttoncard');
    console.log(create_card.classList.contains('1'));
    if (create_card.classList.contains('1')) {
      console.log(`a`)
      content_cr.classList.add('content-cr');
      create_card.classList.add('create-card');
      create_card.classList.remove('1');
      create_card.classList.remove('create-card2');
      content_cr.classList.remove('content-cr2');
      setTimeout(() => {
        title.classList.remove('hidden');
        info_disp.classList.remove('hidden');
        buttonCard.classList.remove('hidden');
        title.classList.add('title');
        info_disp.classList.add('info-disp');
        buttonCard.classList.add('button-card');
        buttonPlus.disabled = false;
      }, 2000);
    } else {
      console.log(`a1`)
      create_card.classList.add('1');
      create_card.classList.add('create-card2');
      content_cr.classList.remove('content-cr');
      content_cr.classList.add('content-cr2');
      create_card.classList.remove('create-card');
      title.classList.add('hidden');
      info_disp.classList.add('hidden');
      buttonCard.classList.add('hidden');
      title.classList.remove('title');
      info_disp.classList.remove('info-disp');
      buttonCard.classList.remove('button-card');
      setTimeout(() => {
        content_cr.classList.remove('content-cr2');
        buttonPlus.disabled = false;
      }, 2000);
    }
    idPlus.classList.toggle('animato');
  });
};
function list(){
  let argument = arguments[0];
  let list = document.getElementById('list-cr' + argument);
  let list1 = document.getElementById('list-cr1');
  let list2 = document.getElementById('list-cr2');
  let list3 = document.getElementById('list-cr3');
  let list4 = document.getElementById('list-cr4');
  if (argument === 1){
    if (!list2.classList.contains('hidden')){
      list2.classList.add('hidden')
    }
    if (!list3.classList.contains('hidden')){
      list3.classList.add('hidden')
    }
    if (!list4.classList.contains('hidden')) {
      list4.classList.add('hidden')
    }
  }
  if (argument === 2){
    if (!list1.classList.contains('hidden')){
      list1.classList.add('hidden')
    }
    if (!list3.classList.contains('hidden')){
      list3.classList.add('hidden')
    }
    if (!list4.classList.contains('hidden')) {
      list4.classList.add('hidden')
    }
  }
  if (argument === 3){
    if (!list1.classList.contains('hidden')){
      list1.classList.add('hidden')
    }
    if (!list2.classList.contains('hidden')){
      list2.classList.add('hidden')
    }
    if (!list4.classList.contains('hidden')) {
      list4.classList.add('hidden')
    }
  }
  if (argument === 4){
    if (!list2.classList.contains('hidden')){
      list2.classList.add('hidden')
    }
    if (!list3.classList.contains('hidden')){
      list3.classList.add('hidden')
    }
    if (!list1.classList.contains('hidden')) {
      list1.classList.add('hidden')
    }
  }
  if (list.classList.contains('hidden')) {
    list.classList.remove('hidden')
  } else {
    list.classList.add('hidden')
  }
}
function changecnt(){
  let argument = arguments[0];
  let firstDigit = String(argument)[0];
  let cng = document.getElementById('cng-' + firstDigit);
  let ide = document.getElementById(argument);
  cng.textContent = ide.textContent
}
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
function send() {
  const company = document.getElementById('Cpn_in').value;
  const email = document.getElementById('email_in').value;
  const password = document.getElementById('pass_in').value;
  const nickname = document.getElementById('nick_in').value;
  const note = document.getElementById('note_in').value;
  if (company !== `` && email !== `` && password !== `` && nickname !== `` && note !== ``){
  ipcRenderer.send('save-cards', { company, email, password, nickname, note });
  let idPlus = document.getElementById(`plus.id`)
  let create_card = document.getElementById('create-card');
  let content_cr = document.getElementById('content-cr');
  let title = document.getElementById('title');
  let info_disp = document.getElementById('info-disp');
  let buttonCard = document.getElementById('buttoncard');
  if (create_card.classList.contains('1')) {
    content_cr.classList.add('content-cr');
    create_card.classList.add('create-card');
    setTimeout(() => {
      title.classList.remove('hidden');
      info_disp.classList.remove('hidden');
      buttonCard.classList.remove('hidden');
      title.classList.add('title');
      info_disp.classList.add('info-disp');
      buttonCard.classList.add('button-card');
    }, 2000);
    create_card.classList.remove('1');
    create_card.classList.remove('create-card2');
    content_cr.classList.remove('content-cr2');
  } else {
    create_card.classList.add('create-card2');
    content_cr.classList.remove('content-cr');
    content_cr.classList.add('content-cr2');
    create_card.classList.remove('create-card');
    title.classList.add('hidden');
    info_disp.classList.add('hidden');
    buttonCard.classList.add('hidden');
    setTimeout(() => {
      content_cr.classList.remove('content-cr2');
      location.reload(true);
    }, 2000);
    create_card.classList.add('1');
  }
  idPlus.classList.toggle('animato');
  } else {
    displayMessage(`-> Riempire tutti i campi`, `error`)
  }
};
function createCardElement(card, i) {
  const div = document.createElement('div');
  div.className = 'card';

  // Sezione azienda
  const companySection = document.createElement('section');
  companySection.className = 'company';

  const companyButton = document.createElement('button');
  companyButton.innerHTML = '<i class="fa-regular fa-pen-to-square fa-xl"></i>';
  companyButton.id = `Buttonid${i}`;
  companySection.appendChild(companyButton);

  const h2 = document.createElement('h2');
  h2.id = `Azienda${i}`;
  h2.className = 'Azienda';
  h2.textContent = `${card.company.slice(0, 13)}...`;
  h2.textContent = card.company;
  companySection.appendChild(h2);

  div.appendChild(companySection);

  // Separatore
  const hr = document.createElement('hr');
  div.appendChild(hr);

  // Sezione info-card
  const infoCardSection = document.createElement('section');
  infoCardSection.className = 'info-card';

  // Funzione per creare ogni campo con il pulsante di copia
  function createInfoSection(id, className, textContent, buttonId) {
    const section = document.createElement('section');

    const button = document.createElement('button');
    button.id = buttonId;
    button.innerHTML = '<i class="fa-solid fa-copy fa-xl"></i>';
    section.appendChild(button);

    const h4 = document.createElement('h4');
    h4.id = id;
    h4.className = className;
    h4.textContent = textContent;
    section.appendChild(h4);

    return section;
  }

  infoCardSection.appendChild(createInfoSection(`Email${i}`, 'email', card.email, `CopyEmail${i}`));
  infoCardSection.appendChild(createInfoSection(`Password${i}`, 'pass', card.password, `CopyPassword${i}`));
  if (card.nickname) {
    infoCardSection.appendChild(createInfoSection(`Nickname${i}`, 'nickname', card.nickname, `CopyNickname${i}`));
  }

  if (card.note) {
    infoCardSection.appendChild(createInfoSection(`Nota${i}`, 'nota', card.note, `CopyNota${i}`));
  }

  div.appendChild(infoCardSection);

  return div;
};
function copyCrd(){
  const buttons = document.querySelectorAll('button[id^="Copy"]');
  console.log(buttons);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log(buttons[i]);
      let id = buttons[i].id; 
      let typeid = id.replace('Copy', ''); 
      let contenth4 = document.getElementById(typeid).textContent;
      navigator.clipboard.writeText(contenth4);
    });
  };
};
function modifycr(company1, email1, pass1, username1, note1){
  const Updatebtn = document.getElementById(`Updatedit`);
  let divtitle = document.getElementById(`titleModify`);
  let mainModify = document.getElementById(`mainModify`);
  let buttonModify = document.getElementById(`buttonModify`);
  let Company = document.getElementById(`EditCpy`);
  let Email = document.getElementById(`EditEmail`);
  let Password = document.getElementById(`Editpw`);
  let Nickname = document.getElementById(`EditNick`);
  let Note = document.getElementById(`EditNote`);

  console.log(divtitle.classList.value == `hidden`);
  if(divtitle.classList.value == `hidden`){
    divtitle.classList.remove(`hidden`);
    divtitle.classList.add(`titleModify`);
    mainModify.classList.remove(`hidden`);
    mainModify.classList.add(`mainModify`);
    buttonModify.classList.remove(`hidden`);
    buttonModify.classList.add(`buttonModify`);

    Company.value = company1;
    Email.value = email1;
    Password.value = pass1;
    Nickname.value = username1;
    Note.value = note1;
  } else{
    divtitle.classList.add(`hidden`);
    divtitle.classList.remove(`titleModify`);
    mainModify.classList.add(`hidden`);
    mainModify.classList.remove(`mainModify`);
    buttonModify.classList.add(`hidden`);
    buttonModify.classList.remove(`buttonModify`);

    Company.value = ``;
    Email.value = ``;
    Password.value = ``;
    Nickname.value = ``;
    Note.value = ``;
  }
  Updatebtn.addEventListener(`click`, function(){
    let company = document.getElementById(`EditCpy`).value;
    let email = document.getElementById(`EditEmail`).value;
    let password = document.getElementById(`Editpw`).value;
    let nickname = document.getElementById(`EditNick`).value;
    let note = document.getElementById(`EditNote`).value;
    ipcRenderer.send('update-card', [{company, email, password, nickname, note},{company1, email1, pass1, username1, note1}]);
    openCard();
    modifycr();
    setTimeout(() => {
      location.reload(true);
    }, 2000);
    console.log(company, email, password, nickname, note);
    console.log(company1, email1, pass1, username1, note1);
  });
}
function openCard(){
  let Card = document.getElementById(`CardOpnCls`);
  let background = document.getElementById(`modifier-cnt`);
  console.log(Card.classList.value == `cardModify2` || Card.classList.value == ``);
  if (Card.classList.value == `cardModify2` || Card.classList.value == ``){
    Card.classList.remove(`cardModify2`);
    Card.classList.add(`cardModify`);
  } else {
    Card.classList.remove(`cardModify`);
    Card.classList.add(`cardModify2`);
    setTimeout(function(){
      Card.classList.remove(`cardModify2`);
    }, 2000)
  }
  if (background.classList.value == `modifier-cnt2` || background.classList.value == ``){
    background.classList.add(`modifier-cnt`);
    background.classList.remove(`modifier-cnt2`);
  } else {
    background.classList.add(`modifier-cnt2`);
    background.classList.remove(`modifier-cnt`);
    setTimeout(function(){
      background.classList.remove(`modifier-cnt2`);
    }, 2000)
  }
}
function modifyCard(){
  const buttons = document.querySelectorAll('button[id^="Buttonid"]');
  const backbtn = document.getElementById(`BackModify`);
  const Deletebtn = document.getElementById(`Deletedit`);
  const Updatebtn = document.getElementById(`Updatedit`);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      openCard();
      let company = document.getElementById(`Azienda${i}`).textContent;
      let email = document.getElementById(`Email${i}`).textContent;
      let pass = document.getElementById(`Password${i}`).textContent;
      let username = document.getElementById(`Nickname${i}`).textContent;
      let note = document.getElementById(`Nota${i}`).textContent;
      console.log(company, email, pass, username, note);
      setTimeout(function(){
        modifycr(company, email, pass, username, note);
      }, 2000)
      // Utilizzarlo per costruire la pagina
      Deletebtn.addEventListener(`click`, function(){
          ipcRenderer.send(`DeleteCard`, {company, email, pass, username, note});
          openCard();
          modifycr();
          setTimeout(() => {
            location.reload(true);
          }, 2000);
      });
    });
  };
  backbtn.addEventListener(`click`, function(){
    openCard();
    modifycr();
  });
}
window.addEventListener('load', function() {
  const main = document.getElementById('main');
  ipcRenderer.send('request-cards');
  ipcRenderer.on('response-cards', (event, datacr) => {
    for (let i = 0; i < datacr.length; i++) {
      const card = datacr[i];
      const cardElement = createCardElement(card, i);
      main.appendChild(cardElement);
    }
  // Funzioni che necessitano di avere le card
  copyCrd();
  modifyCard();
  });
});
// Funzioni finali richiamate all'utilizzo
  changeMode();
  toggleAnimation();