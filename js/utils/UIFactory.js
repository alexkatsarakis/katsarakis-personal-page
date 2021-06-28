class UIFactory {
    constructor(){}

    createElement({parent,id,classList,type,innerHtml,inputType,value}){
        let div = document.createElement((type)?type:'div');

        if(id) div.id = id;
        if(classList) div.classList = classList;
        if(innerHtml) div.innerText = innerHtml;
        if(type === 'input' && inputType) div.type = inputType;
        if(value) div.value = value;

        if(parent) parent.appendChild(div);
        return div;
    }

    addHTMLfromString({str,parent}){
        parent.insertAdjacentHTML('afterbegin',str);
    }

    createDropdown({parent,id,classList,array, label}){
        const rand = Math.floor(Math.random()*10000);
        let labelDom = document.createElement('label');
        labelDom.innerHTML = label;
        labelDom.for = rand;
        let div = document.createElement('select');
        div.name = rand;

        if(id) div.id = id;
        if(classList) div.classList = classList;

        array.forEach(item =>{
            this.createElement({
                type:'option',
                value: item,
                innerHtml: item,
                parent: div
            });
        });

        if(parent && label) parent.appendChild(labelDom);
        if(parent) parent.appendChild(div);
        return div;
    }
}

const uiFactory = new UIFactory();

export default uiFactory;