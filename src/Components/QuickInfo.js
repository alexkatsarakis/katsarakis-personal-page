
import myPhoto from "../icons/myself.jpg";

import styles from "../Styles/quickInfo.module.css";

import options from "../Options.json";

import { FaBirthdayCake, FaLocationArrow, FaPhone, FaLink,  } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const iconsMap = {
    'Birthdate': FaBirthdayCake,
    'Location': FaLocationArrow,
    'Phone': FaPhone,
    'Site': FaLink,
    'Email': IoMdMail
}

export const QuickInfo = (props) => {

    const itemsToRender = options["quick-info"].map((item, i)=> {
        const Icon = iconsMap[item.title];
        return <div key={`item_${i}_quick_info`}className={styles.item}>
            <div className={styles['item-title']}>
                {Icon && <Icon/>}
                {item.title}
            </div>
            {item.link?
                <div onClick={() => window.open(item.link, '_blank')} className={styles['item-link']} title={item.link}>{item.value}</div>:
                <div className={styles['item-value']}>{item.value}</div>
            }
        </div>
    }) 
    
    return <div className={styles.wrap}>
        <img src={myPhoto} className={styles.myPic} alt=''/>
        <div className={styles.myName}>Alexandros Katsarakis</div>
        <div className={styles.myOccupation}>Software Engineer</div>
        <div></div>
        {itemsToRender}
    </div>
}