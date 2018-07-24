import React, {Component} from 'react';
// import { Button } from 'react-bootstrap';

export default class Header extends Component{
	state = {
		time: '',
	};

	componentDidMount  =() =>{
		let tm = new Date();
		let month = (tm.getMonth()+1) < 10 ? 0+''+(tm.getMonth()+1 ): tm.getMonth();
		let time = tm.getFullYear()+'-'+month+'-'+tm.getDate();
		this.setState({time: time});
	};
	render() {

		return(
			<div>
				<div className="alert alert-success" role="alert">
					<h2 className="alert-heading">Task list</h2>
					<hr/>
					<p style={{textAlign: 'center'}}>Сегодня <b>{this.state.time}</b></p>
				</div>
			</div>
		);
	}
}

