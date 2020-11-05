import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { Button } from "../../components";

const Dashboard = () => {
	const handleClick = async (url) => {
		console.log(url);
		const resp = await axios.get(url);
		console.log(resp);
	};

	return (
		<div>
			<Grid container direction="column" spacing={2}>
				<Grid item>
					<button
						onClick={() => handleClick("/api/amazon")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						Amazon
					</button>
				</Grid>
				<Grid item>
					<button
						onClick={() => handleClick("/api/myntra")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						Myntra
					</button>
				</Grid>
				<Grid item>
					<button
						onClick={() => handleClick("/api/flipkart")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						Flipkart
					</button>
				</Grid>
				<Grid item>
					<button
						onClick={() => handleClick("/api/ajio")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						Ajio
					</button>
				</Grid>
				<Grid item>
					<button
						onClick={() => handleClick("/api/bewakoof")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						Bewakoof
					</button>
				</Grid>
				<Grid item>
					<button
						onClick={() => handleClick("/api/tata")}
						className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 py-2 px-4 rounded w-32"
					>
						TataCliq
					</button>
				</Grid>

				<Grid item>
					<Button size="sm" type="primary" transition={true}>
						test button
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
