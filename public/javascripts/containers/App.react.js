import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//component list
import Landing from "../components/Landing.react";

//action list
import * as index from "../actions/index";

class App extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div className="main">
				<Landing 
					is_auth = {this.props.is_auth}
					auth_action = {this.props.auth_action}
					check_jwt = {this.props.check_jwt}
				/>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		is_auth: state.authReducer.is_auth
	}
}

function mapDispatchToProps(dispatch){
	return {
		auth_action: bindActionCreators(index.oauth_twitter, dispatch),
		check_jwt: bindActionCreators(index.check_jwt, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)