
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
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

const linkToPageMap = {
    'Overview': {
        'icon': GiMagnifyingGlass,
        'component': OverviewTab,
        uri: 'overview'
    },
    'About Me': {
        'icon': IoMdInformationCircleOutline,
        'component': AboutMeTab,
        uri: 'about-me'
    },
    'Education': {
        'icon': FaUniversity,
        'component': EducationTab,
        uri: 'education'
    },
    'Experience': {
        'icon': MdWork,
        'component': ExperienceTab,
        uri: 'experience'
    },
    'Publications': {
        'icon': IoMdDocument,
        'component': PublicationsTab,
        uri: 'publications'
    },
    'Projects': {
        'icon': BsCode,
        'component': ProjectsTab,
        uri: 'projects'
    },
    'Contact': {
        'icon': AiOutlineContacts,
        'component': ContactTab,
        uri: 'contact'
    },
}

export const Page = (props) => {
    const {'*': currentTab } = useParams();
    const navigate = useNavigate();
    const [ showInfo, setShowInfo ] = useState(false);


    const tabTitles = Object.keys(linkToPageMap).map(i => {
        const Icon = linkToPageMap[i]?.icon;
        return <div
                    key={i}
                    className={`${styles.pageLeftSideBottomItem}${currentTab === i? ` ${styles.pageLeftSideBottomItemActive}`: ''}`}
                    onClick={()=>{navigate(linkToPageMap[i].uri);onBurgerClick();}}
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
                <Routes>
                    {Object.values(linkToPageMap).map((value, index) => (
                        <Route key={index} exact path={value.uri} element={React.createElement(value.component)} />
                    ))}
                    <Route exact path='/*' element={React.cloneElement(linkToPageMap.Overview.component)} />
                </Routes>
            </div>
        </div>
    </>
}