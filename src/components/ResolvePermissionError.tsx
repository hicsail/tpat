import { Stack, Button, Typography, Link } from "@mui/material";
import { GOOGLE_FORM_URL } from "../config/config";

function ResolvePermissionError() {
  return (
    <Stack spacing={3}>
      <Button
        variant="contained"
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh and retake
      </Button>
      <Typography>
        Check out the following resources to resolve permission issues you may
        be having;{" "}
      </Typography>
      <Stack spacing={1}>
        <Link
          variant="body2"
          href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop&oco=0"
          target="_blank"
          rel="noopener"
        >
          Enable camera permissions in Chrome
        </Link>
        <Link
          variant="body2"
          href="https://support.apple.com/guide/safari/websites-ibrwe2159f50/mac"
          target="_blank"
          rel="noopener"
        >
          Enable camera permissions in Safari
        </Link>
      </Stack>
      <Typography variant="caption">
        If you are experiencing any audio delays, please check if you are using
        any form or wireless headphones during the recording process. If you are
        not using any wireless headphones and are experiencing only audio
        delays, please continue as these videos will still be accepted.
      </Typography>
      <Typography>
        Please fill{" "}
        <Link href={GOOGLE_FORM_URL} target="_blank" rel="noopener">
          this form
        </Link>{" "}
        and email{" "}
        <Typography fontWeight={800} style={{ display: "inline-block" }}>
          teachsimlab@gmail.com
        </Typography>{" "}
        if you still need help.
      </Typography>
    </Stack>
  );
}

export default ResolvePermissionError;
