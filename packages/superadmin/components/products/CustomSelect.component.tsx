import React, { FC } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { FieldProps } from 'formik';
// import { OptionsType, ValueType } from 'react-select/lib/types';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsOrGroups<any, GroupBase<any>> | undefined;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: Option | Option[]) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option: any) => field.value?.indexOf(option.value) >= 0
          )
        : options.find((option: any) => option.value === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
