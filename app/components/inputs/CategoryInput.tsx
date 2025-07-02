'use client'

import { IconType } from 'react-icons';
import { clsx } from 'clsx';

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={clsx(`rounded-xl border-2 p-4 flex flex-col hover:border-neutral-800 transition cursor-pointer`,
                selected ? 'border-neutral-800' : 'border-neutral-200'
            )}
        >
            <Icon size={30} />
            <div className="text-neutral-800 font-semibold">
                {label}
            </div>
        </div>
    );
}

export default CategoryInput;