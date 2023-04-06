import { navigation } from "../App/browser.component";

export const globalNavigate = (path: string, data?: any) => {
  return navigation(path, {
    state: {
      data,
    },
  });
};

export const globalGoBack = () => {
  if (window.history.state && window.history.state.idx > 0) {
    navigation(-1);
  } else {
    navigation("/", { replace: true });
  }
};

export const resetNavigate = (path: string) => {
  return navigation(path, { replace: true });
};
