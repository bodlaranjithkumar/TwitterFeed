import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

class Main extends React.Component {
  render() {
    return (
      <div className="app-root">
        <main>
          <Grid>
            {this.props.children}
          </Grid>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Main);
