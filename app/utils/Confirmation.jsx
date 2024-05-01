import { useState } from 'react';
import "../style/animation.css";
import "../(pages)/projects/projects.css"

export default function ConfirmationModal({ message, onConfirm }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const confirm = () => {
        onConfirm();
        setShowConfirmation(false);
    };

    const cancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div className='top_To_Down_Slider'>
            <button onClick={() => setShowConfirmation(true)}>Delete</button>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>{message}</p>
                  <div className='space-x-4'>
                  <button className='bg-red-600' onClick={confirm}>Yes</button>
                    <button className='bg-green-600' onClick={cancel}>No</button>
                  </div>
                </div>
            )}
        </div>
    );
}
