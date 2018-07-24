import React, {Component} from 'react';

export default class View extends Component{
	state = {
		array: '',
	};
	handleAddShow =(e)=>{
		if (e.target.tagName === 'LABEL') {
			document.querySelectorAll('.v').forEach(element => {
				element.classList.remove('active');
			});
			e.target.classList.add('active')
			if (e.target.id === 'vshow') {
				document.querySelector('form').style.display = 'none';
				document.querySelector('.list-group').style.display = 'flex';
			}
			if (e.target.id === 'vadd') {
				document.querySelector('form').style.display = 'block';
				document.querySelector('.list-group').style.display = 'none';
			}
		}

	};
	
	render() {

		return(
			<div className="btn-group btn-group-toggle view" data-toggle="buttons">
				<label className="btn btn-secondary active v " id='vadd' onClick={this.handleAddShow}>
					<input type="radio" name="options"  />Добавить задачу
				</label>
				<label className="btn btn-secondary v " id='vshow' onClick={this.handleAddShow} >
					<input type="radio" name="options"   />Список задач
				</label>
			</div>		
		);
	}
}

