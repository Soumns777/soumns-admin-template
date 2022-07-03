import useUser from '@/store/modules/user';
import useAuth from '@/store/modules/auth';
import useTabs from '@/store/modules/tabs';
// 箭头函数返回对象写法
const useStore = (arg0?: any) => ({
  User: useUser(arg0),
  Auth: useAuth(arg0),
  Tabs: useTabs(arg0),
});

export default useStore;
