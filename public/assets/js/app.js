console.log('just my files')
const w_form = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.querySelector('#mess_1')
const messTwo = document.querySelector('#mess_2')

w_form.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messOne.textContent = 'Loading..'
  messTwo.textContent = ''
  fetch('http://localhost:3002/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messOne.textContent = data.error
      } else {

        messTwo.textContent = data.forecast + data.location

      }
    })
  })
})