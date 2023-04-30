import styles from "../Styles/infoCard.module.css";

export const InfoCard = (props) => {

    const data = props.data;
    return <div className={styles.wrap}>
        <div className={styles.top}>
            <div className={styles.time}>{data.time}</div>
            <div className={styles.title}>{data.title}</div>
            {data.place && <div className={styles.place}>{data.place}</div>}
        </div>
        {/* <div className={styles.bottom}>
            {data.children && data.children.map((item, i) => (
                <div key={i} className={styles.bottomItem}>
                    <div className={styles.bottomItemBullet}></div>
                    <div className={styles.bottomItemMain}>{item}</div>
                </div>
            ))}
        </div> */}
    </div>
}