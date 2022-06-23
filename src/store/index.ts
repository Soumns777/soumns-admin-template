import useUser from '@/store/modules/user';
import useAuth from '@/store/modules/auth';
// 箭头函数返回对象写法
const useStore = () => ({
  User: useUser(),
  Auth: useAuth(),
});

export default useStore;
