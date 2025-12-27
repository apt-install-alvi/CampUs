import type { ChangeEventHandler } from "react"

type TextInputTypes= {
  label:string, 
  placeholder?:string, 
	type: string,
  value: string,
  changeHandler?: ChangeEventHandler<HTMLInputElement>
}

export function InputField({label, placeholder, value, type, changeHandler}:TextInputTypes)
{
	return (
	<>
		<label htmlFor={label} className="block text-text-lm text-md font-medium my-0">
			{label}
		</label>
		<input 
		name={label.toLowerCase()}
		id={label.toLowerCase()} 
		type={type} 
		placeholder={placeholder} 
		value={value} 
		onChange={changeHandler} 
		className="bg-primary-lm border border-stroke-grey rounded-lg w-3/4 h-10 text-base text-text-lighter-lm font-normal px-3 focus:outline-accent-lm" />
	</>
  );
}

