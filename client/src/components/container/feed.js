import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFeed } from '../../actions/feed';
import SearchBar from "../searchBar";
import Tweets from '../tweets';

class Feed extends Component {
    componentDidMount() {
        this.props.fetchFeed();
        setInterval(this.fetchFeedInerval,60000);
    }

    constructor(props) {
        super(props);

        this.state = {
            term: ""
        }

        this.setTerm = this.setTerm.bind(this);
        this.fetchFeedInerval = this.fetchFeedInerval.bind(this);
    }

    fetchFeedInerval = () => {
        this.props.fetchFeed();
    }

    setTerm = (term) => {
        this.setState({ term });
    }

    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={this.setTerm} />
                <Tweets
                    tweets={this.props.tweets}
                    user={this.props.user}
                    term={this.state.term} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feed: state.feed,
        tweets: state.feed.tweets,
        user: state.feed.user
    }
}

export default connect(mapStateToProps, {
    fetchFeed
})(Feed);