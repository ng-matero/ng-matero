export interface DialogData {
  width?: string;
  title: string;
  description?: string;
  disableClose?: boolean;
  buttons: DialogBtns[];
}

export interface DialogBtns {
  type?: '' | 'primary' | 'accent' | 'warn';
  text: string;
  onClick: () => void;
}
