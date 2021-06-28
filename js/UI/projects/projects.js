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

function getLanguageFilters(projects){
    const filters = ['All'];
    for(let i in projects){
        const proj = projects[i];
        if(!filters.includes(proj.information.Language)){
            filters.push(proj.information.Language);
        }
    }

    return filters;
}

function getCollaboratorFilters(projects){
    const filters = ['All'];
    for(let i in projects){
        const proj = projects[i];
        if(!proj.information.Collaborators)continue;

        proj.information.Collaborators.forEach(collab => {
            if(!filters.includes(collab)){
                filters.push(collab);
            }
        });
    }

    return filters;
}

function getLinksFilters(projects){
    const filters = ['All'];
    for(let i in projects){
        const proj = projects[i];
        if(!proj.links)continue;

        const links = proj.links;
        for(let j in links){
            if(!filters.includes(links[j].name)){
                filters.push(links[j].name);
            }
        }
    }

    return filters;
}

function renderProjects(projects, wrapper){
    let counter = 0;
    for(let i in projects){
        let proj = projects[i];
        
        createProjectUI(proj, wrapper);
        counter++;
    }

    uiFactory.createElement({
        parent: wrapper,
        innerHtml: 'Projects Shown ('+counter+')'
    });
}

async function onProjectsLoaded(){


    let resp;
    resp = await httpRequest('GET', './resources/json/personalProjects.json', null);
    resp = JSON.parse(resp);

    let projectsResult  = document.getElementById('projects-results');
    let projectFilters  = document.getElementById('projects-filters');

    const dropdownLanguages = uiFactory.createDropdown({
        parent: projectFilters,
        array: getLanguageFilters(resp),
        label: 'Choose Language: '
    });

    dropdownLanguages.onchange = ()=>{
        let projs = filterProjects(resp,{
            link: (dropdownLinks.value !== 'All')?dropdownLinks.value: undefined,
            collaborator: (dropdownCollabs.value !== 'All')?dropdownCollabs.value: undefined,
            language: (dropdownLanguages.value !== 'All')?dropdownLanguages.value: undefined
        });
        projectsResult.innerHTML = '';
        renderProjects(projs, projectsResult);
    }

    const dropdownCollabs = uiFactory.createDropdown({
        parent: projectFilters,
        array: getCollaboratorFilters(resp),
        label: 'Choose Collaborator: '
    });

    dropdownCollabs.onchange = ()=>{
        let projs = filterProjects(resp,{
            link: (dropdownLinks.value !== 'All')?dropdownLinks.value: undefined,
            collaborator: (dropdownCollabs.value !== 'All')?dropdownCollabs.value: undefined,
            language: (dropdownLanguages.value !== 'All')?dropdownLanguages.value: undefined
        });
        projectsResult.innerHTML = '';
        renderProjects(projs, projectsResult);
    }

    const dropdownLinks = uiFactory.createDropdown({
        parent: projectFilters,
        array: getLinksFilters(resp),
        label: 'Choose Possible Link: '
    });

    dropdownLinks.onchange = ()=>{
        let projs = filterProjects(resp,{
            link: (dropdownLinks.value !== 'All')?dropdownLinks.value: undefined,
            collaborator: (dropdownCollabs.value !== 'All')?dropdownCollabs.value: undefined,
            language: (dropdownLanguages.value !== 'All')?dropdownLanguages.value: undefined
        });
        projectsResult.innerHTML = '';
        renderProjects(projs, projectsResult);
    }

    renderProjects(resp, projectsResult);



}
