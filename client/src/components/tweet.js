import React from 'react';
import PropTypes from 'prop-types';
import { Table, Glyphicon, Image, Grid, Row, Col } from 'react-bootstrap';
import renderHtml from 'react-render-html';
import reactHtmlParser from 'react-html-parser';
import ReactAutoLinker from 'react-autolinker';
import { dateTimeFormatter } from '../libs/common';

const Tweet = props => {
    const { id, createdDate, content, retweetCount, images } = props.tweet;

    const contentImages = images !== null ? images.map(image => {
        return (
            <div>
                <Image alt="Media name" src={image} responsive />
            </div>
        )
    }) : <div> </div>;

    return (
        <Grid>
            <Row>
                <Col md={8}>
                    <ReactAutoLinker text={content} />
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    {contentImages}
                </Col>
            </Row>
            <Row className="footer">
                <div className="footer-item">
                    <Glyphicon glyph="retweet" /> {retweetCount}
                </div>
                <div className="footer-item">
                    {dateTimeFormatter(createdDate)}
                </div>
            </Row>
        </Grid >
    );
}

Tweet.propTypes = {
    tweet: PropTypes.shape({
        id: PropTypes.number,
        createdDate: PropTypes.string,
        content: PropTypes.string,
        retweetCount: PropTypes.number,
        images: PropTypes.array
    }).isRequired
}

Tweet.defaultProps = {
    tweet: {
        images: []
    }
}

export default Tweet;