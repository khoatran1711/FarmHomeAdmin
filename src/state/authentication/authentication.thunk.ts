import { AuthenticationSelectors } from "./authentication.selector";
import { AuthenticationActions } from "./authentication.state";
import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../domain/store";
import { JwtService } from "../../services/jwt.service";
import { resetNavigate } from "../../app/utilities/navigation.utilities";

const CHECK_TOKEN_INTERVAL = 30000;

/**
 * Check token valid after interval repeatedly
 */
export const checkToken =
  (
    interval = CHECK_TOKEN_INTERVAL
  ): ThunkAction<void, RootState, void, Action> =>
  (
    dispatch: ThunkDispatch<RootState, void, Action>,
    getState: () => RootState
  ) => {
    const jwtService = new JwtService();

    setTimeout(() => {
      const state = getState();
      const token = AuthenticationSelectors.tokenSelector(state);

      if (!token) {
        dispatch(AuthenticationActions.logOut);
        resetNavigate("/");
      } else {
        const valid = jwtService.validate(token);

        if (valid) {
          dispatch(checkToken());
        } else {
          dispatch(AuthenticationActions.logOut);
          resetNavigate("/");
        }
      }
    }, interval);
  };
