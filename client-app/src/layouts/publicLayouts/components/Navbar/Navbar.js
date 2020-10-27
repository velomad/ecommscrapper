import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";
import { primary } from "../../../../constants/colors";

const Navbar = () => {
	return (
		<div>
			<CssBaseline />
			<AppBar style={{ backgroundColor: primary }}>
				<Toolbar>
					<Typography variant="h6">
						ReachNBuy <span style={{ color: "#ff8c00" }}>Scrape Engine</span>
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
		</div>
	);
};

export default Navbar;
