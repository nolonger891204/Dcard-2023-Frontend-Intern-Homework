import { Button, Form, Input } from 'antd';
import { updateIssue } from '../axios';

const EditTaskForm = ({ username, repo, issue_number, defaultTitle, defaultBody }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    updateIssue(username, repo, issue_number, values);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        ["title"]: defaultTitle,
        ["body"]: defaultBody
      }}
    >
      <Form.Item
        name="title"
        label="title"
        rules={[
          { required: true, message: '\'title\' is required.'},
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="body"
        label="body"
        rules={[
            { min: 5, message: '\'body\' must be minimum 30 characters.' }
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
export { EditTaskForm };