import React from "react";

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
		let inputed_new_value = e.target.value;
		this.setState({
			new_todo: inputed_new_value
		});
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
						<ul className="top-page-entory__todos__wrapper">
							<input 
								className="form-input-text"
								type="text"
								value={this.state.new_todo}
								placeholder ="新規タスク"
								onChange={this.change_new_todo}
							/>
							<input 
								className="form-input-btn"
								type="button"
								value="追加"
							/>
							{(()=>{
								if(this.state.todos){
									return this.state.todos.map((items, index)=>{
										return(
											<li className="top-page-entory__todos__wrapper__item" key={"todo-" + index}>
												<input 
													className="form-input-text"
													type="text"
													value={items.value}
												/>
												<input 
													className="form-input-btn"
													type="button"
													value="変更"
												/>
												<input
													className="form-input-btn"
													type="button"
													value="削除"
												/>
											</li>
										)
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