import { Button, Form, Input, message } from 'antd';
import { updateIssue } from '../axios';
import { useEffect, useState } from 'react';

const EditTaskForm = ({ issueUrl, defaultTitle, defaultBody }) => {
  const [form] = Form.useForm();
  const [defaultValues, setDefaultValues] = useState(
    {
      ["title"]: defaultTitle,
      ["body"]: defaultBody
    }
  );

  const onFinish = async (values) => {
    const status = await updateIssue(issueUrl, values);
    if ( status === "success"){
      message.success('Update success', 2.5)
    } else {
      message.error('Update error', 2.5)
    }
  };
  
  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    setDefaultValues({
      ["title"]: defaultTitle,
      ["body"]: defaultBody
    });
  }, [defaultTitle]);

  useEffect(()=>{
    form.setFieldsValue(defaultValues)
  }, [defaultValues]);

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      initialValues={defaultValues}
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