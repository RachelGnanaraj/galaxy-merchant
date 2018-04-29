const createError = require('http-errors')
,	express = require('express')
,	bodyParser = require('body-parser')
,	logger = require('morgan')
, cors = require('cors')
,	app = express()

let PRICE_GOLD = 0,
	PRICE_SILVER = 0,
	PRICE_IRON = 0

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// endpoint that gets POST data from React app. sends back a JSON with result
app.post('/calculate', (req, res, next) => {
	// roman values
	const GLOB = 1
	,	PROK = 5
	,	PISH = 10
	,	TEGJ = 50
	// credits required for transactions
	let credits = new Number()
	// set variables for params from request
	let firstValue = req.body.firstValue
	,	secondValue = req.body.secondValue
	, commodityChosen = req.body.commodityChosen
	switch (commodityChosen) {
		case 'GOLD':
			commodityChosen = PRICE_GOLD
			break
		case 'SILVER':
			commodityChosen = PRICE_SILVER
			break
		case 'IRON':
			commodityChosen = PRICE_IRON
			break
	}
	console.log(PRICE_GOLD)
	console.log(PRICE_SILVER)
	console.log(PRICE_IRON)
	console.log(commodityChosen)
	switch (firstValue) {
		case 'GLOB':
			firstValue = GLOB
			break
		case 'PROK':
			firstValue = PROK
			break
		case 'PISH':
			firstValue = PISH
			break
		case 'TEGJ':
			firstValue = TEGJ
			break
	}
	switch (secondValue) {
		case 'GLOB':
			secondValue = GLOB
			break
		case 'PROK':
			secondValue = PROK
			break
		case 'PISH':
			secondValue = PISH
			break
		case 'TEGJ':
			secondValue = TEGJ
			break
	}
	credits = firstValue + secondValue + commodityChosen
	// send back JSON object to client with result
  res.send({success: true, credit:credits})
})

// POST endpoint to update price data for gold, silver and iron
app.post('/setcommodityprices', function (req, res, next) {
	PRICE_GOLD = req.body.newPriceGold
	PRICE_SILVER = req.body.newPriceSilver
	PRICE_IRON = req.body.newPriceIron
	res.send({success: true})	
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app
