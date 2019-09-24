import React from 'react';
import styles from './launchHeader.module.scss';

const LaunchHeader = () => {
  return(
    <div className={styles.root}>
      <span>Badge</span>
      <span>Rocket Name</span>
      <span>Rocket Type</span>
      <span>Launch Date</span>
      <span>Details</span>
      <span>ID</span>
      <span>Article</span>
    </div>
  )
}

export default LaunchHeader