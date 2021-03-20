import httpRequest from '../../utils/httpRequest.js'

import Carousel from './Carousel.js'
import uiFactory from '../../utils/UIFactory.js'

export default {name:'Projects',link: './js/UI/projects/projects.html',cb:onProjectsLoaded};

async function onProjectsLoaded(){
    let proje = document.getElementById('projects-test');


    // let resp = await httpRequest('GET', 'https://api.github.com/users/alexkatsarakis/repos', null);
    // resp = JSON.parse(resp);
    // console.log(resp);
    // // let onlineRepos = resp.map((repo)=>{name: repo.name, language: repo.language});
    
    // let toShow = '';
    
    // for(let i in resp){
    //     toShow += resp[i].name+' ' + resp[i].language +'<br>';
    // }

    let resp;
    let toShow = '';
    resp = await httpRequest('GET', './resources/json/personalProjects.json', null);
    resp = JSON.parse(resp);

    let projectsWrapper = document.getElementById('projects-wrapper');
    // let keys = Object.keys(resp);
    // console.log(keys);

    for(let i in resp){
        let proj = resp[i];
        
        let pItem = uiFactory.createElement({
            parent: projectsWrapper,
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
                    type: 'a',
                    parent: butWrapper,
                    classList: 'project-item-linkButton',
                    innerHtml: link.name
                });
                but.href = link.url;
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
        uiFactory.createElement({
            parent: butWrapper,
            classList: 'project-item-linkButton',
            innerHtml: 'Extra Information'
        }).onclick = (() => {
            if(info.style.display !== 'block')
                info.style.display = 'block';
            else 
                info.style.display = 'none';
        });

    }



}
