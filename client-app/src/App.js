import React, { useState } from "react";
import axios from "axios";

function App() {
	const [myntraLoading, setMyntraLoading] = useState(false);
	const [flipkartLoading, setFlipkartLoading] = useState(false);

	const handleMyntraScraping = () => {
		setMyntraLoading(true);

		axios
			.get("/api/myntra")
			.then((resp) => {
				console.log(resp);
				setMyntraLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setMyntraLoading(false);
			});
	};

	const handleFlipkartScraping = () => {
		setFlipkartLoading(true);
		axios
			.get("/api/flipkart")
			.then((resp) => {
				console.log(resp);
				setFlipkartLoading(false);
			})
			.catch((err) => console.log(err));
	};
	
	const handleAjioScraping = () => {
		axios
			.get("/api/ajio")
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<div>
				<button onClick={handleMyntraScraping}>Myntra Scraper</button>
				{myntraLoading && "Loading..."}
			</div>
			<div>
				<button onClick={handleFlipkartScraping}>Flipkart Scraper</button>
				{flipkartLoading && "Loading..."}
			</div>
			<div>
				<button onClick={handleAjioScraping}>Ajio Scraper</button>
			</div>
		</div>
	);
}

export default App;
