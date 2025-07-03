'use client'

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProp {
    id: string,
    label: string,
    type?: string,
    required?: boolean,
    formatPrice?: boolean,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}


const Input: React.FC<InputProp> = ({
    id,
    label,
    type = 'text',
    required,
    formatPrice,
    disabled,
    register,
    errors
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-10' : 'pl-4'} ${errors[id] ? 'border-blue-800' : 'border-neutral-300'} focus:border-black`}
            />
            <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-10' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:scale-75 ${errors[id] ? 'text-blue-800' : 'text-zinc-400'}`}>
                {label}
            </label>
        </div>
    );
}

export default Input;