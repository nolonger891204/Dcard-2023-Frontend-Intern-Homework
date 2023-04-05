import { Button, Modal } from 'antd'
import { useState } from 'react'
import { EditTaskForm } from '../components/editTaskForm'

const EditModal = ({ editModalOpen, setEditModalOpen, toggleModal, issueUrl, defaultTitle, defaultBody }) => {
  return (
    <Modal
      open={editModalOpen}
      title="Edit Task"
      onCancel={toggleModal}
    >
      <EditTaskForm 
        issueUrl={issueUrl} 
        defaultTitle={defaultTitle} 
        defaultBody={defaultBody} />
    </Modal>
  );
};

const CreateModal = ({ createModalOpen, setCreateModalOpen, toggleModal }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
    setCreateModalOpen(false);
    }, 3000);
  };
  return (
    <Modal
    open={createModalOpen}
    title="Create Task"
    onOk={handleOk}
    onCancel={toggleModal}
    >
    <EditTaskForm />
    </Modal>
  );
};

export { EditModal, CreateModal } ;