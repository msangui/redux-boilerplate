import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createTransitionHook} from '../../config/universalRouter';
import {requireServerCss} from '../../utils/util';
import CounterButton from '../../components/counterButton/CounterButton';

const styles = __CLIENT__ ? require('./App.scss') : requireServerCss(require.resolve('./App.scss'));

export default
class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    return (
      <div className={styles ? styles.app : ''}>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              React Redux Example
            </Link>
            <ul className="nav navbar-nav">
              <li><Link to="/wiki">Wiki</Link></li>
              <li><Link to="/form">Form</Link></li>
              <li><CounterButton/></li>
              <li>Hello World!</li>
            </ul>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
