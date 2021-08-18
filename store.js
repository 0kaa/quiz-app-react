import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    userName: '',
    userStartExam: false,
    currentQuestionIndex: 1,
    userAnwersCount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_EXAM':
            return {
                ...state,
                userStartExam: !state.userStartExam,
            }
        case 'QUESTION_INCREMENT':
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
            }
        case 'USER_ANSWERS_COUNT_INCREMENT':
            return {
                ...state,
                userAnwersCount: state.userAnwersCount + 1,
            }
        case 'USER_ANSWERS_COUNT_DECREMENT':
            if (state.userAnwersCount < 0) {
                return {
                    ...state,
                    userAnwersCount: 0,
                }
            }
            return {
                ...state,
                userAnwersCount: state.userAnwersCount - 1,
            }
        case 'CHANGE_NAME':
            return {
                ...state,
                userName: action.userName,
            }
        default:
            return state
    }
}

function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}