import { Button } from "@mui/material";
import { Colors } from "../../../constants";

export const RoundButton = () => {
  return (
    <>
      <Button
        variant="contained"
        style={{ background: Colors.Solitaire, color: Colors.TimberGreen }}
      >
        Login
      </Button>
    </>
  );
};
