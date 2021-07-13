import { Route, useRouteMatch , Switch , Redirect} from "react-router-dom";
import React from "react";
const FoodSingle = React.lazy(() => import("./FoodSingle"));
const FoodsList = React.lazy(() => import("../../components/FoodsList"));
function FoodIndex() {
  const { path } = useRouteMatch();

  return (
    <>
    <Switch>
      <Route exact path={path}>
        <Redirect to='/foods/cat/all' />
      </Route>
      <Route exact path={`${path}/:id`}>
        <FoodSingle />
      </Route>
      <Route path={`${path}/cat/:id`}>
        <FoodsList />
      </Route>
      </Switch>
    </>
  );
}

export default FoodIndex;
