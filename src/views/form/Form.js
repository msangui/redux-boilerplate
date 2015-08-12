import React, {Component, PropTypes} from 'react';
import reduxForm from 'redux-form';
import formValidation from './FormValidation.js';
import {requireServerCss, requireServerImage} from '../../utils/util';

const styles = __CLIENT__ ? require('./Form.scss') : requireServerCss(require.resolve('./Form.scss'));

@reduxForm('form', formValidation)
export default
class Form extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        visited: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
        showAll: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    }

    handleSubmit(event) {
        event.preventDefault();
        const {data, showAll, reset} = this.props;
        const errors = formValidation(data);
        if (Object.keys(errors).some(key => errors[key])) {
            showAll();
            window.alert('Form is invalid!');
        } else {
            window.alert('Data submitted! ' + JSON.stringify(this.props.data));
            reset();
        }
    }

    render() {
        const {
            data: {name, email, occupation},
            errors: {name: nameError, email: emailError, occupation: occupationError},
            visited: {name: nameVisited, email: emailVisited, occupation: occupationVisited},
            handleChange
            } = this.props;
        return (
            <div className={styles.form + ' container'}>
                <form className="form-horizontal" onSubmit={::this.handleSubmit}>
                    <div className={'form-group' + (nameError && nameVisited ? ' has-error' : '')}>
                        <label htmlFor="name" className="col-sm-2">Full Name</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   value={name}
                                   onChange={handleChange('name')}
                                   onBlur={handleChange('name')}/>
                            {nameError && nameVisited && <div className="text-danger">{nameError}</div>}
                        </div>
                    </div>
                    <div className={'form-group' + (emailError && emailVisited ? ' has-error' : '')}>
                        <label htmlFor="email" className="col-sm-2">Email address</label>
                        <div className="col-sm-10">
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   value={email}
                                   onChange={handleChange('email')}
                                   onBlur={handleChange('email')}/>
                            {emailError && emailVisited && <div className="text-danger">{emailError}</div>}
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
                            {occupationError && occupationVisited && <div className="text-danger">{occupationError}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-success" onClick={::this.handleSubmit}>
                                <i className="fa fa-paper-airplane"/> Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

