import React from "react";
import axios from "axios";

function App() {
	const handleMyntraScraping = () => {
		axios
			.get("http://localhost:5000/api/myntra")
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<button onClick={handleMyntraScraping}>Myntra Scraper</button>
		</div>
	);
}

export default App;
