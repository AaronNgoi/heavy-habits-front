import React from 'react';
import {deleteUser} from "firebase/auth";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";

const DeleteConfirmationModal = ({ habitName, onDelete, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="bg-biege-form-colour p-6 mx-auto max-w-md rounded-3xl shadow-lg z-10">
                <h3 className="text-2xl text-center mb-4">Are you sure?</h3>
                <p className="text-center mb-4 whitespace-normal font-itim">
                    <span className="font-bold">Warning:</span> Deleting this habit will permanently remove all associated records.
                </p>
                <div className="flex justify-center">
                    <button onClick={onDelete} className="bg-red text-FCE3BF  text-biege-form-colour py-2 px-4 rounded-3xl w-32 mr-4">
                        Delete {habitName}
                    </button>
                    <button onClick={onClose} className="bg-green text-FCE3BF  text-biege-form-colour py-2 px-4 rounded-3xl w-32">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;