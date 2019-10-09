import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

import * as NavigationActions from '../NavigationActions'

class Shortcut extends React.Component {
  onLinkClick = (e)=>{
    this.props.closeShortcut()
  }
  onBackClick = (e)=>{
    e.preventDefault()
    this.props.closeShortcut()
  }
  render() {
    return (
      <Collapse in={this.props.shortcutOpen} mountOnEnter={true} unmountOnExit={true}>
        <div id="shortcut" style={{display: 'block'}}>
          <ul onClick={this.onBackClick}>           
            <li>
              <Link onClick={this.onLinkClick}
                to="/views/profile"
                className="jarvismetro-tile big-cubes selected bg-color-pinkDark"
              >
                <span className="iconbox">
                  <i className="fa fa-user fa-4x" /> <span>My Profile </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Collapse>
    );
  }
}


export default connect(
  store => store.navigation,
  dispatch => bindActionCreators(NavigationActions, dispatch)
)(Shortcut);


