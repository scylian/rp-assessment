import React from 'react';
import styles from './App.module.scss';

// Components
import Container from './components/Container/container';

function App() {
  return (
    <div>
      <h1 className={styles.header}>SpaceX Launches</h1>
      <Container/>
    </div>
  );
}

export default App;
