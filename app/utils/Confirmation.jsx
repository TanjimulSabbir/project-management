import React from 'react';
import { Button, message, Popconfirm } from 'antd';

const ConfirmationModal = ({ id, handleDelete }) => {

    const confirm = () => {
        handleDelete(id);
        message.success('Task deleted successfully');
    };

    const cancel = () => {
        message.info('Task deletion cancelled');
    };

    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
};

export default ConfirmationModal;
