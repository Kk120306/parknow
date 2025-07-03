'use client';

import { IconType } from 'react-icons';
import { clsx } from 'clsx';

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    outline?: boolean;
    disabled?: boolean;
    small?: boolean;
    icon?: IconType;
}


const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    outline,
    disabled,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full`,
                outline ? 'bg-white border-black text-black' : 'bg-blue-800  text-white',
                small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2',
            )}>
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
}

export default Button;