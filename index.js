function fetchVideos(){
	let url = "https://www.googleapis.com/youtube/v3/search?";
	let key = "AIzaSyBbkhDdmupfwzKqHSqxAKG7UNeLBm7LB80";
	let settings = {
		method : "GET"
	};

	let q = document.getElementById("searchBox").value;
	fetchUrl = url + "key="+key+"&q="+q+"&part=snippet"+"&maxResults=50";
	fetch(fetchUrl, settings)
		.then((response)=>{
			if(response.ok){
				return response.json();
			}

			throw new Error(response.statusText);
		})
		.then((responseJSON)=>{
			displayResults(responseJSON);
		});
}

function displayResults(responseJSON){
	let resultDiv = document.getElementById('result');
	resultDiv.innerHTML = "";
	i=0;
	while(i<10){
		let title = "<div class='results'> <h1> <a href='https://www.youtube.com/watch?v="+responseJSON.items[ctr*10+i].id.videoId+"'>"+responseJSON.items[ctr*10+i].snippet.title+" </a></h1> </div>";
		let thumbnail = "<div class='results'> <a href='https://www.youtube.com/watch?v="+responseJSON.items[ctr*10+i].id.videoId+"'>"+"<img src='" + responseJSON.items[ctr*10+i].snippet.thumbnails.high.url + "' alt='Video thumbnail'/></a></div>"
		resultDiv.innerHTML = resultDiv.innerHTML + thumbnail + title + "<br>";
		console.log();
		i++;
		if((ctr*10+i)==responseJSON.items.length){
			let btns = document.getElementsByTagName('button');
			console.log('finish');
			btns[1].style.display='none';
		} else {
			let btns = document.getElementsByTagName('button');
			btns[1].style.display='inline';
			console.log('more');
		}
	}
}

function watchForm(){
	let form = document.getElementById('textVid');
	let btns = document.getElementsByTagName('button');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		ctr=0;
		btns[0].style.display='none';
		fetchVideos();
	});
	btns[0].addEventListener('click', (event) => {
		if (ctr!==0){
			ctr--;
		}
		if (ctr==0){
			btns[0].style.display='none';
		} else {
			btns[0].style.display='inline';
		}
		event.preventDefault();
		fetchVideos();
		document.documentElement.scrollTop = 0;
	});
	btns[1].addEventListener('click', (event) => {
		ctr++;
		btns[0].style.display='inline';
		event.preventDefault();
		fetchVideos();
		document.documentElement.scrollTop = 0;
	});
}

function init(){
	watchForm();
}

init();
let ctr=0;