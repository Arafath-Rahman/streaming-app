import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null }

    componentDidMount () {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: '142747915990-r99cpbnv85lk8vuhtj07vmjoqddjaffv.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get() 
        });
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton () {
        if (this.state.isSignedIn === null ) {
            return (
                <div className="ui active centered inline loader"></div>
            );
        } else if( this.state.isSignedIn ) {
            return (
                <button onClick={this.onSignOut} className="ui green google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignIn} className="ui green google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
        
    }

    render () {
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

export default GoogleAuth;