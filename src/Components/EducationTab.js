import styles from "../Styles/educationTab.module.css";

import options from "../Options.json";

import uocLogo from "../icons/UoC_logo.png";

export const EducationTab = (props) => {

    const data = options.Education;

    const itemsToRender = data.map((ed, i) => (
        <div key={`experience_${i}`} className={styles.itemWrap}>
            <img className={styles.itemImage} src={uocLogo} alt=""/>
            <div className={styles.itemBody}>
                <div className={styles.itemHead}>
                    <div className={styles.itemTitle}>{ed.title}</div>
                    <div className={styles.itemTime}>{ed.place} ({ed.time})</div>
                </div>
                <div>Thesis Title: {ed.thesis}</div>
                <div>Thesis Advisor: {ed.advisor}</div>
                {ed.comment && <div>{ed.comment}</div>}
            </div>
        </div>
    ));

    return <div className={styles.wrap}>
        {/* <div id={styles.header}>Education</div> */}
        {itemsToRender}
    </div>
}