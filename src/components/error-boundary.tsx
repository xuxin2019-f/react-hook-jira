import React from "react";
// React.ReactElement有props、type、key三个属性
// React.ReactNode可以是string、number、ReactElement、{}、boolean、ReactNodeArray
type FallBackRender = (props: { error: Error | null }) => React.ReactElement;
// props要有children和fallbackRender
export class ErrorBoundary extends React.Component<
  // PropsWithChildren是一个utilityType 相当于<{children: React.ReactNode,fallbackRender: FallBackRender}
  // 定义：type PropsWithChildren<P> = P & {children?: ReactNode}
  React.PropsWithChildren<
    { fallbackRender: FallBackRender },
    { error: Error | null }
  >
> {
  state = { error: null };
  // 当子组件抛出异常，这里会接收到并且调用
  static getDeriveStateFromError(error: Error) {
    // 会赋值给state
    return { error };
  }
  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;
    if (error) {
      return fallbackRender(error);
    }
    return children;
  }
}
