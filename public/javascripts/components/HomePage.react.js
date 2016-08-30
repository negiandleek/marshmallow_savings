import React from "react";
import ReactDOM from 'react-dom';

import Todo from "./Todo.react";

class HomePage extends React.Component{
	constructor(props){
		super(props);
		let local_jwt = localStorage.getItem("marshmallow_jwt");
		this.props.get_doing(local_jwt);

		this.state = {
			goal: this.props.doing_data.goal || "",
			todos: this.props.doing_data.todos || "",
			new_todo: ""
		};

		this.change_goal = this.change_goal.bind(this);
		this.change_new_todo = this.change_new_todo.bind(this);
		this.click_to_add_todo = this.click_to_add_todo.bind(this);
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			goal: nextProps.doing_data.goal,
			todos: nextProps.doing_data.todos
		});
	}
	change_goal (e) {
		let changed_goal_value = e.target.value;
		this.setState({
			goal: {"value": changed_goal_value}
		});
	} 
	change_new_todo (e) {
		// let inputed_new_value = e.target.value;
		this.setState({
			new_todo: e.target.value
		});
	}
	click_to_add_todo () {
		if(this.state.new_todo){
			let value = ReactDOM.findDOMNode(this.refs.add_todo_value).value;
			this.props.add_todo(this.state.goal.id,value);
			this.setState({
				new_todo: ""
			})
		}else{
			alert("入力してください");
		}
	}
	render(){
		return(
			<div className="top-page">
				<div className=""></div>
				<div className="top-page-entory">
					<div className="top-page-entory__goal">
						<header className="top-page-entory__goal__header">
							<p>ゴール</p>
						</header>
						<input 
							className="form-input-text"
							type="text" 
							value={(() => {
								return this.state.goal.value || ""
							})()}
							placeholder = {(() => {
								if (!this.state.goal.value){
									return "新規目標"
								}else{
									return;
								}
							})()}
							onChange={this.change_goal}
						/>
						<input
							className="form-input-btn"
							type="button"
							value="新規/変更"
						/>
						<input
							className="form-input-btn"
							type="button"
							value="削除"
						/>
					</div>
					<div className="top-page-entory__todos">
						<header className="top-page-entory__todos__header">
							<p>タスク</p>
						</header>
						<div className="top-page-entory__todos__forms">
							<input 
								className="form-input-text"
								type="text"
								value={this.state.new_todo}
								placeholder ="新規タスク"
								ref = "add_todo_value"
								onChange={this.change_new_todo}
							/>
							<input 
								className="form-input-btn"
								type="button"
								value="追加"
								onClick = {this.click_to_add_todo}
							/>
						</div>
						<ul className="top-page-entory__todos__wrapper">
							{(()=>{
								if(this.state.todos instanceof Array){
									return this.state.todos.map((items, index)=>{
										if(items.fetching){
											return (
												<li className="top-page-entory__todos__wrapper__item" key={"todo-" + index}>
													<input 
														className="form-input-text--fetching"
														type="text"
														value={items.value}
													/>
												</li>
											)
										}else{
											return (
												<Todo
													update_todo = {this.props.update_todo}
													items = {items}
													key = {"todo-key-" + index} 
													update_todo = {this.props.update_todo}
													index = {index}
												/>
											)
										}
									});
								}else{
									return "登録されていません"
								}
							})()}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = HomePage;