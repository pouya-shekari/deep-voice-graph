import { Component } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/routes.config";
import { History } from "../history/History.component";
import { DEFAULT_PROPS, PROP_TYPES } from "./privateRoute.config";
import { IS_LOGGED_IN } from "../../../config/variables.config";

const TargetPage = ({ Component }) => {
  if (!localStorage.getItem(IS_LOGGED_IN)) {
    return <Navigate replace to={PATHS.HOME} />;
  }

  return (
    <History
      onRender={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

class PrivateRoute extends Component {
  render() {
    const { component } = this.props;

    return <TargetPage Component={component} />;
  }
}

PrivateRoute.defaultProps = DEFAULT_PROPS;
PrivateRoute.propTypes = PROP_TYPES;

export { PrivateRoute };
