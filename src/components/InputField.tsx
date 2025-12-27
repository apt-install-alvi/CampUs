import type { ChangeEventHandler } from "react"

interface InputProps
{
  label:string, 
	name: string,
  placeholder?:string, 
	type: string,
  value: string,
  changeHandler?: ChangeEventHandler<HTMLInputElement>
}

export function InputField({label, placeholder, value, type, name, changeHandler}:InputProps)
{
	return (
	<>
		<label htmlFor={name} className="block text-text-lm text-md font-medium my-0">
			{label}
		</label>
		<input 
		name={name}
		id={name} 
		type={type} 
		placeholder={placeholder} 
		value={value} 
		onChange={changeHandler} 
		className="bg-primary-lm border border-stroke-grey rounded-lg w-3/4 h-10 text-base text-text-lighter-lm font-normal px-3 focus:outline-accent-lm" />
	</>
  );
}

