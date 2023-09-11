'use strict';

import React , {PropsWithChildren} from "react";

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Well this is embarrassing. Something's gone wrong :(</h1>;
        }

        return this.props.children;
    }
}

