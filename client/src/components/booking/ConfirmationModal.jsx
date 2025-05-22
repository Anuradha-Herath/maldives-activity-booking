import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, bookingReference, activityTitle, date, guests, totalPrice }) => {
    if (!isOpen) return null;

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-16 sm:w-16">
                                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Your Booking Request Has Been Sent!
                                </h3>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">
                                        Thank you for your booking request. Our team will confirm your booking shortly.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg mt-3">
                                        <p className="text-sm font-medium text-blue-700 mb-2">Booking Details</p>
                                        <div className="text-sm text-gray-600">
                                            <p><span className="font-medium">Reference:</span> {bookingReference}</p>
                                            <p><span className="font-medium">Activity:</span> {activityTitle}</p>
                                            <p><span className="font-medium">Date:</span> {formattedDate}</p>
                                            <p><span className="font-medium">Guests:</span> {guests}</p>
                                            <p className="font-medium mt-2">Total: ${totalPrice}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-3">
                                        A confirmation email has been sent to your email address with all the details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Continue to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
