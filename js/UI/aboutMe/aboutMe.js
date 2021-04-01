export default {name:'About me',link: './js/UI/aboutMe/aboutMe.html',cb:onAboutMeLoaded};

import httpRequest from '../../utils/httpRequest.js'

async function onAboutMeLoaded(){
    let info = await httpRequest('GET', './resources/json/mainInformation.json', null);
    info = JSON.parse(info);

    let nameDom = document.getElementById('aboutMe-name');
    nameDom.innerHTML = info.name;

    let textDom = document.getElementById('aboutMe-description');
    textDom.innerHTML = info.description;

    let picture = document.getElementById('aboutMe-personImageHead');
    picture.style.backgroundImage = `url(./resources/icons/${info.picture})`

}
