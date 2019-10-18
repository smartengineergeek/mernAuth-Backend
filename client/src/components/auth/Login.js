import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push("/dashboard");
            // push user to dashboard when they login
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        // console.log(userData);
        this.props.loginUser(userData);
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="container">
                <div style={{marginTop: "4rem"}} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                         <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
                <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                })}
                />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
                <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                />
                <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Login
                </button>
            </div>
            </form>
                </div>
            </div>
        )
    }
}

export default Login;