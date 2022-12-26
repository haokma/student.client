import { Button, Col, message, Pagination, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentApi from '../../apis/studentApi';
import ModalAddStudent from '../../components/ModalAddStudent';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { useQueryString } from '../../hooks/useQueryString';
const HomePage = () => {
  const queryString = useQueryString();
  const navigate = useNavigate();
  const [listStudent, setListStudent] = useState();
  const [totalStudent, setTotalStudent] = useState(0);
  const [page, setPage] = useState(Number(queryString.page) || 1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];
  const getListStudent = async () => {
    try {
      const results = await studentApi.getList(page - 1, DEFAULT_PAGE_SIZE);
      setListStudent(results?.data);
      setTotalStudent(results?.total_count);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };
  useEffect(() => {
    getListStudent();
  }, [page]);
  return (
    <>
      <Row>
        <Col span={16}>
          <Button onClick={() => showModal()}>Tạo mới</Button>
          <Table
            dataSource={listStudent}
            columns={columns}
            pagination={false}
            onRow={(student) => ({
              onClick: () => navigate(`/student/${student.id}`),
            })}
          />
          <ModalAddStudent
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
          <Pagination
            current={page}
            defaultCurrent={page}
            total={totalStudent}
            pageSize={DEFAULT_PAGE_SIZE}
            onChange={(event) => {
              setPage(event);
              navigate(`/student/?page=${event}`);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
