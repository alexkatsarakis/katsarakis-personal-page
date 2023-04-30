import styles from "../Styles/contactTab.module.css";

import options from "../Options.json";

import { FaLinkedin, FaGithub  } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const iconsMap = {
    'LinkedIn': FaLinkedin,
    'Email': IoMdMail,
    'Github': FaGithub
}

export const ContactTab = (props) => {
    const contact = options.Contact;

    const cont = contact.map((item, i) => {
        const Icon = iconsMap[item.title];
        return <div key={`contact_item_${i}`} className={styles.itemWrap}>
                <a href={item.url} rel="noreferrer" target="_blank" className={styles.itemTop}>
                    {Icon && <Icon size={'1.5em'}/>}
                    <div className={styles.itemTitle}>{item.title}</div>
                </a>
            </div>
    })
    
    return <div className={styles.wrap}>
        {cont}
    </div>
}