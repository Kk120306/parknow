'use client'

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from 'query-string';
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";



enum STEP {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const router = useRouter();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEP.LOCATION);
    const [spaceCount, setSpaceCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), []);

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit = useCallback(async () => {
        if (step !== STEP.INFO) {
            return onNext();
        }
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            spaceCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEP.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [step, onNext, searchModal, router, params, location, spaceCount, dateRange]);


    const actionLabel = useMemo(() => {
        if (step === STEP.INFO) {
            return 'Search';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEP.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you want to go?"
                subtitle="Find the perfect parking spot"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map
                center={location?.latlng}
            />
        </div>
    )

    if (step === STEP.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you need it?"
                    subtitle="Make sure to book in advance"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEP.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="More information"
                    subtitle="Find your perfect parking spot"
                />
                <Counter
                    title="How many cars?"
                    subtitle="Select the number of cars"
                    value={spaceCount}
                    onChange={(value) => setSpaceCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
            secondaryAction={step === STEP.LOCATION ? undefined : onBack}
        />
    );
}

export default SearchModal;