import proj from './projects/projects.js'
import contact from './contact/contact.js'
import lifeEvents from './lifeEvents/lifeEvents.js'
import aboutMe from './aboutMe/aboutMe.js'
import bg from './background/background.js'

class UIManager {
    _parents
    _UILoaded = [];
    _removable = {};
    _UIInstalled = {};

    constructor(){
        parent = document.getElementById('main');
        this.installUI({name:aboutMe.name,link:aboutMe.link,cb:aboutMe.cb},false);
        this.installUI({name:bg.name,link:bg.link,cb:bg.cb},false);
        this.installUI({name:proj.name,link:proj.link,cb:proj.cb},false);
        this.installUI({name:lifeEvents.name,link:lifeEvents.link,cb:lifeEvents.cb},false);
        this.installUI({name:contact.name,link:contact.link,cb:contact.cb},false);
    }

    getUIs(){
        return Object.keys(this._removable);
    }

    loadAll(){
        for(let i in this._UIInstalled){
            this.loadUI(i);
        }
    }

    getLoaded(){
        return this._UILoaded;
    }

    installUI({name,link,cb},removable = true){
        if(this._UIInstalled[name])return;
        this._UIInstalled[name] = {link:link,cb:cb};
        if(removable)this._removable[name] = true;
    }

    removeUI(name){
        if(!this._UIInstalled[name])return;
        delete this._UIInstalled[name];
        if(this._removable[name])delete this._removable[name];
    }

    loadUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index !== -1)return;
        let info = this._UIInstalled[name];
        this._UILoaded.push(name);
        this.readTextFile(name,info.link,info.cb);
    }

    hideUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index === -1)return;
        document.getElementById('_UIWRAPPER_'+name).remove();
        this._UILoaded.splice(index,1);
    }
    
    readTextFile(name,file,onFinish){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        let UIwrapper = document.createElement('div');
        UIwrapper.id = '_UIWRAPPER_'+name;
        UIwrapper.style.zIndex = '9';
        parent.appendChild(UIwrapper);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    UIwrapper.insertAdjacentHTML('beforeend',allText);
                    onFinish();
                }
            }
        }
        rawFile.send(null);
    }
}

const uiManager = new UIManager();

export default uiManager;

uiManager.loadAll();