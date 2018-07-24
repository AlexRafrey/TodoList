import React, {Component} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import View from './components/View';
import Edit from './components/Edit';



let json = [
	{id: 1, name: 'Shop', text: 'I want to go to the shop and buy 3 laptops at a discount', importance: 'usual', date_need: '2018-08-23 19:00', date_done: '0'},
	{id: 2, name: 'Заплатить аренду', text: 'Нужно не забыть заплатить аренду за квартируt', importance: 'important', date_need: '2018-08-21 11:00', date_done: '0'},
	{id: 3, name: 'Поздравить гёрлфренд', text: 'годовщина через день, подготовь что то..', importance: 'very_important', date_need: '2018-07-23 11:00', done: '2'},
];

if (localStorage['items'] ) {
	let parse_data = JSON.parse(localStorage.getItem('items'));
	json = parse_data;
}
export default class App extends Component{
	
	state = {
		data: json,
		show: 'all',
		name: '',
		text: '',
		id: '',
	}


	addPoin=(name, text, importance, date_need)=>{
		let id = this.state.data[this.state.data.length - 1]['id']+1;
		let obj = {id: id, name: name, text: text, importance: importance, date_need: date_need, date_done: ''};
		console.log(obj);
		console.log('id" '+ id);
		let new_array = this.state.data;
		new_array.push(obj);
		this.setState({data: new_array});
		id++;
	}
	filterList=(e)=>{
		this.setState({show: e.target.id});
	}
	delete_item=(id, e)=>{
		this.state.data.splice(id-1, 1);
		this.setState({data: this.state.data});
	}
	
	handleName = (e) =>{
		this.setState({name: e.target.value});
	}
	handleText = (e) =>{
		this.setState({text: e.target.value});
	}
	handleClose = (e) =>{
		document.querySelector('.moded').style.display = 'none';
	}
	show_item =(id) =>{
		this.setState({id: id});
		document.querySelector('.moded').style.display = 'block';
	}
	done_item =(id, e) =>{
		let new_done = this.state.data[id -1];
		console.log(this.state.data[id -1 ]);
		if (new_done['done'] != '2') {
			new_done['done'] = '1' ;
			e.target.parentElement.parentElement.classList.add('done');
		}
	}
	edit_item = () =>{
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
		
		if (check) {
			document.querySelector('.moded').style.display = 'none';

			let id = this.state.id -1;
			let new_array = this.state.data[id];  
			let array = this.state.data;
			new_array['name'] = this.state.name; 
			new_array['text'] = this.state.text;
			array.splice(id, 1, new_array);
			this.setState({data: array});
		}
	}
	componentDidMount  =() =>{
		let tm = new Date();
		let month = (tm.getMonth()+1) < 10 ? 0+''+(tm.getMonth()+1 ): tm.getMonth();
		let time = tm.getFullYear()+'-'+month+'-'+tm.getDate()+' '+tm.getHours()+':'+tm.getMinutes();
		let all = document.querySelectorAll('.time');
		all.forEach(element => {
			if (element.innerHTML < time) element.parentElement.classList.add('list_war');
		});

		let small = document.querySelectorAll('small');
		small.forEach(element => {
			if (element.innerHTML === 'important') element.classList.add('important_el');
			if (element.innerHTML === 'very_important') element.classList.add('very_important_el');
		});
	};
	componentDidUpdate = () =>{
		let small = document.querySelectorAll('small');
		small.forEach(element => {
			if (element.innerHTML === 'important') element.classList.add('important_el');
			if (element.innerHTML === 'very_important') element.classList.add('very_important_el');
		});

			localStorage.clear()
			localStorage.setItem('items', JSON.stringify(this.state.data));
			console.log(localStorage);
		
	}
	render(){	
		const list = this.state.data.map((item, index)=>{
			if(this.state.show === item['importance'] || this.state.show === 'all'){
				return <div key={item['id']} className="list-group-item list-group-item-action flex-column align-items-start ">
				<h1 className='time'>{item['date_need']}</h1>
				<div className="edit">
					<i className="fas fa-check" onClick={(e)=>this.done_item(item['id'], e)}></i>
					<i className="fas fa-pencil-alt"  onClick={()=>this.show_item(item['id'])}></i>
					<i className="fas fa-times" onClick={(e)=>this.delete_item(item['id'], e)}></i>
				</div>
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">{item['name']}</h5>
						<small className='imp'>{item['importance']}</small>
					</div>
					<p className="mb-1">{item['text']}</p>
				</div>
			}
			
		})
		return(
			<div className="app">
				<Header></Header>	
				
				
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
						<button type="button" className="btn btn-primary" onClick={this.edit_item}>Сохранить</button>
					</div>
					</div>
				</div>
			</div>



				<View></View>
				<Form addPoin={(this.addPoin)}></Form>
				<div className="list-group">
					<div className="choose">
						<button type="button" className="btn btn-info" id='all' onClick={this.filterList}>Все</button>
						<button type="button" className="btn btn-secondary" id='usual' onClick={this.filterList}>Обычные</button>
						<button type="button" className="btn btn-success" id='important' onClick={this.filterList}>Важные</button>
						<button type="button" className="btn btn-warning" id='very_important' onClick={this.filterList}>Очень важные</button>
					</div>
					{list}
				</div>
			</div>		
			
		);
	}
}
