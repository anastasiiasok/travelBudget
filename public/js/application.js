// console.log('JS work')
// const seeAllTripsBtn = document.querySelector('#seeAllTripsBtn')
// const liTemplate = document.getElementById('liTemplate').content.textContent
// const liTemplateRender = Handlebars.compile(liTemplate);
// const liConteiner = document.getElementById('list')
// let newHorseForm = document.getElementsByName('addHorseFormName')

// seeAllTripsBtn.addEventListener('click', async (e) => {
//   e.preventDefault()

//   const formData = new FormData(newHorseForm[0])
//     const parseData = Object.fromEntries(formData)
//     let response = await fetch(`http://localhost:3000/newtrip/allTrips`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(parseData)
//     })
//     let data = await response.json() // response.text
//     console.log(data);
//      const renderedTemplate = liTemplateRender(data);
//      liConteiner.insertAdjacentHTML('beforeend', renderedTemplate);
//      newHorseForm[0].reset()
// })



