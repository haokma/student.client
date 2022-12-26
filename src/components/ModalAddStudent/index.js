import { Button, DatePicker, Form, Input, message, Modal, Radio } from 'antd';
import studentApi from '../../apis/studentApi';
import { DATE_FORMAT } from '../../constants';
const ModalAddStudent = (props) => {
  const { isModalOpen, handleOk, handleCancel } = props;
  const onFinish = async (values) => {
    const studentValues = { ...values };
    studentValues.birthday = values.birthday.toString();
    try {
      await studentApi.add(studentValues);
      handleOk();
      message.success('Thêm sinh viên thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="Thêm sinh viên" open={isModalOpen} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Tên đăng nhâp(*):"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ(đệm)(*):"
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên(*):"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input your lastname!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email(*):"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Điện thoại(*):"
            name="phone"
            rules={[
              {
                type: 'phone',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: false,
                message: 'Please input your address!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Please input your birthday!',
              },
            ]}>
            <DatePicker format={DATE_FORMAT} />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please select your gender!',
              },
            ]}>
            <Radio.Group>
              <Radio value={0}>Name</Radio>
              <Radio value={1}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              type="secondary"
              onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddStudent;
