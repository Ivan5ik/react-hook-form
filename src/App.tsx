import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import './App.css';
import { TextInput } from './components/textInput';
import { RangeInput } from './components/rangeInput';
import { PassWordInput } from './components/passwordInput';
import { NumberInput } from './components/numberInput';
import { ImageInput } from './components/imageInput';
import { EmailInput } from './components/emailInput';
import { DateInput } from './components/dateInput';
import { CheckBoxInput } from './components/checkBoxinput';
import { useEffect } from 'react';
import { CustomSelect } from './components/customSelect';

type Inputs = {
  textName: string;
  rangeInput: string;
  password: string;
  numberInput: string;
  emailInput: string;
  dateInput: string;
  checkbox: boolean;
  country: Icountry;
};

function App() {
  const methods = useForm<Inputs>({
    mode: 'all',
  });

  const { register, handleSubmit, reset, watch, setValue, control } = methods;

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  return (
    <div className="App">
      REACT HOOK FORM
      <FormProvider {...methods}>
        <form className="wrapperForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            rules={{
              ...register('textName', {
                required: 'Text Name is required!',
                minLength: { value: 5, message: 'Не менше 5 символів' },
              }),
            }}
          />

          <RangeInput
            rules={{
              ...register('rangeInput'),
            }}
          />
          <PassWordInput
            rules={{
              ...register('password', {
                required: 'Password Input is required',
                minLength: { value: 5, message: 'Не менше 5 символів' },
              }),
            }}
          />
          <NumberInput
            rules={{
              ...register('numberInput', {
                required: 'Number Input is required',
                minLength: { value: 3, message: 'Не менше 3 символів' },
              }),
            }}
          />

          <EmailInput
            rules={{
              ...register('emailInput', {
                required: 'Email Input is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email is not valid',
                },
              }),
            }}
          />
          <DateInput
            rules={{
              ...register('dateInput'),
            }}
          />
          <CheckBoxInput
            rules={{
              ...register('checkbox'),
            }}
          />
          <Controller
            control={control}
            name="country"
            rules={{ required: 'Select is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomSelect
                onChangeFunc={onChange}
                valueSelect={value}
                errorSelect={error}
              />
            )}
          />
          <ImageInput />
        </form>
        <button onClick={() => setValue('textName', 'testik')}>
          New value in form
        </button>
      </FormProvider>
    </div>
  );
}

export default App;
