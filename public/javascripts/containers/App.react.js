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
import * as todo from "../actions/todo";
import * as goal from "../actions/goal";
import * as active from "../actions/active";

class App extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div className="root">
				<div className="main">
					{(() => {
						if(this.props.is_auth === true){
							return <HomePage
									{...this.props} 
									// get_doing = {this.props.get_doing}
									// doing_data = {this.props.doing_data}
									// add_todo = {this.props.add_todo}
								/>
						}else{
							return <LandingPage 
								{...this.props}
								// is_auth = {this.props.is_auth}
								// auth_action = {this.props.auth_action}
								// check_jwt = {this.props.check_jwt}
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
		doing_data: state.doingReducer,
		actived_date: state.activeReducer
	}
}

function mapDispatchToProps(dispatch){
	return {
		auth_action: bindActionCreators(index.oauth_twitter, dispatch),
		check_jwt: bindActionCreators(index.check_jwt, dispatch),
		get_doing: bindActionCreators(doing.get_doing, dispatch),
		add_todo: bindActionCreators(todo.add_todo, dispatch),
		update_todo: bindActionCreators(todo.update_todo, dispatch),
		delete_todo: bindActionCreators(todo.delete_todo, dispatch),
		change_todo: bindActionCreators(todo.change_todo, dispatch),
		achieve_todo: bindActionCreators(todo.achieve_todo, dispatch),
		add_goal: bindActionCreators(goal.add_goal, dispatch),
		update_goal: bindActionCreators(goal.update_goal, dispatch),
		delete_goal: bindActionCreators(goal.delete_goal, dispatch),
		change_goal: bindActionCreators(goal.change_goal, dispatch),
		incremnet_marshmallows: bindActionCreators(goal.increment_marshmallows, dispatch),
		get_actived_date: bindActionCreators(active.get_actived_date, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)