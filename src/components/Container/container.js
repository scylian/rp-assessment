import React, { Component } from 'react';
import styles from './container.module.scss';
import axios from 'axios';

import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';

// Components
import Checkbox from '../Checkbox/checkbox';
import LaunchTable from '../Launch/launchTable';

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxes: {
        land: false,
        reused: false,
        reddit: false,
      },
      launches: []
    }
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    axios.get(`https://api.spacexdata.com/v2/launches`)
      .then(res => {
        let launches = res.data;

        // Map out needed data
        launches = launches.map(launch => {
          let land_success = false;
          let reused = false;
          let reddit = false;

          launch.rocket.first_stage.cores.forEach(core => {
            if (core.land_success) {
              land_success = true;
            }
          });

          for (var i in launch.reuse) {
            if (launch.reuse[i]) {
              reused = true;
            }
          }

          for (var j in launch.links) {
            const filter = /reddit_/;

            if (filter.test(j)) {
              if (launch.links[j] !== null) {
                reddit = true;
              }
            }
          }
          
          const formatted = {
            flight_number: launch.flight_number,
            mission_patch_small: launch.links.mission_patch_small,
            rocket_name: launch.rocket.rocket_name,
            rocket_type: launch.rocket.rocket_type,
            launch_date_utc: launch.launch_date_utc,
            details: launch.details,
            article_link: launch.links.article_link,
            land_success: land_success,
            reused: reused,
            reddit: reddit,
          }

          return formatted;
        });

        this.setState({ launches });
      })
  }

  updateCheckbox = (name, value) => {
    let prevState = {...this.state.checkboxes}
    prevState[name] = value;
    this.setState({ checkboxes: prevState });
  }

  filterLaunches = () => {
    let launches = this.state.launches;
    if (this.state.checkboxes.land) {
      launches = launches.filter(launch => launch.land_success === true)
    }
    if (this.state.checkboxes.reused) {
      launches = launches.filter(launch => launch.reused === true)
    }
    if (this.state.checkboxes.reddit) {
      launches = launches.filter(launch => launch.reddit === true)
    }

    return launches;
  }

  render() {
    const launches = this.filterLaunches();

    return (
      <div>
        <div className={styles.root}>

          <div className={styles.bar}>
            <div className={styles.refresh}>
              <RefreshIcon className={styles.refreshIcon} fill="#eee" width="20px" onClick={this.callApi}/>
            </div>
            <div className={styles.checkboxes}>
              <Checkbox label="LAND SUCCESS" name="land" checked={this.state.checkboxes.land} updateCheckbox={this.updateCheckbox} />
              <Checkbox label="REUSED" name="reused" checked={this.state.checkboxes.reused} updateCheckbox={this.updateCheckbox} />
              <Checkbox label="WITH REDDIT" name="reddit" checked={this.state.checkboxes.reddit} updateCheckbox={this.updateCheckbox} />
            </div>
          </div>
          
          <LaunchTable launches={launches} />

        </div>
      </div>
    )
  }
}

export default Container;