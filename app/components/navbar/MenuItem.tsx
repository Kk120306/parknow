'use client'

interface MenuItemProps {
    onClick?: () => void;
    label: string;
    border?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    border,
}) => {
    return (
        <div
            onClick={onClick}
            className={`
                px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center
                ${border ? 'border-t-[1px] border-neutral-200' : ''}
            `}
        >
            {label}
        </div>
    );
}

export default MenuItem;
