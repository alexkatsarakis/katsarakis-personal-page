import { useEffect, useRef, useState } from "react";
import styles from "../Styles/carousel.module.css";

export const Carousel = (props) => {

    const [ currentlyShowing, setCurrentlyShowing ] = useState(null);

    const mountedRef = useRef(true);
    const interv = useRef(null);
    
    useEffect(() => {

        setCurrentlyShowing(1);

        return () => { 
            interv.current && clearTimeout(interv.current);
            mountedRef.current = false;
        }

    }, [ ]);

    if(!props.images || props.images.length < 3) return null;

    if(currentlyShowing === null) return null;

    const length = props.images.length;

    const prev = props.images[(currentlyShowing - 1) % length];
    const curr = props.images[currentlyShowing % length];
    const next = props.images[(currentlyShowing + 1) % length];
    
    const showNext = () => {
        if(interv.current) clearTimeout(interv.current)
        interv.current = setTimeout(()=>{
            if(!mountedRef.current) return;
            setCurrentlyShowing(currentlyShowing + 1);
        }, props.interval || 10000);
    };
    showNext();

    const forceNext = () => {
        setCurrentlyShowing(currentlyShowing + 1);
        showNext();
    }

    const forcePrev = () => {
        setCurrentlyShowing(currentlyShowing + length - 1);
        showNext();
    }

    return <div className={styles.carouselWrap}>
        <div className={styles.carouselLeft}>
            <img
                src={`${process.env.PUBLIC_URL}/icons/projects/${prev.url}`}
                alt='Carousel Right'
                onClick={forcePrev}
                className={styles.carouselAltImage}
            />
        </div>
        <img
            src={`${process.env.PUBLIC_URL}/icons/projects/${curr.url}`}
            alt='Carousel Middle'
            className={styles.carouselMid}
        />
        <div className={styles.carouselRight}>
            <img
                src={`${process.env.PUBLIC_URL}/icons/projects/${next.url}`}
                alt='Carousel Right'
                onClick={forceNext}
                className={styles.carouselAltImage}
            />
        </div>
    </div>
}