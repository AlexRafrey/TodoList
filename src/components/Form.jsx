import React, {Component} from 'react';

export default class Form extends Component{
	state = {
		name: '',
		important: 'usual',
		date: '',
		text: '',
	};
	handleName = (e) =>{
		this.setState({name: e.target.value});
	}
	handleImportant = (e) =>{
		this.setState({important: e.target.value});
	}
	handleDate = (e) =>{
		this.setState({date: e.target.value});
	}
	handleText = (e) =>{
		this.setState({text: e.target.value});
	}
	send = () =>{
		let check = true;
		//name
		if (this.state.name.trim().length > 1 && this.state.name.trim().length < 25) {
			document.querySelector('.formname').style.border = '1px solid rgba(0,0,0,.125)';	
		}else{
			document.querySelector('.formname').style.border = '1px solid red';
			check = false;
		}
		// formdate
		let re_date = /^(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})$/.test(this.state.date) ;
		if (re_date && this.time_c() < this.state.date) {
			document.querySelector('.formdate').style.border = '1px solid rgba(0,0,0,.125)';	
		}else{
			document.querySelector('.formdate').style.border = '1px solid red';
			check = false;
		}
		// formdate
		if (this.state.text.trim().length > 1) {
			document.querySelector('.formtext').style.border = '1px solid rgba(0,0,0,.125)';	
		}else{
			document.querySelector('.formtext').style.border = '1px solid red';
			check = false;
		}
		console.log(check);
		// name, text, importance, date_need
		if (check) {
			this.props.addPoin(this.state.name, this.state.text, this.state.important, this.state.date);
			let form = document.querySelector('form');
			form.style.border = '2px solid #28a745';
			setTimeout(()=>{
				form.style.border = '2px solid #fff';
			}, 2000);
		}
	}
	time_c =() =>{
		let tm = new Date();
		let month = (tm.getMonth()+1) < 10 ? 0+''+(tm.getMonth()+1 ): tm.getMonth();
		let time = tm.getFullYear()+'-'+month+'-'+tm.getDate()+' '+tm.getHours()+':'+tm.getMinutes();
		return time;
	};
	
	render() {

		return(
			<form >
			<div className="form-top">
				<div className="form-group col-md-6">
					<label >Имя</label>
					<input type="text" className="form-control formname" onChange={this.handleName} placeholder="Название задачи" 
					value={this.state.name}
					/>
				</div>
				<div className="form-group col-md-6 ">
					<label >Важность</label>
					<select id="inputState" className="form-control formimpot" onChange={this.handleImportant} >
						<option value='usual'>Обычная</option>
						<option value='important'>Важная</option>
						<option value='very_important'>Очень важная</option>
					</select>
				</div>
			</div>
			<div className="form-top">
				<div className="form-group col-md-12">
					<label >Дата окончания задачи</label>
					<input type="text" className="form-control formdate"  placeholder="2018-07-23 15:00" onChange={this.handleDate} />
				</div>
			</div>	
			<div className="form-group col-md-12">
				<label >Текст задачи</label>
				<input type="text" className="form-control text formtext" maxLength="88" placeholder="Что хотите сделать" onChange={this.handleText}></input>
			</div>
			<div className="form-groupp col-4">
				<button type="button" className="btn btn-secondary" onClick={this.send}>Добавить</button>
			</div>	
			</form>		
		);
	}
}

