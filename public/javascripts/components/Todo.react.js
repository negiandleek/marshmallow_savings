import React from "react";

class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: this.props.items.value,
			id: this.props.items.id
		}
		this.change_todo = this.change_todo.bind(this);
	}
	change_todo (e) {
		this.setState({
			value: e.target.value 
		});
	}
	render () {
		return (
			<li className="top-page-entory__todos__wrappr__item">
				<input 
					className = "form-input-text"
					type = "text"
					value = {this.state.value}
					onChange = {this.change_todo}
				/>
				<input 
					className = "form-input-btn"
					type = "button"
					value = "変更"
					onClick = {()=> {
						this.props.update_todo(this.state.id, this.state.value,this.props.index)
					}}
				/>
				<input
					className = "form-input-btn"
					type = "button"
					value = "削除"
				/>
			</li>
		)
	}
}

module.exports = Todo;