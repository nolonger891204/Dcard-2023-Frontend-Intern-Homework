import { Button, Modal } from 'antd'
import { useState } from 'react'
import { EditTaskForm } from '../components/editTaskForm'

const EditModal = ({ editModalOpen, setEditModalOpen, toggleModal, baseInfo, defaultTitle, defaultBody }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      open={editModalOpen}
      title="Edit Task"
      onCancel={toggleModal}
    >
      <EditTaskForm 
        username={baseInfo.username} 
        repo={baseInfo.repo} 
        issue_number={baseInfo.issue_number} 
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