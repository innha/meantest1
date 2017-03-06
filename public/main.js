var update = document.getElementById('update')

console.log('update')

update.addEventListener('click', function() {
	//send PUT request here
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'Innocent',
			'quote': 'Haaaaa! Marvelous!'
		})
	})
	.then(res => {
		if(res.ok) return res.json()
	})
	.then(data => {
		console.log(data)
		window.location.reload(true)
	})
})

var del = document.getElementById('delete')

del.addEventListener('click', function() {
	fetch('quotes', {
		method: 'delete',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'Innocent'
		})
	})
	.then(res => {
		if(res.ok) return res.json()
	})
	.then(data => {
		console.log(data)
		window.location.reload()
	})
})