function useMouse() {
  //   let x = $ref(0);
  //   let y = $ref(0);

  let x = ref(0);
  let y = ref(0);

  function MovementTrigger(e: any) {
    //事件触发时给x y 赋值
    x.value = e.pageX;
    y.value = e.pageY;

    console.log(x, y, '🍊 useMouse');
  }

  onMounted(() => {
    //添加  onmousemove事件   当鼠标滑动时触发MovementTrigger
    window.addEventListener('mousemove', MovementTrigger);
  });

  onUnmounted(() => {
    //注销掉之前定义的on事件  避免报错
    window.removeEventListener('mousemove', MovementTrigger);
  });

  //   return $$({
  //     x,
  //     y,
  //   });

  return {
    x,
    y,
  };
}
export { useMouse };
