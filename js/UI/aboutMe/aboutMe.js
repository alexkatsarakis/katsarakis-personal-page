export default {name:'About me',link: './js/UI/aboutMe/aboutMe.html',cb:onAboutMeLoaded};

async function onAboutMeLoaded(){
    let nameDom = document.getElementById('aboutMe-name');
    nameDom.innerHTML = 'Alexandros Katsarakis';

    let textDom = document.getElementById('aboutMe-description');
    textDom.innerHTML = `Since I was a kid I was always eager to improve myself and excited by computers. Thus, I chose to study computer science. I am currently finishing my 2-year master by research degree in computer science specialized in software engineering. As early as my second undergrad year I was involved in numerous research and extracurricular/personal projects in parallel with my studies, spanning a broad range of fields from high performance and concurrent computing to programming languages and software engineering.`;

}
