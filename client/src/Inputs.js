import React from 'react';
import './App.css';
import FetchBackend from './FetchBackend.js';

class Inputs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activated: new Array()
		}	
		// use bind/apply for functions
	}
	render() {
		return (
		// add sections
			<div className='container'>
				<div className='row'>
					<div id='networkError'>
					</div>
					<div key={1} className='col-sm-6' id='selectCommodity'>
						<h5>Choose a metal</h5>
						<select id='selectedCommodity' className='form-control'>
							<option value='' className='form-control'> -- Select -- </option>
							<option value='GOLD' className='form-control'>Gold</option>
							<option value='SILVER' className='form-control'>Silver</option>
							<option value='IRON' className='form-control'>Iron</option>
						</select>
					</div>
					<div key={2} className='col-sm-6'>
						<h5>Set Metal Prices</h5>
						<h6>Whole numbers only</h6>
						<div>
							<label>
								Gold &nbsp;&nbsp;
							</label>
							<input id='new_gold_price' placeholder='Gold worth in credits' />
						</div>
						<div>
							<label>
								Silver &nbsp;
							</label>
							<input id='new_silver_price' placeholder='Silver worth in credits' />
						</div>
						<div>
							<label>
								Iron &nbsp;&nbsp;&nbsp;
							</label>
							<input id='new_iron_price' placeholder='Iron worth in credits' />
						</div>
						<button onClick={(e) => this.setCommodityPrices(e)} className='btn btn-md btn-primary'>
							Save
						</button>
					</div>
				</div>
				<div className='row'>
					<div key={3} className='col-sm-12'>
						<h5>Choose inputs</h5>
						<div id='errorMessage'></div>
						<button id='GLOB' className='btn btn-lg inputBtn' onClick={(e) => this.activate(e, 'GLOB')}>GLOB</button>
						<button id='PROK' className='btn btn-lg inputBtn' onClick={(e) => this.activate(e, 'PROK')}>PROK</button>
						<button id='PISH' className='btn btn-lg inputBtn' onClick={(e) => this.activate(e, 'PISH')}>PISH</button>
						<button id='TEGJ' className='btn btn-lg inputBtn' onClick={(e) => this.activate(e, 'TEGJ')}>TEGJ</button>
					</div>
					<div key={4} className='col-sm-12'>
						<h5>Chosen Inputs</h5>
						<div id='chosenThingInputs'></div>
					</div>
					<div key={5} className='col-sm-12'>
						<h5>Calculate</h5>
						<button id='calculateOutput' className='btn btn-primary btn-lg' onClick={(e) => this.calculate(e)}>
							Calculate 
						</button>
						<div id='creditOutput'>
						</div> <br/>
						<button className='btn btn-primary btn-lg' onClick={(e) => this.resetSettings(e)}>
							Clear
						</button>
					</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		//
	}
	resetSettings(e) {
		document.getElementById('selectedCommodity').value = ''
		document.getElementById('chosenThingInputs').innerHTML = ''
		document.getElementById(this.state.activated[0]).classList.remove('btn-primary')
		document.getElementById(this.state.activated[1]).classList.remove('btn-primary')
		document.getElementById('creditOutput').innerHTML = ''
		document.getElementById('new_gold_price').value = ''
		document.getElementById('new_silver_price').value = ''
		document.getElementById('new_iron_price').value = ''
		this.state.activated.length = 0
	}
	activate(e, button) {
		if (this.state.activated.length == 2) {
			alert('Sorry, you can only have 2 choices')
		} else {
			document.getElementById(button).classList.add('btn-primary')
			document.getElementById('chosenThingInputs').innerHTML +=	', ' + button
			this.state.activated.push(button) 
		}
	}
	calculate(e) {
		let obj = {
			commodityChosen: document.getElementById('selectedCommodity').value,
			firstValue: this.state.activated[0],
			secondValue: this.state.activated[1]
		}
		FetchBackend('calculate', 'POST', obj)
	}
	setCommodityPrices(e) {
		let newPriceGold = document.getElementById('new_gold_price').value
		,	newPriceSilver = document.getElementById('new_silver_price').value
		,	newPriceIron = document.getElementById('new_iron_price').value
		let obj = {
			newPriceGold: newPriceGold,
			newPriceSilver: newPriceSilver,
			newPriceIron: newPriceIron
		}
		if (newPriceGold % 1 != 0 || newPriceSilver % 1 != 0 || newPriceIron % 1 != 0) {
			alert('Please enter whole numbers for all commodity prices')
		}
		FetchBackend('setcommodityprices', 'POST', obj)
	}
}		

export default Inputs
