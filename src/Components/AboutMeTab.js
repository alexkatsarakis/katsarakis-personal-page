import styles from "../Styles/aboutMeTab.module.css";

import options from "../Options.json";

export const AboutMeTab = (props) => {
    const aboutMeInfo = options.AboutMe;

    const cont = aboutMeInfo.map((item, i) => {
        return <div key={`aboutme_item_${i}`} className={styles.itemWrap}>
                <div className={styles.itemMain}>{item}</div>
            </div>
    })
    
    return <div className={styles.wrap}>
        <div className={styles.title}>About Me</div>
        {cont}
    </div>
}