const FetchBackend = (endpoint, methodForEndpoint, object) => {
	fetch('http://localhost:8080/'+endpoint, {
		method: methodForEndpoint,
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(object)
	})
	.then(res => {
		return res.json()
	})
	.then(res => {
		if (endpoint == 'calculate') {
			document.getElementById('creditOutput').innerHTML = 'Credit output is: '+res.credit
		}
	})
	// handle network error
	.catch(err => {
		document.getElementById('networkError').style.display = 'block'
		document.getElementById('networkError').innerHTML = err
	})
}

export default FetchBackend
