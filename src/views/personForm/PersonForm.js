import React, {Component, PropTypes} from 'react';
import reduxForm from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import personFormValidation from './PersonFormValidation.js';
import {requireServerCss, requireServerImage} from '../../utils/util';
import * as peopleActions from '../../actions/peopleActions';

const styles = __CLIENT__ ? require('./PersonForm.scss') : requireServerCss(require.resolve('./PersonForm.scss'));

@reduxForm('personForm', personFormValidation)
class PersonForm extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        dirty: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        initializeForm: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        pristine: PropTypes.bool.isRequired,
        touch: PropTypes.func.isRequired,
        touched: PropTypes.object.isRequired,
        touchAll: PropTypes.func.isRequired,
        untouch: PropTypes.func.isRequired,
        untouchAll: PropTypes.func.isRequired,
        resetForm: PropTypes.func.isRequired,
        resetSavedState: PropTypes.func.isRequired,
        valid: PropTypes.bool.isRequired
    }

    handleSubmit(event) {
        event.preventDefault();
        const {data, touchAll, add, valid} = this.props;
        const errors = personFormValidation(data);
        if (valid && !Object.keys(errors).length) {
            add(data);
        } else {
            touchAll();
        }
    }

    componentWillMount() {
        this.props.resetSavedState();
        this.props.resetForm();
    }

    render() {
        const {
            data: {name, email, occupation},
            errors: {name: nameError, email: emailError, occupation: occupationError},
            touched: {name: nameTouched, email: emailTouched, occupation: occupationTouched},
            handleChange,
            valid
            } = this.props;
        return (
            <div className={styles.personForm}>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className={'form-group' + (nameError && nameTouched ? ' has-error' : '')}>
                        <label htmlFor="name" className="col-sm-2">Full Name</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   value={name}
                                   onChange={handleChange('name')}
                                   onBlur={handleChange('name')}/>
                            {nameError && nameTouched && <div className="text-danger">{nameError}</div>}
                        </div>
                    </div>
                    <div className={'form-group' + (emailError && emailTouched ? ' has-error' : '')}>
                        <label htmlFor="email" className="col-sm-2">Email address</label>
                        <div className="col-sm-10">
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   value={email}
                                   onChange={handleChange('email')}
                                   onBlur={handleChange('email')}/>
                            {emailError && emailTouched && <div className="text-danger">{emailError}</div>}
                        </div>
                    </div>
                    <div className={'form-group' + (occupationError && occupationVisited ? ' has-error' : '')}>
                        <label htmlFor="occupation" className="col-sm-2">Occupation</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   className="form-control"
                                   id="occupation"
                                   value={occupation}
                                   onChange={handleChange('occupation')}
                                   onBlur={handleChange('occupation')}/>
                            {occupationError && occupationTouched && <div className="text-danger">{occupationError}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-success" disabled={!valid} onClick={this.handleSubmit.bind(this)}>
                                <i className="fa fa-paper-airplane"/> Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

@connect(state => ({
    form: state.personForm,
    saved: state.people.saved
}))
export default class PersonFormContainer{
    static contextTypes = {
        router: PropTypes.func.isRequired
    }

    static propTypes = {
        form: PropTypes.object.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        saved: PropTypes.bool.isRequired
    }

    componentDidUpdate() {
        const {saved} = this.props;
        const {router} = this.context;

        if (saved) {
            router.transitionTo('/');
        }
    }

    render() {

        const { dispatch, ...other } = this.props;
        return <PersonForm dispatch={dispatch} {...other} {...bindActionCreators(peopleActions, dispatch)}/>;
    }
}


