import styles from "../Styles/overviewTab.module.css";

import options from "../Options.json";
import { InfoCard } from "./InfoCard";

export const OverviewTab = (props) => {


    const overviewData = options.overview; 

    const itemsToRender = overviewData.map(cat => (
        <div key={`overview_category_${cat}`} className={styles.categoryWrap}>
            <div className={styles.headerTitle}>{cat}</div>
            {options[cat].map((card, i) => (
                <InfoCard key={`overview_category_${cat}_${i}`} data={card}></InfoCard>
            ))}
        </div>
    ));
    
    return <div className={styles.wrap}>
        {itemsToRender}
    </div>
}