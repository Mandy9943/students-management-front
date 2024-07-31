import React from 'react';

import { StudentProvider } from '@/store/StudentContext';
import styles from './Home.module.scss';
import Heading from './components/Heading/Heading';
import Table from './components/Table/Table';

const Home: React.FC = () => (
  <StudentProvider>
    <main>
      <div className={styles.homeContainer}>
        <Heading />
        <Table />
      </div>
    </main>
  </StudentProvider>
);

export default Home;
