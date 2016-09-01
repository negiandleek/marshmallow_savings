import React from "react";

class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: this.props.items.value,
			id: this.props.items.id
		}
	}
	render () {
		return (
			<li className="top-page-entory__todos__wrappr__item">
				<input 
					className = "form-input-text"
					type = "text"
					value = {this.props.items.value}
					onChange = {(e) => {
						this.props.change_todo(e.target.value, this.props.index);
					}}

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
					onClick = {()=> {
						this.props.delete_todo(this.state.id, this.props.index);
					}}
				/>
			</li>
		)
	}
}

module.exports = Todo;