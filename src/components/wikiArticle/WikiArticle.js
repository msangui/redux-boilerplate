import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {requireServerCss} from '../../utils/util';

const styles = __CLIENT__ ? require('./WikiArticle.scss') : requireServerCss(require.resolve('./WikiArticle.scss'));

export default
class WikiArticle extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        extract: PropTypes.string.isRequired
    }

    render() {
        const {title, extract} = this.props;
        return (
            <div className={styles.wikiArticle}>
                <div className="container">
                    <h2>{title}</h2>
                    <p>{extract}</p>
                </div>
            </div>
        );
    }
}