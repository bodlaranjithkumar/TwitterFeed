import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const User = props => {
    const { name, screenName, profileImageUrl } = props.user;

    return (
        <div>
            <span>
                <Image alt="Person name" src={profileImageUrl} rounded />
                <strong>{name}</strong> @{screenName}
            </span>           
        </div>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        screeName: PropTypes.string,
        profileImageUrl: PropTypes.string
    }).isRequired
}

User.defaultProps = {
    user: {}
}

export default User;