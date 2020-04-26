import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id);
    }

    onClickDelete = () => {
        this.props.deleteStream(this.props.stream.id);
    };

    renderContent () {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete the stream with title "${this.props.stream.title}"?`;
    }

    renderAction () {
       return (
            <React.Fragment>
            <button onClick={this.onClickDelete} className="ui button primary">Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
       );
    }

    render () {
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    action={this.renderAction()}
                    onDismiss={()=>{history.push("/")}}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};


export default connect(mapStateToProps, { fetchStream, deleteStream } )(StreamDelete);