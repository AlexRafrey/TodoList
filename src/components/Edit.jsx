import React, {Component} from 'react';


export default class Edit extends Component{
	state = {
		name: '',
		text: '',
	};
	handleName = (e) =>{
		this.setState({name: e.target.value});
	}
	handleText = (e) =>{
		this.setState({text: e.target.value});
	}
	handleClose = (e) =>{
		document.querySelector('.moded').style.display = 'none';
	}
	send = () =>{
		let check = true;
		//name
		if (this.state.name.trim().length > 1 && this.state.name.trim().length < 25) {
			document.querySelector('.formnameed').style.border = '1px solid rgba(0,0,0,.125)';	
		}else{
			document.querySelector('.formnameed').style.border = '1px solid red';
			check = false;
		}
		//text
		if (this.state.text.trim().length > 1 ) {
			document.querySelector('.formtexted').style.border = '1px solid rgba(0,0,0,.125)';	
		}else{
			document.querySelector('.formtexted').style.border = '1px solid red';
			check = false;
		}
		// name, text, importance, date_need
		if (check) {
			this.props.edit_modal(null, this.state.name, this.state.text);
			document.querySelector('.moded').style.display = 'none';
		}
	}
	
	render() {

		return(
			<div className="moded"  role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Измените данные</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true" onClick={this.handleClose}>&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="form-group col-md-6">
							<label >Имя</label>
							<input type="text" className="form-control formnameed" onChange={this.handleName} placeholder="Название задачи" 
							value={this.state.name}
							/>
						</div>
						<div className="form-group col-md-12">
							<label >Текст задачи</label>
							<input type="text" className="form-control text formtexted" maxLength="88" placeholder="Что хотите сделать" onChange={this.handleText}></input>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={this.send}>Сохранить</button>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

