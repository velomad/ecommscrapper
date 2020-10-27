import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {PublicLayout} from "./layouts";
import Loading from "./components/Loading/Loading";
import { WithLayoutRoute } from "./routers";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Routes = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Router>
				<Switch>
					<WithLayoutRoute
						exact
						path="/"
						layout={PublicLayout}
						component={Dashboard}
					/>
					<Route path="*" component={() => "404 NOT FOUND"} />
				</Switch>
			</Router>
		</Suspense>
	);
};

export default Routes;
