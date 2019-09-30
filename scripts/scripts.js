const forecastContainer = document.getElementById('forecastContainer');
const apiKey = 'b6b23c1382933bcf5a91c43be9dc3247';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const inputField = document.getElementById('inputField');

const buildHTML = (data) => {
	forecastContainer.innerHTML = '';
	
	const html = `
		<div class="forecast">
			<p>Location: ${data.location.name}, ${data.location.country}</p>
			<p>Current temperature: ${data.current.temperature} <sup>o</sup>C</p>
			<p>Feels like: ${data.current.feelslike} <sup>o</sup>C</p>
			<p>Humidity: ${data.current.humidity}%</p>
			<p>Current conditions: ${data.current.weather_descriptions}</p>
			<div><img src="${data.current.weather_icons}" /></div>
			<p>Local date and time: ${data.location.localtime}</p>
		</div>
	`
	forecastContainer.innerHTML = html;
	inputField.value = '';
}

const fetchData = async() => {
	try {
		const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${inputField.value}`)
		if(response.ok) {
			const data = await response.json()
			console.log(data)
			buildHTML(data);
		} else if(!response.ok) {
			throw Error("OOOpppps");
		}
	} catch(err) {
		forecastContainer.innerHTML = `<h2 id="errorMessage">Looks like this location doesn't exist...<h2>`;
		inputField.value = '';
		console.warn(err);
	}	
}

getWeatherBtn.addEventListener('click', () => {
	if(inputField.value !== '') {
		fetchData();
	}
})

inputField.addEventListener('keypress', (event) => {
	if(inputField.value !== '' && event.keyCode === 13) {
		fetchData();
	}
})
