import { HttpStatusCode, URL_BASE } from "../../services";
import { HttpService } from "../../services";
//import {URL_BASE} from '../../../../Services/url.constant';

import { AuthenticationActions } from "../../state";
import { RootStore, RootStoreType } from "../../domain";
import {
  LoginRequest,
  LoginResponse,
  URL_SIGN_IN,
} from "../models/authentication.model";

export class AuthenticationService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  LogIn(username: string, password: string) {
    const urlRequest = URL_BASE + URL_SIGN_IN;

    const loginRequest = {
      username: username,
      password: password,
    };

    this.store.dispatch(AuthenticationActions.setLoading(true));

    return this.httpService
      .post<LoginRequest, LoginResponse>(urlRequest, loginRequest)
      .then((httpResult) => {
        httpResult?.data?.accessToken &&
          this.store.dispatch(
            AuthenticationActions.logIn(httpResult?.data?.accessToken)
          );

        this.store.dispatch(AuthenticationActions.setLoading(false));
        const status = httpResult.status;

        return { status };
      });
  }

  LogOut() {
    this.store.dispatch(AuthenticationActions.logOut());
  }
}
