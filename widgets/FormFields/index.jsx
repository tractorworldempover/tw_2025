import React, { useState } from 'react';
import { RequiredError } from '../ErrorComponent'; 
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { statusDropdown,packUnits,genderDropdown} from '@/utils';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

const FormFields = ({ label,type, size, color, error, register, errors, id, value, placeholder, RequiredErrorMsg, selectedValue, onChange, optionsData , selectedDate , onSelectDate ,isRequired,options,optionLabel,maxLength}) => {
 
// console.log(onChange,"onchnage valueueue")
const [isTyping, setIsTyping] = useState(false);

// const handleChange = (e) => {
//   onChange(fieldId, e.target.value);
// };
  switch (type) { 
    case 'textLable':
    return (
    <div className="w-72">
    <Input
    type="email"
    placeholder="Email Address"
    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
    labelProps={{
    className: "block",
    }}
    containerProps={{ className: "min-w-[100px]" }}
    />
    </div>
    );
    case 'text':
      return (
        <div className='w-full'>
          <Input
            type="text"
            label={label}
            size={size}
            color={color}
            maxLength="50" 
            value={value}
            name={id} 
            {...register(`${id}`, { required: true})}
            onChange={(e) => {
              onChange(e); 
              setIsTyping(e.target.value.length > 0);
            }}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z\s]+$/; // Modify the regex to allow spaces
              if (!regex.test(e.key) && e.key !== 'Backspace') { // Allow backspace
                e.preventDefault();
                
              }
            }}
          />
         {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
     
        </div>
      );
      case 'textnumber':
        return (
          <div className='w-full'>
            <Input
              type="text"
              label={label}
              size={size}
              color={color}
              maxLength={maxLength} 
              value={value}
              name={id} 
              {...register(`${id}`, { required: true})}
              onChange={onChange}
              onKeyDown={(e) => {
                const regex = /^[A-Za-z0-9\s]+$/; // Modify the regex to allow letters, numbers, and spaces
                if (!regex.test(e.key) && e.key !== 'Backspace') { // Allow backspace
                  e.preventDefault();
                }
              }}
            />
            {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
          </div>
        );

    case 'email':
      return (
        <div className='w-full'>
          <Input
            type="email"
            maxLength="30"
            size={size}
            color={color}
            label={label}
            name={id}
            value={value}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true, pattern: /^\S+@\S+\.\S+$/ })}
            onChange={onChange}
            onKeyDown={(e) => {
              const allowedCharacters = /^[a-zA-Z0-9@.]+$/;
              if (!allowedCharacters.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'mobileno':
      // const initialValue = /^(6|7|8|9)/.test(value) ? value : '';
      return (
        <div className='w-full'>
          <Input
            type="tel"
            maxLength="10"
            label={label}
            name={id}
            size={size}
            value={value}
            color={color} 
            {...register(`${id}`, { required: true, pattern: /^[6-9][0-9]{9}$/})}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={(e) => {
              const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
              const isNumericInput = (e.key >= '0' && e.key <= '9');
              const isAllowedKey = allowedKeys.includes(e.key); 
              if (!(isNumericInput || isAllowedKey)) {
                e.preventDefault();
              } 
              if (e.target.value.length === 0 && !['6', '7', '8', '9'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'number':
      return (
        <div className='w-full'>
          <Input
            type="text" 
            maxLength="6"
            label={label}
            name={id}
            size={size}
            color={color}
            value={value}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true})}
            onChange={onChange}
            onKeyDown={(e) => {
              // Allow backspace (key 'Backspace') and numbers (key '0' to '9')
              if (!(e.key === 'Backspace' || (e.key >= '0' && e.key <= '9'))) {
                e.preventDefault();
              }
            }}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'pincode':
      return (
        <div className='w-full'>
          <Input
            type="tel"
            label={label}
            name={id}
            maxLength="6"
            size={size}
            value={value}
            color={color}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true, pattern: /^[0-9]{6}$/ })} 
            onChange={onChange}
            onKeyDown={(e) => {
              const regex = /^[0-9]+$/;
              if (!regex.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'password':
      return (
        <div className='w-full'>
          <Input
            type="password"
            label={label}
            size={size}
            maxLength={15}
            name={id}
            value={value}
            color={color}
           // onPaste={(e) => e.preventDefault()}
            {...register(`${id}`, { required: true, minLength: 8 })} 
            onChange={onChange}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case "dropdown":
      return (
        <div className="relative w-full">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={selectedValue}
            name={id} 
            {...register(`${id}`, { required: true })}
            onChange={(e) => {
              onChange(e); 
              setIsTyping(e.target.value.length > 0);
            }}
          >
          <option value="" selected hidden>
              Select {label}
            </option>
            {optionsData?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
          {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
        </div>
      );
    case "statusDropdown":
      return (
        <div className="relative w-full">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={selectedValue}
            name={id} 
            {...register(`${id}`, { required: true })}
            onChange={(e) => {
              onChange(e); 
              setIsTyping(e.target.value.length > 0);
            }}
          >
            <option value="" selected hidden>
              Select Status
            </option>
            {statusDropdown().map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
          {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
        </div>
      ); 
    case "genderDropdown":
      return (
        <div className="relative w-full">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={selectedValue}
            name={id} 
            {...register(`${id}`, { required: true })}
            onChange={(e) => {
              onChange(e); 
              setIsTyping(e.target.value.length > 0);
            }}
          >
            <option value="" selected hidden>
              Select Status
            </option>
            {genderDropdown().map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
          {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
        </div>
      ); 
      case "packUnit":
        return (
          <div className="relative w-full">
            <select
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              value={selectedValue} 
              {...register(`${id}`, { required: true })}
              onChange={(e) => {
                onChange(e); 
                setIsTyping(e.target.value.length > 0);
              }}
              name={id}
            >
              <option value="" selected hidden>
                Select Unit
              </option>
              {packUnits().map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {label}
            </label>
            {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
          </div>
        ); 
      case 'date2':  
      return (
        <div className=" w-full">
          <Calendar
            label={label}
            size={size}
            color={color}
            value={value}
            name={id}
            {...register(`${id}`, { required: true })}
            onChange={(e) => {
              onChange(e); 
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder='Select Date of Birth'
          />
         {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
        </div>
      );
    case 'textarea':
      return (
        <div class="relative w-full min-w-[400px]">
          <textarea
            value={value}
             name={id}
            {...register(`${id}`, { required: isRequired })}
            onChange={onChange}
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primaryColor focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "></textarea>
          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'multiselect':
      return(
        <div className='relative w-full'>
          <div className="card flex justify-content-center">
            <MultiSelect value={value} onChange={onChange} options={options} optionLabel={optionLabel} display="chip" 
               filter placeholder={placeholder} maxSelectedLabels={3} className="w-full md:w-20rem" />
         </div>
         {error  && errors[`${id}`]?.type === 'required' && !isTyping && <RequiredError message={RequiredErrorMsg}/> }
        </div>
      )
    // Add more cases for other field types as needed
    default:
      return null;
  }
};

export { FormFields };
