import React from 'react';
import styles from './launchCard.module.scss';
import Moment from 'react-moment';

import { ReactComponent as LinkIcon } from '../../assets/link.svg';


const LaunchCard = (props) => {

  return (
    <div className={styles.root}>
      <img src={props.launchInfo.mission_patch_small} alt="Mission Patch" />
      <span>{props.launchInfo.rocket_name}</span>
      <span>{props.launchInfo.rocket_type}</span>
      <span><Moment format="MM/DD/YYYY">{props.launchInfo.launch_date_utc}</Moment></span>
      <span>{props.launchInfo.details}</span>
      <span>{props.launchInfo.flight_number}</span>
      <a href={props.launchInfo.article_link} target="_blank" rel="noopener noreferrer">
        <LinkIcon width="20px" height="20px"/>
      </a>
    </div>
  )
}

export default LaunchCard