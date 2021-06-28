import httpRequest from '../../utils/httpRequest.js'

import Carousel from './Carousel.js'
import uiFactory from '../../utils/UIFactory.js'

export default {name:'Projects',link: './js/UI/projects/projects.html',cb:onProjectsLoaded};

function createProjectUI(proj,wrapper){
    let pItem = uiFactory.createElement({
        parent: wrapper,
        classList: 'project-item'
    });

    uiFactory.createElement({
        parent: pItem,
        classList: 'project-item-title',
        innerHtml: proj.title
    });

    let carouselWrapper = uiFactory.createElement({
        parent: pItem,
        classList: 'project-item-carousel-wrap'
    });

    if(proj.images && proj.images.length > 3){
        new Carousel(proj.images,carouselWrapper);
    }

    uiFactory.createElement({
        parent: pItem,
        classList: 'project-item-description',
        innerHtml: proj.description
    });

    let butWrapper = uiFactory.createElement({
        parent: pItem,
        classList: 'project-item-linkButton-wrapper'
    });
    if(proj.links){
        proj.links.forEach((link)=>{
            let but = uiFactory.createElement({
                parent: butWrapper,
                classList: 'project-item-linkButton',
                innerHtml: link.name
            });
            but.onclick = ()=>window.open(link.url);
        });
    }

    let infoString = '';
    for(let i in proj.information){
        let info = proj.information[i];
        if(typeof info === 'string'){
            infoString += `\n${i}: ${info}`;
        }else if(typeof info === 'object'){
            infoString += `\n${i}:`
            for(let j in info){
                infoString += ` ${info[j]},`;
            }
            if(info.length > 0)
                infoString = infoString.slice(0,-1);
        }
    }
    
    let info = uiFactory.createElement({
        parent: pItem,
        classList: 'project-item-info',
        innerHtml: infoString
    });
    let extraInfoBut = uiFactory.createElement({
        parent: butWrapper,
        classList: 'project-item-linkButton',
        innerHtml: 'Extra Information'
    });
    extraInfoBut.onclick = (() => {
        if(info.style.display !== 'block')
            info.style.display = 'block';
        else 
            info.style.display = 'none';
    });

    extraInfoBut.style.textDecoration = 'none';
}

function filterProjects(projects,{title, language, collaborator, link}){
    const toReturn = {};

    for(let i in projects){
        toReturn[i] = projects[i];
    }
    
    for(let i in toReturn){
        const proj = projects[i];

        if(title && !proj.title.toLowerCase().includes(title.toLowerCase())){
            delete toReturn[i];
            continue;
        }

        if(language && proj.information?.Language !== language){
            delete toReturn[i];
            continue;
        }
        
        if(collaborator 
        && (!proj.information.Collaborators || !(proj.information.Collaborators.includes(collaborator)))){
            delete toReturn[i];
            continue;
        }

        if(link && proj.links){
            const links = proj.links;
            let found = false;
            for(let i in links){
                if(links[i].name === link)found = true;
            }
            if(!found)delete toReturn[i];
            continue;
        }
    }

    return toReturn;
}

async function onProjectsLoaded(){


    let resp;
    resp = await httpRequest('GET', './resources/json/personalProjects.json', null);
    resp = JSON.parse(resp);

    let projectsWrapper = document.getElementById('projects-wrapper');

    let projs = filterProjects(resp,{
        // collaborator: 'Emmanouil Adamakis'
    });

    for(let i in projs){
        let proj = projs[i];
        
        createProjectUI(proj,projectsWrapper);

    }



}
