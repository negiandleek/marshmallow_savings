import React from "react";

class Landing extends React.Component{
	constructor(props){
		super(props);
		// this.auth_action = this.auth_action.bind(this);
		this.auto_auth();
		this.state = {
			style: {
				height: window.innerHeight
			}
		}
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
				<div className="landing-hero" style={this.state.style}>
					<header className="landing-header">
						<h1>マシュマロ貯金</h1>
						<p>昨日に比べてより良くなったかどうかを管理するシンプルなサービスです</p>
					</header>
					<div className="landing-hero__wrapper">
						<div className="landing-symbol">
							<figure className="landing-simbol__icon">
							</figure>
						</div>
						<div className="landing-entory">
							<input 
								className="form-btn-sign"
								type="button" 
								value="twitterでサインイン/サインアップ" 
								onClick={this.props.auth_action.bind(this)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Landing;