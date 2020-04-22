import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderError = ({ error, touched}) => {
        if( error && touched ){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, meta, label }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    onFormSubmit = (formValues) => {
        console.log(formValues);
    }

    render () {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
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
    form: 'streamCreate',
    validate
})(StreamCreate);