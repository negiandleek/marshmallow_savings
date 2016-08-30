import React from "react";

class Landing extends React.Component{
	constructor(props){
		super(props);
		// this.auth_action = this.auth_action.bind(this);
		this.auto_auth();
	}
	auto_auth () {
		let url = window.location.search;
		let reg = /(\?jwt=){1}/;

		if(reg.test(url)){
			let _url = url.slice(1);
			let split_url = _url.split("=");
			let jwt = split_url[1];
			
			localStorage.setItem("marshmallow_jwt", jwt);
			this.props.check_jwt(jwt);
		}else{
			try{
				let local_data = localStorage.getItem("marshmallow_jwt");
				this.props.check_jwt(local_data);
			}catch (err) {
				console.error(err)
			}
		}
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
							onClick={this.props.auth_action.bind(this)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Landing;