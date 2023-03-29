declare namespace IAntdPicker {
  interface PickerOption extends ProvinceOption {
    label?: string;
    value?: string;
    children?: PickerOption[];
    disabled?: string;
    className?: string | number;
  }
  interface ProvinceOption {
    name?: string;
    code?: string;
    provinceCode?: string;
    children?: PickerOption[];
  }
}
