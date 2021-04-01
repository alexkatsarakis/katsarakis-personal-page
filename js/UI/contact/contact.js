import httpRequest from '../../utils/httpRequest.js'
import uiFactory from '../../utils/UIFactory.js'

export default {name:'Contact',link: './js/UI/contact/contact.html',cb:onContactLoaded};

async function onContactLoaded(){
    let contactDetails = await httpRequest('GET', './resources/json/contactDetails.json', null);
    contactDetails = JSON.parse(contactDetails);

    let wrapper = document.getElementById('contacts-wrapper');

    let isLeft = true;

    for(let i in contactDetails){
        let det = contactDetails[i];
        let item = uiFactory.createElement({
            parent: wrapper,
            classList: 'contact-item',
        });

        let left = uiFactory.createElement({
            parent: item,
            classList: 'contact-item-name-left',
            innerHtml: (isLeft)?det.name[0].toUpperCase() + det.name.substring(1):''
        });

        let button = uiFactory.createElement({
            parent: item,
            classList: 'contact-item-but'
        });

        let right = uiFactory.createElement({
            parent: item,
            classList: 'contact-item-name-right',
            innerHtml: (!isLeft)?det.name[0].toUpperCase() + det.name.substring(1):''
        });

        button.style.backgroundImage = `url("./resources/icons/${det.name}.png")`
        button.onclick = () => {
            window.open(det.link);
        }

        button.onmouseenter = ()=>{
            left.style.color = 'var(--main-color)';
            right.style.color = 'var(--main-color)';
        }

        button.onmouseleave = () => {
            left.style.color = '';
            right.style.color = '';
        }

        isLeft = !isLeft;
    }

}
