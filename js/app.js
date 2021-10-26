const form = document.getElementById('form-free-trial')
let errors = []

form.addEventListener('submit', onSubmitForm)

function onSubmitForm(e) {
	e.preventDefault()
	const inputs = document.querySelectorAll('input')
	const errorMessage = document.querySelectorAll('.error-message')
	removePrevErrors(errorMessage)
	errors = []
	validateErrors(inputs)
	if (errors.length > 0) {
		for (const error of errors) {
			const div = document.createElement('div')
			const img = document.createElement('img')
			img.src="../images/icon-error.svg"
			div.classList.add('error-message')
			div.innerHTML = `${error.error}`
			div.appendChild(img)
			const inputField =  document.getElementById(`${error.inputId}`)
			const labelContainer = inputField.parentNode
			inputField.classList.add('input-error')
			labelContainer.appendChild(div)
		}
	}
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase)
}

function getFieldNameSplit(field) {
	const inputWords = field.name.split('-')
	let nameField = ''
	for (const word of inputWords) {
		if (word.toLowerCase() !== 'field') {
			const word2 = word.charAt(0).toUpperCase()
			nameField += word2 + word.slice(1) + ' '
		}
	}
	return nameField
}

function validateErrors(inputs) {
	inputs.forEach(input => {
		if (input.value === '' || input === undefined) {
			const nameField = getFieldNameSplit(input)
			errors.push({
				error: `${nameField} cannot be empty`,
				inputId: input.id
			}) 
			return
		}
		if (input.type === 'email') {
			const valid = validateEmail(input.value)
			if (!valid) {
				errors.push({
					error: `Looks like this is not an email`,
					inputId: input.id
				})
			}
		}
	})
}

function removePrevErrors(errorMessage) {
	if (errorMessage.length > 0) {
		for (const error of errors) {
			const inputField = document.getElementById(`${error.inputId}`)
			inputField.classList.remove('input-error')
			const labelContainer = inputField.parentNode
			labelContainer.childNodes.forEach((element, ind) => {
				if (element.tagName === 'DIV') {
					labelContainer.childNodes[ind].remove()
				}
			})
		} 
	}
}