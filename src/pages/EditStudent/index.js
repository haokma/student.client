import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Radio,
  Row,
} from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import studentApi from "../../apis/studentApi";
const EditStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [student, setStudent] = useState();
  const [studentId, setStudentId] = useState(params?.id);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const studentValues = { ...values };
    try {
      await studentApi.edit(studentId, {
        ...studentValues,
        id: Number(studentId),
      });
      navigate("/student");
      message.success("Sửa Sinh viên thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getStudent = async () => {
    try {
      const result = await studentApi.get(studentId);
      const birthday = new Date(result.birthday);
      result.birthday = birthday;

      setStudent(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  const deleteStudent = async () => {
    try {
      await studentApi.delete(studentId);
      navigate("/student");
      message.success("Xóa Sinh viên thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const confirm = (e) => {
    deleteStudent();
  };

  const cancel = (e) => {
    message.error("Click on No");
  };
  if (!student) return;
  return (
    <>
      <Row>
        <Button onClick={() => navigate("/student")} type="primary">
          Trang chủ
        </Button>
        <Col span={12}>
          <h1>Chỉnh sửa thông tin </h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              username: student?.username,
              firstname: student?.firstname,
              lastname: student?.lastname,
              address: student?.address,
              email: student?.email,
              phone: student?.phone,
              gender: student?.gender,
              gender: student?.gender,
              birthday: moment(student?.birthday),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tên đăng nhâp(*):"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ(đệm)(*):"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên(*):"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email(*):"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Điện thoại(*):"
              name="phone"
              rules={[
                {
                  type: "phone",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: false,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please input your birthday!",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select your gender!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={0}>Name</Radio>
                <Radio value={1}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Xóa</Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditStudent;
