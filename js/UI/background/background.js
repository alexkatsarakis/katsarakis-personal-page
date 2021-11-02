import httpRequest from '../../utils/httpRequest.js'
import uiFactory from '../../utils/UIFactory.js';

export default {name:'Background',link: './js/UI/background/background.html',cb:onBackgroundLoad};

function createBackgroundItem(item, parent){
    let itemWrapper = uiFactory.createElement({
        parent: parent,
        classList: 'background-category-item'
    })

    uiFactory.createElement({
        parent: itemWrapper,
        classList: 'background-category-item-head-image'
    }).style.backgroundImage = `url("./js/UI/background/images/${item.image}")`

    uiFactory.createElement({
        parent: itemWrapper,
        classList: 'background-category-item-head-text',
        innerHtml: item.head
    });


    uiFactory.createElement({
        parent: itemWrapper,
        classList: 'background-category-item-comment',
        innerHtml: item.comment
    });

    uiFactory.createElement({
        parent: itemWrapper,
        type: 'br'
    });

    uiFactory.createElement({
        parent: itemWrapper,
        classList: 'background-category-item-body',
        innerHtml: item.body || ''
    });
    if(item.body)
        uiFactory.createElement({
            parent: itemWrapper,
            type: 'br'
        });

    if(item.link){
        const link = uiFactory.createElement({
            type: 'a',
            parent: itemWrapper,
            classList: 'background-category-item-body',
            innerHtml: item.link.alias
        });
        if(item.link.newWindow === true)link.target = '_blank';
        link.href = item.link.url;
    }

    if(item.time){
        if(item.time.started){
            uiFactory.createElement({
                parent: itemWrapper,
                classList: 'background-category-item-time',
                innerHtml: `${item.time.started} - ${item.time.ended || 'Present'}`
            });
        }else{
            uiFactory.createElement({
                parent: itemWrapper,
                classList: 'background-category-item-time',
                innerHtml: `${item.time.timeStamp}`
            });
        }
    }
    
    if(item.location)
        uiFactory.createElement({
            parent: itemWrapper,
            classList: 'background-category-item-location',
            innerHtml: `${item.location}`
        });
}

async function onBackgroundLoad(){
    let info = await httpRequest('GET', './resources/json/background.json', null);
    info = JSON.parse(info);

    const wrapper = document.getElementById('background-wrapper');

    for(let i in info){
        let cat = info[i];

        let catWrapper = uiFactory.createElement({
            parent: wrapper,
            classList: 'background-category-wrapper'
        });

        uiFactory.createElement({
            parent: catWrapper,
            classList: 'background-category-title',
            innerHtml: i
        });

        cat.forEach((item)=>{
            createBackgroundItem(item, catWrapper);
        });


    }

}
