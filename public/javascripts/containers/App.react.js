import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//component list
import LandingPage from "../components/LandingPage.react";
import HomePage from "../components/HomePage.react";

//action list
import * as index from "../actions/index";
import * as doing from "../actions/doing";
class App extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div className="root">
				<div className="main">
					{(() => {
						if(this.props.is_auth){
							return <HomePage 
									get_doing = {this.props.get_doing}
									doing_data = {this.props.doing_data}
								/>
						}else{
							return <LandingPage 
								is_auth = {this.props.is_auth}
								auth_action = {this.props.auth_action}
								check_jwt = {this.props.check_jwt}
							/>
						}
					})()}
				</div>
			</div>
		);
	}
}

// stateは本来一つのはずなのでそこら辺について調べる
function mapStateToProps(state){
	return {
		is_auth: state.authReducer.is_auth,
		doing_data: state.doingReducer
	}
}

function mapDispatchToProps(dispatch){
	return {
		auth_action: bindActionCreators(index.oauth_twitter, dispatch),
		check_jwt: bindActionCreators(index.check_jwt, dispatch),
		get_doing: bindActionCreators(doing.get_doing, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)