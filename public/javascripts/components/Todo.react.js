import React from "react";

class Todo extends React.Component{
	constructor(props){
		super(props);
		this.showing_todo_changed_true = this.showing_todo_changed_true.bind(this);
		this.showing_todo_changed_false = this.showing_todo_changed_false.bind(this);
	}
	showing_todo_changed_true () {
		this.props.toggle_todo_state(1,this.props.index)
	}
	showing_todo_changed_false () {
		this.props.toggle_todo_state(0,this.props.index)
	}
	render () {
		return (()=>{
			if(!this.props.items.state){
				return(
					<li className="top-page-entory__todos__wrappr__item">
						<input 
							className = "form-input-checkbox"
							type = "checkbox"
							checked = {(()=>{
								if(this.props.items.achieve){
									return "checked"
								}else{
									return "";
								}
							})()}
							onChange = {()=>{
								this.props.achieve_todo(this.props.items.id, this.props.index)
							}}
						/>
						<span
							className="top-page-entory__todos__wrappr__item__content"
							onClick={this.showing_todo_changed_true}
						>
							{this.props.items.value}
						</span>

					</li>
				);
			}else{
				return(
					<li 
						className="top-page-entory__todos__wrappr__item"
						onClick={(e)=>{
							e.stopPropagation();
						}}
					>
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
								this.showing_todo_changed_false();
								this.props.update_todo(this.props.items.id, this.props.items.value,this.props.index)
							}}
						/>
						<input
							className = "form-input-btn"
							type = "button"
							value = "削除"
							onClick = {()=> {
								this.showing_todo_changed_false();
								this.props.delete_todo(this.state.id, this.props.index);
							}}
						/>
					</li>
				);		
			}
		})();
	}
}

module.exports = Todo;