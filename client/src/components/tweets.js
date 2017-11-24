import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './tweet';
import User from './User'
import { Table, Media } from 'react-bootstrap';

const Tweets = props => {
    if (props.tweets.length <= 0) {
        return <div>Loading... </div>
    }

    const tweetItems = props.tweets
        .filter(tweet => tweet.content.toLowerCase().indexOf(props.term.toLowerCase()) > -1)
        .map(tweet => {
            return (
                <div>
                    <Media>
                        <Media.Left>
                            <User
                                user={props.user}
                                createdDate={tweet.createdDate} />
                        </Media.Left>
                        <Media.Body>
                            <Tweet
                                key={tweet.id}
                                tweet={tweet} />
                        </Media.Body>
                    </Media>
                    <hr />
                </div >
            )
        });

    return (
        <div>
            <ul>
                {tweetItems}
            </ul>
        </div>
    );
}

Tweets.propTypes = {
    tweets: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}

Tweets.defaultProps = {
    tweets: [],
    user: {}
}

export default Tweets;
