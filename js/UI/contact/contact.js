import httpRequest from '../../utils/httpRequest.js'


export default {name:'Contact',link: './js/UI/contact/contact.html',cb:onContactLoaded};

async function onContactLoaded(){
    let contactDetails = await httpRequest('GET', './resources/json/contactDetails.json', null);
    contactDetails = JSON.parse(contactDetails);

    let wrapper = document.getElementById('contacts-wrapper');

    for(let i in contactDetails){
        let det = contactDetails[i];
        let dom = document.createElement('div');
        dom.classList = 'contact-item';
        wrapper.appendChild(dom);
        dom.style.backgroundImage = `url("./resources/icons/${det.name}.png")`
        dom.onclick = () => {
            window.open(det.link);
        }
    }

}
