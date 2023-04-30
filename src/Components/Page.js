
import React ,{ useState } from 'react';
import styles from "../Styles/page.module.css";
import { AboutMeTab } from './AboutMeTab';
import { ContactTab } from './ContactTab';
import { EducationTab } from './EducationTab';
import { ExperienceTab } from './ExperienceTab';
import { OverviewTab } from "./OverviewTab";
import { ProjectsTab } from './ProjectsTab';
import { PublicationsTab } from './PublicationsTab';
import { QuickInfo } from "./QuickInfo";

import { GiMagnifyingGlass } from 'react-icons/gi';
import { IoMdInformationCircleOutline, IoMdDocument } from 'react-icons/io';
import { FaUniversity } from 'react-icons/fa';
import { MdWork, MdMenu } from 'react-icons/md';
import { AiOutlineContacts } from 'react-icons/ai';
import { BsSunFill, BsCode } from 'react-icons/bs';

const linkToPageMap = {
    'Overview': {
        'icon': GiMagnifyingGlass,
        'component': OverviewTab
    },
    'About Me': {
        'icon': IoMdInformationCircleOutline,
        'component': AboutMeTab
    },
    'Education': {
        'icon': FaUniversity,
        'component': EducationTab
    },
    'Experience': {
        'icon': MdWork,
        'component': ExperienceTab
    },
    'Publications': {
        'icon': IoMdDocument,
        'component': PublicationsTab
    },
    'Projects': {
        'icon': BsCode,
        'component': ProjectsTab
    },
    'Contact': {
        'icon': AiOutlineContacts,
        'component': ContactTab
    },
}

export const Page = (props) => {

    const [ currentTab, setCurrentTab ] = useState('Overview');
    const [ showInfo, setShowInfo ] = useState(false);


    const tabTitles = Object.keys(linkToPageMap).map(i => {
        const Icon = linkToPageMap[i]?.icon;
        return <div
                    key={i}
                    className={`${styles.pageLeftSideBottomItem}${currentTab === i? ` ${styles.pageLeftSideBottomItemActive}`: ''}`}
                    onClick={()=>{setCurrentTab(i);onBurgerClick();}}
                >
                    {Icon && <Icon/>}{i}
                </div>
    });

    
    const onBurgerClick = () => setShowInfo(!showInfo)

    const getCurrLightMode = () => {
        return document.documentElement.className;
    }

    const switchLightMode = () => {
        const currMode = getCurrLightMode();
        document.documentElement.className = (currMode === 'dark'? 'light': 'dark');
    }

    return <>
        <div className={styles.burger} onClick={onBurgerClick}><MdMenu size={'1.5em'}/></div>
        <div className={styles.pageWrapper}>
            <div className={`${styles.pageLeftSide} ${showInfo?styles.pageLeftSideShow:styles.pageLeftSideHide}`}>
                <div className={styles.pageLeftSideTop}>
                    <QuickInfo/>
                </div>
                <div className={styles.pageLeftSideBottom}>
                    <div className={styles.pageLeftSideBottomTop}>
                        {tabTitles}
                    </div>
                    <div className={styles.pageLeftSideBottomBottom}>
                        <div className={styles.pageLeftSideBottomItemSimple} onClick={switchLightMode}><BsSunFill/></div>
                    </div>
                </div>
            </div>
            <div className={styles.pageRightSide}>
                {React.createElement(linkToPageMap[currentTab].component)}
            </div>
        </div>
    </>
}