import { useState } from 'react';
import styles from "../Styles/projectsTab.module.css";

import options from "../Options.json";

import { FaGithub, FaYoutube, FaFilePdf, FaPlay, FaResearchgate, FaCaretRight, FaCaretDown } from "react-icons/fa";
import { SiIeee } from "react-icons/si";
import { Carousel } from './Carousel';

const linkMap = {
    'Github': FaGithub,
    'Youtube': FaYoutube,
    'PDF': FaFilePdf,
    'IEEE': SiIeee,
    'Demo': FaPlay,
    'ResearchGate': FaResearchgate
}

export const ProjectLink = (props) => {
    const link = props.link;
    const page = props.page;
    if(!link || !page) return null;


    const redirect = () => {
        window.open(link, '_blank');
    }

    const Icon = linkMap[page];
    return <div title={page} onClick={redirect} className={styles.itemLink}>
        {Icon? <Icon size={'1.5em'}/>: page}
    </div>
}

export const ProjectCard = (props) => {
    
    const [ showingBody, setShowingBody ] = useState(false);

    const project = props.project;
    if(!project) return null;

    const toggleShowingBody = () => {
        setShowingBody(!showingBody);
    }

    const projectLinks = project.links?.map((link, i) => (
        <ProjectLink key={`link_object_${project.title.replaceAll(' ','_')}_${i}`} link={link.url} page={link.name}/>
    ));

    return <>
        <div onClick={toggleShowingBody} className={styles.itemTop}>
            <div className={styles.itemCaretWrap}>
                {showingBody? <FaCaretDown/>: <FaCaretRight/>}
                <div className={styles.itemTitle}>{project.title}</div>
            </div>
            <div className={styles.itemTime}>{project.place} ({project.time})</div>
        </div>
        { true && 
            <div className={`${styles.itemMain} ${showingBody? styles.showing_item_body: ''}`}>
                {   project.images && project.images.length > 2 &&
                    <Carousel images={project.images}/>
                }
                {
                    project.description &&
                    <div className={styles.itemDescription}>
                        Description: {project.description} 
                    </div>
                }
                {/* <div className={styles.itemCollaborators}>
                    Collaborators: 
                </div> */}
                {   project.links &&
                    <div className={styles.itemLinks}>
                        {projectLinks}
                    </div>
                }
            </div>
        }
    </>
}

export const ProjectsTab = (props) => {
    
    const projects = options.Projects;

    const proj = projects.map((item, i) => {
        return <div key={`projects_item_${i}`} className={styles.itemWrap}>
                <ProjectCard project={item}/>
            </div>
    })
    
    return <div className={styles.wrap}>
        {proj}
    </div>
}