'use client'

import { IconType } from 'react-icons';
import { clsx } from 'clsx';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import qs from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    const router = useRouter(); 
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        };

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url : "/",
            query: updatedQuery
        }, { skipNull: true });

        router.push(url.toString());
    }, [label, params, router]);

    return (
        <div 
            onClick={handleClick}
            className={clsx(`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`,
            selected ? 'border-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'
        )}>
            <Icon size={26} />
            <div className="text-sm font-medium">
                {label}
            </div>

        </div>
    );
}

export default CategoryBox;