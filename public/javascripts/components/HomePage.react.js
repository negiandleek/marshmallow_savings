import React from "react";

class HomePage extends React.Component{
	constructor(props){
		super(props);
		//TODO:jwtを一箇所で管理する
		// local session storageを使うのもあり
		let local_jwt = localStorage.getItem("marshmallow_jwt");
		this.props.get_doing(local_jwt);
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
								return this.props.doing_data.goal.value || "新規追加"
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
								className="form-input-btn"
								type="button"
								value="追加"
							/>
							{(()=>{
								if(this.props.doing_data.todos){
									return this.props.doing_data.todos.map((items, index)=>{
										return(
											<li className="top-page-entory__todos__wrapper__item">{items.value}</li>
										)
									});
								}else{
									return "まだ"
								}
							})()};
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = HomePage;