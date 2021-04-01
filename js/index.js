import UIManager from "./UI/UIManager.js"

import uiFactory from './utils/UIFactory.js'

import httpRequest from './utils/httpRequest.js'

const navbarItems = UIManager.getLoaded();

async function addInformation(){
    
    let info = await httpRequest('GET', './resources/json/mainInformation.json', null);
    info = JSON.parse(info);
    console.log(info);

    document.title = info.name + ' Page';
    
    // let fav = uiFactory.createElement({
    //     type: 'link',
    //     parent: document.getElementsByTagName('head')[0]
    // });
    // fav.rel = 'icon';
    // fav.href = 'resources/icons/'+info.picture;

    document.getElementById('navbar-title').innerHTML = info.name;
    



    const navbar = document.getElementById('navbar'); 
    const navbarRev = navbarItems.reverse();
    const itemContainer = uiFactory.createElement({
        parent: navbar,
        id: 'navbar-item-container'
    });

    navbarRev.forEach((item)=>{
        let itemDom = uiFactory.createElement({
            parent: itemContainer,
            classList: 'navbar-item',
            id: 'navbar-'+item,
            innerHtml: item
        });
        itemDom.onclick = ()=>{
            document.getElementById('_UIWRAPPER_'+item).scrollIntoView({behavior: "smooth", block: "start"});
        }
    })
}


function onStart(){
    addInformation();
} 

onStart();