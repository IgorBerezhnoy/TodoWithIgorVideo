import React from 'react';
import {FilterValuesType, TodolistType} from '../App';


type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT|ChangeTodolistFilterAT
type RemoveTodolistAT = { type: 'REMOVE-TODOLIST', payload: { id: string } }
type AddTodolistAT = { type: 'ADD-TODOLIST', payload: { id: string, title: string } }
type ChangeTodolistTitleAT = { type: 'CHANGE-TODOLIST-TITLE', payload: { id: string, title: string } }
type ChangeTodolistFilterAT = { type: 'CHANGE-TODOLIST-FILTER', payload: { id: string, filter: FilterValuesType } }

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id);
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? ({...el, title: action.payload.title}) : el);
  case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id ? ({...el, filter: action.payload.filter}) : el);

        default:
            return state;
    }
};


export const removeTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', payload: {id}};
};
export const addTodolistAC = (id: string, title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', payload: {id, title}};
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}};
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}};
};