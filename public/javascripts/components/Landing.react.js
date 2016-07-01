import React from "react";

class Landing extends React.Component{
	constructor(props){
		super(props);
		this.auth_action = this.auth_action.bind(this);
	}
	auth_action(){
		this.props.auth_action();
	}
	render(){
		return(
			<div className="landing">
				<div className="landing-symbol">
					<figure className="landing-simbol__item">
					</figure>
				</div>
				<div className="landing-entory">
					<div className="landing-entory__sign-btn">
						<input 
							className="form-sign-btn"
							type="button" 
							value="サインイン/サインアップ" 
							onClick={this.auth_action}
						/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Landing;