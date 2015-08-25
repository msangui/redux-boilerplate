import React, {Component} from 'react';
import {requireServerCss, requireServerImage} from '../../utils/util';

const styles = __CLIENT__ ? require('./Home.scss') : requireServerCss(require.resolve('./Home.scss'));

// require the logo image both from client and server
let logoImage = '';
if (__CLIENT__) {
  logoImage = require('../../../static/logo.jpg');
} else {
  logoImage = requireServerImage('../../../static/logo.jpg');
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.home}>
          <div className="container">
            <div className={styles.logo}>
              <p><img src={logoImage}/></p>
            </div>
            <h1>React Redux Example</h1>
          </div>
        </div>
      </div>
    );
  }
}
