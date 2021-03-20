import UIManager from "./UI/UIManager.js"

import uiFactory from './utils/UIFactory.js'

const navbarItems = UIManager.getLoaded();

function buildNavbar(){
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
    buildNavbar();
} 

onStart();