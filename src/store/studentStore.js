// import { observable } from 'mobx';
// import studentApi from '../apis/studentApi';

// export class StudentStore {
//   @observable students = [];

//   @observable isLoading = true;

//   @action
//   fetchProducts = async () => {
//     const result = studentApi.getList(1, 10);
//     runInAction(() => {
//       this.students = result.data;
//       this.isLoading = false;
//     });
//   };
// }
