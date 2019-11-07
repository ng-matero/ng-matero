export interface DialogData {
  width?: string;
  title: string;
  description?: string;
  disableClose?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
