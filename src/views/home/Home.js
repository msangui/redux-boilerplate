import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {requireServerCss, requireServerImage} from '../../utils/util';
import Person from '../../components/person/Person';

const styles = __CLIENT__ ? require('./Home.scss') : requireServerCss(require.resolve('./Home.scss'));

// require the logo image both from client and server
let logoImage = '';
if (__CLIENT__) {
    logoImage = require('../../../static/logo.jpg');
} else {
    logoImage = requireServerImage('../../../static/logo.jpg');
}

class Home extends Component {

    render() {
        const { people } = this.props;

        return (
            <div className={styles.home}>
                <header>
                    <h1 class="h1">React Redux Example</h1>
                </header>
                <section className={styles.logo}>
                    <img src={logoImage}/>
                    <h1>Person List</h1>
                    <ul>
                        {people.map((person) => <li>
                            <Person {...person} />
                        </li>)}
                    </ul>
                </section>
            </div>
        );
    }
}


@connect(state => ({
    people: state.people.data
}))
export default
class HomeContainer {
    static propTypes = {
        people: PropTypes.array
    }

    render () {
        const { people } = this.props;
        return <Home people={people} />;
    }
}
