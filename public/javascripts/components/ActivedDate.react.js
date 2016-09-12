import React from "react";

class Actived_date extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show: false
		}
		this.mouse_over_actived_date = this.mouse_over_actived_date.bind(this);
		this.mouse_out_actived_date = this.mouse_out_actived_date.bind(this);
	}
	mouse_over_actived_date(e){
		this.setState({
			show: true
		});
	}
	mouse_out_actived_date(e){
		this.setState({
			show: false
		});
	}
	render(){
		return(
			<div
				className={(()=>{
					if(this.props.data_list["active"]){
						return "actived-date__row__item actived-date__row__item--actived"
					}else{
						return "actived-date__row__item"
					}
				})()}
				onMouseOver={this.mouse_over_actived_date}
				onMouseOut={this.mouse_out_actived_date}
				key={"actived-item" + this.props.index}
			>
				<div 
					className={(()=>{
						if(this.state.show){
							return "actived-date__row__item__overlay";
						}else{
							return "actived-date__row__item__overlay hide"
						}
					})()}
					key={"actived-item-overlay" + this.props.index}
				>
					{this.props.data_list["date"]}
				</div>
			</div>
		);
	}
}

module.exports = Actived_date;