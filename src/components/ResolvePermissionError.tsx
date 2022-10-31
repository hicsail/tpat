import { Stack, Button, Typography, Link } from "@mui/material";

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
        be having;
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
      <Typography>
        Please email teachsimlab@gmail.com if you still need help.
      </Typography>
    </Stack>
  );
}

export default ResolvePermissionError;
