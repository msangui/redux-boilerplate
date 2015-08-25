import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../../reducers/wiki';
import {connect} from 'react-redux';
import * as wikiActions from '../../actions/wikiActions';
import {load as loadWidgets} from '../../actions/wikiActions';
import {requireServerCss} from '../../utils/util';
import WikiArticle from '../../components/wikiArticle/WikiArticle';

const styles = __CLIENT__ ? require('./Wiki.scss') : requireServerCss(require.resolve('./Wiki.scss'));

class Wiki extends Component {
  static propTypes = {
    wikis: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }

  onReload() {
    return this.props.load('italy');
  }

  render() {
    const {wikis, loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div className={styles.wiki + ' container'}>
        <h1>
          Wiki Extract
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={:: this.onReload}><i className={refreshClassName}/> {' '} Reload Widgets</button>
        </h1>
        {wikis && wikis.length &&
        <div>
          {wikis.map((wiki) => <WikiArticle title={wiki.title} extract={wiki.extract}/>)}
        </div>}
      </div>
    );
  }
}

@connect(state => ({
  wikis: state.wiki.data,
  error: state.wiki.error,
  loading: state.wiki.loading
}))
export default class WikiContainer {
  static propTypes = {
    wikis: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWidgets('madagascar'));
    }
  }

  render() {
    const { wikis, error, loading, dispatch } = this.props;
    return <Wiki wikis={wikis} error={error}
                    loading={loading} {...bindActionCreators(wikiActions, dispatch)}/>;
  }
}
