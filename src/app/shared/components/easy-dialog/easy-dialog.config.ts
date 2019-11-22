import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { DialogPosition, DialogRole } from '@angular/material';

export interface DialogData {
  title: string;
  description?: string;
  buttons: DialogBtns[];
  ariaDescribedBy?: string | null;
  ariaLabel?: string | null;
  ariaLabelledBy?: string | null;
  autoFocus?: boolean;
  backdropClass?: string;
  closeOnNavigation?: boolean;
  componentFactoryResolver?: ComponentFactoryResolver;
  direction?: Direction;
  disableClose?: boolean;
  hasBackdrop?: boolean;
  height?: string;
  id?: string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  panelClass?: string | string[];
  position?: DialogPosition;
  restoreFocus?: boolean;
  role?: DialogRole;
  scrollStrategy?: ScrollStrategy;
  viewContainerRef?: ViewContainerRef;
  width?: string;
}

export interface DialogBtns {
  type?: '' | 'primary' | 'accent' | 'warn';
  text: string;
  onClick: () => void;
}
