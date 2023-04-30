import styles from "../Styles/publicationsTab.module.css";

import options from "../Options.json";

import { FaYoutube, FaResearchgate } from "react-icons/fa";
import { SiIeee } from "react-icons/si";

const linkMap = {
    'Youtube': FaYoutube,
    'IEEE': SiIeee,
    'ResearchGate': FaResearchgate
}

export const PublicationsTab = (props) => {
    
    const publications = options.Publications;

    const publ = publications.map((item, i) => {
        const links = item.links.map((link, i) => {
            const Icon = linkMap[link.name];
            if(!Icon) return null;
            return <a
                className={styles.itemLink}
                key={`link_publication_${i}`}
                href={link.url}
                target='_blank'
                rel="noreferrer">
                    <Icon/>
                </a>;
        });

        return <div key={`publication_item_${i}`} className={styles.itemWrap}>
                <div className={styles.itemTop}>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemTime}>{item.place} ({item.time})</div>
                </div>
                <div className={styles.itemMain}>
                    {links}
                </div>
            </div>
    })
    
    return <div className={styles.wrap}>
        {publ}
    </div>
}