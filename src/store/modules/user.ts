interface IPerson {
  name: string;
  age: number;
}

const useUser = defineStore('User', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      user: {
        name: 'iu',
        age: 18,
      },
    };
  },
  getters: {
    firstName: () => 'stephen',
    nextName: () => 'curry',
  },
  actions: {
    changeName(user: IPerson) {
      this.user = user;
      console.log('🌈 pinia响应式actions', this.user);
    },
  },
});

export default useUser;
