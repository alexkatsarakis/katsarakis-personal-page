import { useState } from "react";
import styles from "../Styles/experienceTab.module.css";

import options from "../Options.json";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";

export const ExperienceCard = (props) => {
    
    const [ showingBody, setShowingBody ] = useState(true);

    const experience = props.experience;
    if(!experience) return null;

    const toggleShowingBody = () => {
        setShowingBody(!showingBody);
    }

    return <>
        <div onClick={toggleShowingBody} className={styles.itemTop}>
            <div className={styles.itemCaretWrap}>
                {showingBody? <FaCaretDown/>: <FaCaretRight/>}
                <div className={styles.itemTitle}>{experience.title}</div>
            </div>
            <div className={styles.itemTime}>{experience.place} ({experience.time})</div>
        </div>
        { true && 
            <div className={`${styles.itemMain} ${showingBody? styles.showing_item_body: ''}`}>
                {
                    experience.children &&
                    <div className={styles.itemDescription}>
                        <ul>
                            {experience.children.map((str, i) => (<li key={`children_${experience.title}_${i}`}>{str}</li>))}
                        </ul>
                    </div>
                }
                {
                    experience.description &&
                    <div className={styles.itemDescription}>
                        Description: {experience.description} 
                    </div>
                }
            </div>
        }
    </>
}

export const ExperienceTab = (props) => {
    const experience = options.Experience;

    const exp = experience.map((item, i) => {
        return <div key={`experience_item_${i}`} className={styles.itemWrap}>
                    <ExperienceCard experience={item}/>
                {/* <div className={styles.itemTop}>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemTime}>{item.place} ({item.time})</div>
                </div> */}
            </div>
    })
    
    return <div className={styles.wrap}>
        {exp}
    </div>
}