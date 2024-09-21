import hljs from "highlight.js";

//定义指令，自动使用highlight.js渲染所有<pre><dode>代码块
export const highlight = {
  mounted(el: HTMLElement) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      block.setAttribute("style", "margin-top: 8px;");
      // 旧版本使用的是 highlightElement，新版本使用的是highlightBlock
      hljs.highlightBlock(block as HTMLElement);
    });
  },
};
