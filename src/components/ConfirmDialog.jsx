import {useEffect, useRef} from "react";


export default function ConfirmDialog({title, message, open , onClose, onConfirm}) {

    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if(!dialog) return;
        if(open && !dialog.open) dialog.showModal();
        if(!open && dialog.open) dialog.close();

    },[open])

    const confirmHandler = () => {
        onConfirm();
        onClose();
    }

    return(
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className={'m-auto  backdrop:backdrop-blur-sm rounded-lg p-0 shadow-md open:animate-fade-in ' +
                'w-full max-w-md bg-white border border-gray-100'}
        >
            <div className={'p-6'}>
                <h3 className={'text-lg font-semibold text-gray-900 mb-2'}>{title}</h3>

                <p className={'text-sm text-gray-700 mb-6 '}>{message}</p>

                <div className={'flex justify-end gap-3'}>
                    <button
                        onClick={onClose}
                        className={'px-4 py-2 text-sm font-medium bg-white'}>Cancel</button>
                    <button
                        onClick={confirmHandler}
                        className={'py-2 px-4 text-sm font-medium bg-blue-500 '}>Confirm</button>
                </div>
            </div>
        </dialog>
    )

}