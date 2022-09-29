import { Grid } from '@mui/material';
import React, { FC, FormEvent, ReactNode, useEffect, useMemo } from 'react';
import formValidation from '../../../helpers/form/form-validation';
import { inputFormToJSON } from '../../../helpers/form/form.helper';
import useForm from '../../../helpers/form/hooks/useForm';

import { FormInputsProps } from '../../../interfaces/form/form.interface';
import { NetzerInput } from './input';
import { IntlInput } from './input/IntlInput';
import { NetzerSelect } from './select';

interface NetzerFormProps {
  footerSection?: ReactNode;
  isLoading?: boolean;
  inputsData: ({ form, actions, handleChange }: ParamsInputData) => FormInputsProps[];
  handleSubmit: Function;
  initialState?: InitialStateFormI;
  keyForm?: string;
  dataRules?: Function;
  actions?: { [key: string]: Function | string | boolean };
}

interface InitialStateFormI {
  [key: string]: string | number;
}

interface ParamsInputData {
  form: any;
  actions?: { [key: string]: Function | string | boolean };
  handleChange?: Function;
}

export const NetzerForm: FC<NetzerFormProps> = ({
  footerSection,
  inputsData,
  handleSubmit,
  dataRules,
  initialState,
  keyForm,
  actions,
  isLoading
}) => {
  const { form, handleChange, setForm } = useForm(initialState || {});

  useEffect(() => {
    if (!initialState) return;
    setForm(_prev => ({ ..._prev, ...initialState }));
  }, [initialState]);

  let items = useMemo(() => {
    const { errors } = formValidation?.(form, dataRules?.({ form }) || {});
    return inputsData?.({ form, actions, handleChange }).map((item: any) => {
      item.errorMessage = errors?.[item?.props?.name] ? errors?.[item?.props?.name][0] : '';
      return item;
    });
  }, [form]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = inputFormToJSON?.(e.target as HTMLFormElement);
    setForm(data);
    const { isValid } = formValidation?.(data, dataRules?.({ form }) || {});
    if (!isValid) return;
    handleSubmit?.(form);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} sx={{}}>
          {items?.map((item, index) => {
            const { props, ...generalProps } = item;
            return (
              <Grid item key={index} xs={generalProps?.cols || 12}>
                {generalProps.type === 'phone' && (
                  <IntlInput
                    onChange={props.onChange || handleChange}
                    label={generalProps?.label}
                    props={{
                      ...props,
                      value: form?.[props.name]
                    }}
                  />
                )}
                {['text', 'number', 'password'].includes(generalProps.type) && (
                  <NetzerInput
                    label={generalProps.label}
                    type={generalProps.type}
                    props={{
                      ...props,
                      autoFocus: !!form?.[props.name],
                      value: form?.[props.name]
                    }}
                    errorMessage={generalProps.errorMessage}
                    onChange={props.onChange || handleChange}
                  />
                )}
                {generalProps.type === 'select' && (
                  <NetzerSelect
                    label={generalProps.label}
                    options={generalProps.options}
                    onChange={value =>
                      handleChange({
                        target: {
                          value: value,
                          name: props.name
                        }
                      } as any)
                    }
                    props={{
                      ...props,
                      disabled: isLoading || props?.disabled
                    }}
                  />
                )}
                {generalProps.type === 'customSection' && (
                  <React.Fragment>{generalProps?.section}</React.Fragment>
                )}
              </Grid>
            );
          })}
        </Grid>
        {footerSection}
      </form>
    </React.Fragment>
  );
};
