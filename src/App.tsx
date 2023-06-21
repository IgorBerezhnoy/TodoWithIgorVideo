import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    );

    let [tasks, setTasks] = useState<TaskObjType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ], [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Sugar', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ],
    });

    /*  let [filter, setFilter] = useState<FilterValuesType>('all');*/


    function removeTask(taskId: string, todoId: string) {

        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== taskId)});
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string, todoId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, isDone} : el)});


        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    function changeFilter(value: FilterValuesType, todoId: string) {

        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter: value} : el));
        // setFilter(value);

    }

    const removeTodolist = (todoId: string) => {
        setTodolists(todolists.filter(el=>el.id!==todoId))
        delete tasks[todoId]

    };


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (<Todolist
                    key={el.id}
                    todoId={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                />);
            })}

        </div>
    );
}

export default App;
