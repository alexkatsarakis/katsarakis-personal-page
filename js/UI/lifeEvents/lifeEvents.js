export default {name:'Life Events',link: '../js/UI/lifeEvents/lifeEvents.html',cb:onExperienceLoad};

import httpRequest from '../../utils/httpRequest.js'
import uiFactory from '../../utils/UIFactory.js';

function showEvents(events){
    let tabs = [];
    tabs.push(document.getElementById('experience-extended-item-top-left'));
    tabs.push(document.getElementById('experience-extended-item-top-right'));
    tabs.push(document.getElementById('experience-extended-item-bottom-left'));
    tabs.push(document.getElementById('experience-extended-item-bottom-right'));

    tabs.forEach((tab)=>{
        tab.style.display = 'none';
        tab.innerHTML = '';
    });

    for(let i in events){
        if(i > 3)break;
        uiFactory.createElement({
            parent: tabs[i],
            innerHtml: events[i].title,
            classList: 'experience-extended-item-title'
        });
        uiFactory.createElement({
            parent: tabs[i],
            innerHtml: events[i].description,
            classList: 'experience-extended-item-description'
        });
        tabs[i].style.display = 'block';
    }


}

function createDate(type, expWrapper, year, experiences){
    let wrap;
    wrap = document.getElementById(`experience-year-${year}`) 
    || uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-year-'+year
    });
    wrap.innerHtml = '';
    wrap.classList = 'experience-year-'+type;

    uiFactory.createElement({
        parent: wrap,
        classList: 'experience-year-line'
    });
    let item = uiFactory.createElement({
        parent: wrap,
        classList: 'experience-year-line-year'
    });

    let thisMonth = experiences.filter(exp=> exp.date.month === 1);
    if(thisMonth.length > 0){
        if(type === 'long' || thisMonth[0].importance > 5){
            item.classList += ' experience-year-line-month-full';
            item.onclick = function(){
                showEvents(experiences.filter(exp=> exp.date.month === 1));
            };
        }
    }
        

    uiFactory.createElement({
        parent: wrap,
        classList: 'experience-year-text-year',
        innerHtml: year
    }).onclick = ()=>{
        showEvents([]);
        createDate((type === 'long')?'short':'long', expWrapper, year, experiences);
    };
    for(let i = 1; i < 12; ++i){
        item = uiFactory.createElement({
            parent: wrap,
            classList: 'experience-year-line-month'
        });
        item.style.marginTop = `calc(var(--year-height) - calc(var(--year-height)/24) - calc(2*${i}*(var(--year-height)/24)))`;
    
        thisMonth = experiences.filter(exp=> exp.date.month === i+1);
        if(thisMonth.length > 0){
            if(type === 'long' || thisMonth[0].importance > 5){
                item.classList += ' experience-year-line-month-full';
                item.onclick = function(){
                    showEvents(experiences.filter(exp=> exp.date.month === i+1));
                };
            }
        }
        
    
    }
}

async function onExperienceLoad(){
    let exp = await httpRequest('GET', '../resources/json/lifeEvents.json', null);
    exp = JSON.parse(exp);

    let earliestYear = 3000;
    exp.forEach(element => {
        if(element.date.year < earliestYear)
            earliestYear = element.date.year;
    });

    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const expWrapper = document.getElementById('experience-cover');

    uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-title',
        innerHtml: 'Life Events Timeline'
    });



    let topLeft = uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-extended-item-top-left',
        classList: 'experience-extended-item'
    });
    let topRight = uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-extended-item-top-right',
        classList: 'experience-extended-item'
    });
    
    let botLeft = uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-extended-item-bottom-left',
        classList: 'experience-extended-item'
    });

    let botRight = uiFactory.createElement({
        parent: expWrapper,
        id: 'experience-extended-item-bottom-right',
        classList: 'experience-extended-item'
    });

    for(let year = currentYear; year >= earliestYear; year--){
        if(currentYear - year < 3)
            createDate('long',expWrapper, year, exp.filter(element=>element.date.year === year));
        else 
        createDate('short',expWrapper, year, exp.filter(element=>element.date.year === year));
    }    
    
    topLeft.style.height = `${(expWrapper.offsetHeight/2) - 10}px`;
    topRight.style.height = `${(expWrapper.offsetHeight/2) - 10}px`;
    botLeft.style.height = `${(expWrapper.offsetHeight/2) - 10}px`;
    botRight.style.height = `${(expWrapper.offsetHeight/2) - 10}px`;
    botLeft.style.marginTop = `${(expWrapper.offsetHeight/2)}px`;
    botRight.style.marginTop = `${(expWrapper.offsetHeight/2)}px`;
}
