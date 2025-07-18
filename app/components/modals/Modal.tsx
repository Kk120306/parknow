'use client'

import { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);


    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
                    <div
                        className={clsx(
                            "h-full duration-300 transition-all",
                            showModal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button
                                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                                    onClick={handleClose}
                                >
                                    <IoMdClose
                                        size={18}
                                        className="text-neutral-700" />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* Footer */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;