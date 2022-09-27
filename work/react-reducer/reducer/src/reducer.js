export const initialState = {
    isLoggedIn: false,
    username: '',
    todos: {},
};

export function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
            };
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                todos: {},
            };
        case 'addTodo':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    ...action.todos,
                },
            };
        case 'deleteTodo':
            const newTodos = {...state.todos};
            delete newTodos[action.id];
            return {
                ...state,
                todos: {
                    ...newTodos
                }
            };
        case 'toggleTodo':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.id]: {
                        ...state.todos[action.id],
                        done: !state.todos[action.id].done,
                    }
                }
            };
        case 'updateTodo':
            return {
                ...state,
                todos: action.todos,
            };
        default:
            return state;
    }
}