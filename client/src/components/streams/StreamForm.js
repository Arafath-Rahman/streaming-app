import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError = ({ error, touched}) => {
        if( error && touched ){
            return (
                <div className="ui red mini message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, meta, label }) => {
        const className= `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render () {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter a Title"/>
                <Field name="description" component={this.renderInput} label="Enter a Description"/>
                <button className="ui button primary">Submit</button>
            </form>

        );
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title)  {
        errors.title = 'Please Enter a Title.';
    }

    if (!formValues.description) {
        errors.description = 'Please Enter a Description.';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);