/**
 * 可编辑单元格矩阵
 */
export interface Cell {
  value: string;
  key: string;
  visible: boolean;
}

/**
 * 排序
 */
export interface EasyColumnSort {
  default?: 'ascend' | 'descend';
  compare?: (() => number) | null;
  key?: string | null;
  reName?: {
    ascend?: string;
    descend?: string;
  };
}

/**
 * 标签信息
 */
export interface EasyColumnTag {
  [key: number]: EasyColumnTagValue;
  [key: string]: EasyColumnTagValue;
}
export interface EasyColumnTagValue {
  text?: string;
  color?:
    | 'geekblue'
    | 'blue'
    | 'purple'
    | 'success'
    | 'red'
    | 'volcano'
    | 'orange'
    | 'gold'
    | 'lime'
    | 'green'
    | 'cyan'
    | string;
}

/**
 * 按钮配置
 */
export interface EasyColumnButton {
  text?: string;
  icon?: string;
  type?: string;
  color?: string;
  click?: (record: any) => any;
  pop?: boolean;
  popTitle?: string;
  children?: EasyColumnButton[];
  iif?: (record: any) => boolean;
  tooltip?: string;
}

/**
 * 表格
 */
export interface EasyColumn {
  title: string;
  index?: string;
  label?: string; // === title
  value?: string; // === index
  checked?: boolean;
  disabled?: boolean;
  fixed?: string;
  left?: string;
  right?: string;
  width?: string;
  desc?: string;
  sort?: true | string;
  type?:
    | 'text'
    | 'checkbox'
    | 'tag'
    | 'badge'
    | 'button'
    | 'link'
    | 'img'
    | 'imgs'
    | 'video'
    | 'number'
    | 'currency'
    | 'percent'
    | 'format';
  edit?: boolean; // 是否可编辑
  editType?: 'text' | 'number' | 'select' | 'textarea';
  format?: () => any; // 数值类型，金钱格式等
  tag?: EasyColumnTag;
  cat?: string; // 字段分类
  static?: boolean; // 是否是固定显示的值
  buttons?: EasyColumnButton[];
  videoLink?: string;
  iif?: boolean | (() => any);
  sum?: string; // 标记是否是总计列
}
