export const useScroll = (distance:number) => {
  window.scrollTo({
    top: distance,
    behavior: 'smooth', // 可选，使滚动平滑
  })
}
