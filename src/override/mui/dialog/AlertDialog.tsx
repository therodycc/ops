// @mui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';

// ----------------------------------------------------------------------

interface AlertDialogProps {
  open: boolean;
  title: string;
  description: string;
  okButtonText: string;
  cancelButtonText: string;
  onClose(): void;
  onAccept(): void;
}

export const AlertDialog = ({
  title,
  open,
  description,
  okButtonText,
  cancelButtonText,
  onClose,
  onAccept
}: AlertDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 4 }}>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button onClick={onAccept} autoFocus>
          {okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
