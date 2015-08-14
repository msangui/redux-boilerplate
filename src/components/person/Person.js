import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {requireServerCss} from '../../utils/util';

const styles = __CLIENT__ ? require('./Person.scss') : requireServerCss(require.resolve('./Person.scss'));

export default
class Person extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        occupation: PropTypes.string
    }

    render() {
        const {name, email, occupation} = this.props;
        return (
            <div className={styles.person}>
                <h3>{name}</h3>
                <h4>{email}</h4>
                <span>{occupation}</span>
            </div>
        );
    }
}