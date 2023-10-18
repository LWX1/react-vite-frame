import { useReducer as reducer } from 'react';

const useReducer = (initState: any) => {
    const _reducer = (state: any, props: any) => ({
        ...state,
        ...props,
    });

    const [state, dispatch] = reducer(_reducer, initState);

    return [state, dispatch];
};

export default useReducer;
