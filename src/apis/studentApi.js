import axiosClient from "./axiosClients";

const studentApi = {
  getList: (page, size) => {
    return axiosClient.get("/employee", {
      params: {
        page: page,
        size: size,
      },
    });
  },
  add: (student) => {
    return axiosClient.post("/employee", student);
  },
  get: (id) => {
    return axiosClient.get(`/employee/${id}`);
  },
  delete: (id) => {
    return axiosClient.delete(`/employee/${id}`);
  },
  edit: (id, student) => {
    return axiosClient.put(`/employee/${id}`, student);
  },
};

export default studentApi;
