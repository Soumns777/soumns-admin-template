let qs = require('qs');

let user = {
  name: 'iu',
  age: 17,
  gender: '女',
};

let str = qs.stringify(user);
console.log('💛💙 str: ', str); // 💛💙 str:  name=iu&age=17&gender=%E5%A5%B3

console.log('💛💙 obj: ', qs.parse(str)); // 💛💙 obj:  { name: 'iu', age: '17', gender: '女' }
