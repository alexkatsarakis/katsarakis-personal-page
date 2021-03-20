export default {name:'About me',link: '../js/UI/aboutMe/aboutMe.html',cb:onAboutMeLoaded};

async function onAboutMeLoaded(){
    let nameDom = document.getElementById('aboutMe-name');
    nameDom.innerHTML = 'Alexandros Katsarakis';

    

}
