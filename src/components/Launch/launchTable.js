import React from 'react';

// Components
import LaunchHeader from './launchHeader';
import LaunchCard from './launchCard';

const LaunchTable = (props) => {
  return (
    <React.Fragment>
      <LaunchHeader />
      { props.launches.map(( launch, index ) => <LaunchCard key={index} launchInfo={launch} />)}
    </React.Fragment>
  )
}

export default LaunchTable