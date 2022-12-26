import { Form, Input } from 'antd';

const FormInput = (props) => {
  const { lable, name } = props;
  return (
    <Form.Item
      label={lable}
      name={name}
      rules={[
        {
          required: true,
          message: `Please input your ${name}!`,
        },
      ]}>
      <Input />
    </Form.Item>
  );
};
export default FormInput;
