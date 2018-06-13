import React, {Component} from 'react';
import './CityList.css';

export default class CityList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			remove: false,
			keyList: []
		};
		this.removeListElem = this.removeListElem.bind(this)
	}

	removeListElem(e) {
		const array = this.state.keyList
		const index = array.indexOf(e.target.value)
	  array.splice(index, 1);

		this.state.keyList.splice(index, index)
		this.setState({remove: true})
	}

	componentWillMount() {
		this.setState({keyList: this.props.keyList})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({keyList: nextProps.keyList})
	}


	render() {
		const listElemDelete = <div className="cityCardRemove" onClick={this.removeListElem}>x</div>

		let test = this.state.keyList

		const listElem = this.state.keyList.map(function(item, index) {
			return (
				<li className="cityCard" key={index}>
					<p className="cityCardName">{test[index].name}</p>
					<p className="cityCardTemp">{test[index].temp}</p>
					{listElemDelete}
				</li>
				)
		});

		return (

				<ul className="cityList">
					{listElem}
				</ul>
			)
		}
}

