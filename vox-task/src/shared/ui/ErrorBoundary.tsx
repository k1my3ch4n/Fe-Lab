import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 text-sm">
          <span>오류가 발생했습니다</span>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
