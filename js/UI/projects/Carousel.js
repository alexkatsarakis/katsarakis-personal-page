import uiFactory from '../../utils/UIFactory.js'

uiFactory.addHTMLfromString({
    str: `<link rel="stylesheet" href="../js/UI/projects/carouselTab.css">`,
    parent: document.body
});

export default class Carousel{
    _images
    _swapTimeout
    _currentlyShowing
    _delay

    constructor(images, attachParent, delay = 5000){
        this._images = images;



        let carWrapper = uiFactory.createElement({
            classList: 'carouselWrapper',
            parent: attachParent
        });
        
        let leftCarBut = uiFactory.createElement({
            classList: 'carouselButLeft',
            parent: carWrapper
        });
        
        this.leftCarImage = uiFactory.createElement({
            classList: 'carouselItem carouselImageLeft',
            parent: carWrapper
        });
        
        this.midCarImage = uiFactory.createElement({
            classList: 'carouselItem carouselImageMid',
            parent: carWrapper
        });
        
        this.rightCarImage = uiFactory.createElement({
            classList: 'carouselItem carouselImageRight',
            parent: carWrapper
        });
        
        let rightCarBut = uiFactory.createElement({
            classList: 'carouselButRight',
            parent: carWrapper
        });
        
        this.mainImageDesc = uiFactory.createElement({
            classList: 'carouselMainImageDesc',
            parent: carWrapper
        })
        
        this._currentlyShowing = 0;

        this._delay = delay;
        this.updateImages(this._currentlyShowing);
        this._swapTimeout = setInterval(() => {
            this.updateImages(++ this._currentlyShowing);
        }, delay);
        leftCarBut.onclick = (()=>{
            this.updateImages(--this._currentlyShowing);
            this.restartInterval();
        });
        
        rightCarBut.onclick = (()=>{
            this.updateImages(++this._currentlyShowing);
            this.restartInterval();
        });
    }

    updateImages(index){
        let leftImageIndex = Math.abs(index % this._images.length);
        let midImageIndex = Math.abs((index + 1) % this._images.length);
        let rightImageIndex = Math.abs((index + 2) % this._images.length);
    
        this.leftCarImage.style.backgroundImage = `url("${this._images[leftImageIndex].url}")`;
        this.midCarImage.style.backgroundImage = `url("${this._images[midImageIndex].url}")`;
        this.mainImageDesc.innerHTML = this._images[midImageIndex].description || '';
        this.rightCarImage.style.backgroundImage = `url("${this._images[rightImageIndex].url}")`;
    }

    restartInterval(){
        clearInterval(this._swapTimeout);
        this._swapTimeout = setInterval(() => {
            this.updateImages(++this._currentlyShowing);
        }, this._delay);
    }
}