import React from "react";
import ReactDOM from 'react-dom';

import Todo from "./Todo.react";
import ActivedDate from "./ActivedDate.react";

// 0埋め
function date_zello_fill (value) {
	let num = ("0" + value).substr(-2);
	return num;
}

class HomePage extends React.Component{
	constructor(props){
		super(props);
		let local_jwt = localStorage.getItem("marshmallow_jwt");
		this.props.get_doing(local_jwt);

		this.state = {
			new_todo: "",
			new_goal: "",
			is_show_goal: false,
			is_show_new_todo: false,
			is_show_todo: false
		};

		this.change_new_goal = this.change_new_goal.bind(this);
		this.change_new_todo = this.change_new_todo.bind(this);
		this.click_to_add_todo = this.click_to_add_todo.bind(this);
		this.showing_goal_changed_true = this.showing_goal_changed_true.bind(this);
		this.showing_goal_changed_false = this.showing_goal_changed_false.bind(this);
		this.showing_new_todo_changed_false = this.showing_new_todo_changed_false.bind(this);
		this.showing_new_todo_changed_true = this.showing_new_todo_changed_true.bind(this);
		this.toggle_todo_state = this.toggle_todo_state.bind(this);
	}
	change_new_goal (e) {
		this.setState({
			new_goal: e.target.value
		});
	}
	change_new_todo (e) {
		this.setState({
			new_todo: e.target.value
		});
	}
	click_to_add_todo () {
		if(this.state.new_todo){
			let value = ReactDOM.findDOMNode(this.refs.add_todo_value).value;
			this.props.add_todo(this.props.doing_data.goal.id,value);
			this.setState({
				new_todo: ""
			})
		}else{
			alert("入力してください");
		}
	}
	showing_goal_changed_true () {
		if(this.state.is_show_goal)return;

		this.setState({
			is_show_goal: true
		})
	}
	showing_goal_changed_false () {
		if(!this.state.is_show_goal)return;

		this.setState({
			is_show_goal: false
		})
	}
	showing_new_todo_changed_true () {
		if(this.state.is_show_new_todo)return;

		this.setState({
			is_show_new_todo: true
		})
	}
	showing_new_todo_changed_false () {
		if(!this.state.is_show_new_todo)return;

		this.setState({
			is_show_new_todo: false
		})
	}
	toggle_todo_state (boolean, index) {
		if(index !== -1){
			this.props.toggle_todo_state(boolean,index)
			this.setState({
				is_show_todo: true
			})
		}else if(this.state.is_show_todo && index === -1){
			this.props.toggle_todo_state(boolean,index)
			this.setState({
				is_show_todo: false
			})
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.doing_data.goal.id !== nextProps.doing_data.goal.id){
			this.props.get_actived_date(nextProps.doing_data.goal.id);
		};
	}
	render(){
		return(
			<div 
				className="top-page"
				onClick={()=>{
					this.showing_goal_changed_false();
					this.showing_new_todo_changed_false();
					this.toggle_todo_state(0,-1)
				}}>
				<div className="top-page-entory">
					{(()=>{
						if(Object.prototype.toString.call(this.props.doing_data.goal).slice(8, -1) !== "Object"
							|| this.props.doing_data.goal.fetching === true){
							return null;
						}else{
							let num = date_zello_fill(this.props.doing_data.goal.marshmallows_num)
							return (
								<div className="top-page-marshmallow">
									<div className="top-page-marshmallow__wrapper">
										<div className="top-page-marshmallow__wrapper__num">
											{num}
										</div>
										<input 
											className="form-btn"
											type="button" 
											value="nice fight"
											onClick={()=>{
												this.props.incremnet_marshmallows(this.props.doing_data.goal.id)
											}}
										/>
									</div>
								</div>
							)
						}
					})()}
					<div 
						className="top-page-entory-goal" 
						onClick={(e)=>{
							e.stopPropagation();
							this.showing_new_todo_changed_false();
							this.toggle_todo_state(0,-1)
						}}>
						<header className="top-page-entory-goal__header">
							<h2>ゴール</h2>
						</header>
						{(() => {
							if(Object.prototype.toString.call(this.props.doing_data.goal).slice(8, -1) !== "Object"){
								return(
									<div 
										className="top-page-entory-goal__forms" 
										onClick={()=>{
											this.setState({is_show_goal: false});
										}}
									>
										<input 
											className="form-text"
											type="text" 
											value={this.state.new_goal}
											placeholder = "新規目標"
											onChange={this.change_new_goal}
										/>
										<input
											className="form-btn"
											type="button"
											value="追加"
											onClick={()=>{
												this.props.add_goal(this.state.new_goal);
											}}
										/>
									</div>
								);
							}else{
								if(this.props.doing_data.goal.fetching === true
									|| this.props.doing_data.goal.fetching === 1){
									return (
										<div className="top-page-entory-goal__forms">
											<input
												className="form-text"
												type="text" 
												value={this.props.doing_data.goal.value}
											/>
										</div>
									)
								}else if(!this.state.is_show_goal){
									return(
										<div className="top-page-entory-goal__forms">
											<p 
												onClick={()=>{
													this.setState({is_show_goal: true})
												}}
											>
											{this.props.doing_data.goal.value}
											</p>
										</div>
									);
								}else{
									return(
										<div className="top-page-entory-goal__forms">
											<input
												className="form-text"
												type="text" 
												value={this.props.doing_data.goal.value}
												onChange={(e) => {
													this.props.change_goal(e.target.value);
												}}
											/>
											<input
												className="form-btn"
												type="button"
												value="変更"
												onClick = {()=>{
													if(!this.props.doing_data.goal.value){
														alert("goalを入力してください")
													}else{
														this.setState({
															is_show_goal: false
														})
														this.props.update_goal(
															this.props.doing_data.goal.id, 
															this.props.doing_data.goal.value
														);
													}
												}}
											/>
											<input
												className="form-btn"
												type="button"
												value="削除"
												onClick={()=>{
													this.setState({
														is_show_goal: false
													})
													this.props.delete_goal(this.props.doing_data.goal.id)
												}}
											/>
										</div>
									)
								}
							}
						})()}
					</div>
					{(()=>{
						if(Object.prototype.toString.call(this.props.doing_data.goal).slice(8, -1) !== "Object"
							|| this.props.doing_data.goal.fetching === true){
							return null;
						}else{
							return(
								<div 
									className="top-page-entory-todos"
									onClick={(e)=>{
										e.stopPropagation();
										this.showing_goal_changed_false();
										this.toggle_todo_state(0,-1)
									}}>
									<header className="top-page-entory-todos__header">
										<h2>タスク</h2>
									</header>
									{(()=>{
										if(!this.state.is_show_new_todo){
											return(
												<div 
													className="top-page-entory-todos__forms"
													onClick={this.showing_new_todo_changed_true}
												>
													<svg fill="#000000" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
													    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
													    <path d="M0 0h24v24H0z" fill="none"/>
													</svg>
												</div>
											)
										}else{
											return(
												<div className="top-page-entory-todos__forms">
												<input 
													className="form-text"
													type="text"
													value={this.state.new_todo}
													placeholder ="新規タスク"
													ref = "add_todo_value"
													onChange={this.change_new_todo}
												/>
												<input
													className="form-btn"
													type="button"
													value="追加"
													onClick = {()=>{
														this.showing_new_todo_changed_false();
														this.click_to_add_todo();
													}}
												/>
											</div>
											)
										}
									})()}
									<ul 
										className="top-page-entory-todos__list"
										onClick={(e)=>{
											this.showing_goal_changed_false();
											this.showing_new_todo_changed_false();
											e.stopPropagation();
										}}
									>
										{(()=>{
											if(this.props.doing_data.todos instanceof Array){
												return this.props.doing_data.todos.map((items, index)=>{
													if(items.fetching){
														return (
															<li className="top-page-entory-todos__list__item" key={"todo-" + index}>
																<input 
																	className="form-text--fetching"
																	type="text"
																	value={items.value}
																	onChange={() => {}}
																/>
															</li>
														)
													}else{
														return (
															<Todo
																items = {items}
																key = {"todo-key-" + index} 
																index = {index}
																change_todo = {this.props.change_todo}
																update_todo = {this.props.update_todo}
																delete_todo = {this.props.delete_todo}
																achieve_todo = {this.props.achieve_todo}
																toggle_todo_state = {this.toggle_todo_state}
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
							);
						}
					})()}
				</div>
				<div className="actived-date">
					<div className="actived-date__wrapper">
					{(() => {
						if(Object.prototype.toString.call(this.props.doing_data.goal).slice(8, -1) !== "Object"
							|| this.props.doing_data.goal.fetching === true){
							return null;
						}else{
							let goal_data = this.props.doing_data.goal || "";
							let actived_date_list = this.props.actived_date.date || "";
							if(!goal_data.create_date || !actived_date_list){
								return;
							}
							let now = new Date();
							let create_goal_date = new Date(goal_data.create_date);
							let diff = (now.getTime() - create_goal_date.getTime()) / (60 * 60 * 24 * 1000);
							// console.log(create_goal_date,diff);
							// white gray pink
							if(diff <= 91){
								
							}else{
								let datetime = new Date();
								datetime.setDate(datetime.getDate() - 90);
								let day = datetime.getDate();
								let two_digits_day = date_zello_fill(day);
								let month = datetime.getMonth() + 1;
								let two_digits_month = date_zello_fill(month);
								let year = datetime.getFullYear();
								let month_last_day = new Date(year, month, 0);
								let index = 0;
								month_last_day = month_last_day.getDate();

								let date_list = new Array(7);
								for(let i = 0; i <= 6; i +=1){
									date_list[i] = {};
									for(let k = 0; k<=12; k+=1){
										date_list[i][k] = {}
									}
								}

								for(let i = 0; i <= 12; i += 1){
									for(let j = 0; j <= 6; j += 1){
										let date_str = year + "/" + two_digits_month + "/" + two_digits_day;
										date_list[j][i]["date"] = date_str;
										if(this.props.actived_date["date"][index] === date_str){
											index += 1;
											date_list[j][i]["active"] = true;
										}else{
											date_list[j][i]["active"] = false;
										}

										day += 1;
										two_digits_day = date_zello_fill(day);
										
										if(day > month_last_day){
											datetime.setMonth(datetime.getMonth() + 1);
											datetime.setDate(1);
											day = datetime.getDate();
											two_digits_day = date_zello_fill(day);
											month = datetime.getMonth() + 1;
											two_digits_month = date_zello_fill(month);
											year = datetime.getFullYear();
											month_last_day = new Date(year, month, 0);
											month_last_day = month_last_day.getDate();
										}
									}
								}
								return date_list.map((items, index) => {
									return(
										<div className="actived-date__wrapper__row" key={"acitved" + index}>
											{(()=>{
												return Object.keys(items).map((value, _index) => {
													return (
														<ActivedDate
															data_list={items[value]}
															index={_index}
															key={"actived-item"+_index}
														/>
													)});
											})()}
											<div className="clear-float"></div>
										</div>
									)

								});
							}
						}
					})()}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = HomePage;