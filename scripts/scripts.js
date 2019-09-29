const forecastContainer = document.getElementById('forecastContainer');
const apiKey = 'b6b23c1382933bcf5a91c43be9dc3247';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const inputField = document.getElementById('inputField');

const buildHTML = (data) => {
	forecastContainer.innerHTML = '';
	
	const html = `
		<div class="forescast">
			<p>Weather in: ${data.location.name}, ${data.location.country}</p>
			<p>Current temperature: ${data.current.temperature} <sup>o</sup>C</p>
			<p>Feels like: ${data.current.feelslike} <sup>o</sup>C</p>
			<p>Description: ${data.current.weather_descriptions}</p>
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
			console.log(response.statusText)
			const data = await response.json()
			buildHTML(data);
		} else if(!response.ok) {
			throw Error("OOOpppps");
		}
	} catch(err) {
		forecastContainer.innerHTML = "<h2>Looks like this location doesn't exist...<h2>";
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