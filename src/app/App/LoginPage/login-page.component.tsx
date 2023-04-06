import { PageRoute } from "../../constants";
import loginBackground from "../../assets/backgrounds/login-background.png";
import { TextInput } from "../components/text-input";
import { useState } from "react";
import { useRootSelector } from "../../../domain";
import { AuthenticationSelectors, checkToken } from "../../../state";
import { AuthenticationService } from "../../services";
import { LoadingButton } from "@mui/lab";
import "./login-page.style.scss";
import { HttpStatusCode } from "../../../services";
import { globalNavigate } from "../../utilities/navigation.utilities";
import { I18n } from "../../translation";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useRootSelector(AuthenticationSelectors.isLoadingSelector);

  const authenticationService = new AuthenticationService();

  const login = () => {
    authenticationService.LogIn(username, password).then((httpResult) => {
      if (httpResult?.status === HttpStatusCode.Created) {
        globalNavigate(PageRoute.AboutPage);
      }
    });
  };

  return (
    <div className="page-container">
      <img src={loginBackground} className="login-banner" alt="" />
      <section className="right-content">
        <section className="title">
          <div className="title-name">{I18n.FARMHOME}</div>
          <div className="title-content">{I18n.findAllYourNeeds}</div>
        </section>

        <section className="input">
          <TextInput
            label={I18n.username}
            onChangeText={(e) => setUsername(e?.target?.value)}
          />
          <TextInput
            label={I18n.password}
            onChangeText={(e) => setPassword(e?.target?.value)}
            isHidden={true}
          />
        </section>

        <LoadingButton
          loading={isLoading}
          size="medium"
          variant="contained"
          className="login-button button"
          onClick={() => login()}
        >
          {I18n.login}
        </LoadingButton>
      </section>
    </div>
  );
};
