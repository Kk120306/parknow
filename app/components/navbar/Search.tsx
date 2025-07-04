'use client'

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';


const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const spaceCount = params?.get('spaceCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';
    }, [locationValue, getByValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            const diff = differenceInDays(end, start);

            if (diff === 0) {
                return '1 Day';
            }

            return `${diff} Days`;
        }
        return 'Any Week';
    }, [startDate, endDate]);

    const spaceCountLabel = useMemo(() => {
        if (spaceCount) {
            return `${spaceCount} Space`;
        }
        return 'Any Space';
    }, [spaceCount]);


    return (
        <div
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={searchModal.onOpen}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {spaceCountLabel}
                    </div>
                    <div className="p-2 bg-blue-800 text-white rounded-full">
                        <BiSearch className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;