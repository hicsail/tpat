import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  open: boolean;
  message: string;
  onDismiss: () => void;
}

export default function PositionedSnackbar(props: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      message={props.message}
      action={
        <Button color="primary" size="small" onClick={props.onDismiss}>
          Go Back
        </Button>
      }
    />
  );
}
