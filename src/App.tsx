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
import { useEffect,useState } from 'react';
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

  //code animation

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 1000);
  }, []);



  //code animation


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
      REACT Hook FORM
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
      <img src="./logo192.png" alt="Logo" />

      <div className="container">
        <video autoPlay loop muted>
          <source src="./testVidos.mp4" type="video/mp4" />
        </video>
        <div className='text-box'>
          <div className='wrapperAllText'>
            <span className='w'>W</span>
            <span className='o'>o</span>
            <span className='r'>r</span>
            <span className='k'>k</span>
            <span className='s'>s</span>
            <span className='dot'>.</span>
          </div>
          {/* <span className='dot'>.</span> */}
        </div>
      </div>



      {/* <div className="animation-container">
      <div className="word">
        <span className={`initial ${showAnimation ? 'appear' : ''}`}>W</span>
        <span className={`remaining ${showAnimation ? 'slide-in' : ''}`}>
          <span>o</span>
          <span>r</span>
          <span>k</span>
          <span>s</span>
        </span>
        <span className={`dot ${showAnimation ? 'move-dot' : ''}`}>.</span>
      </div>
    </div> */}

  
    

      
  </div>



  );
}

export default App;
