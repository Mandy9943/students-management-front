import ClientHeading from './ClientHeading';
import styles from './Heading.module.scss';

const Heading = () => (
  <div className={styles.heading}>
    <h1 className={styles.title}>Manage Students</h1>

    <ClientHeading />
  </div>
);

export default Heading;
