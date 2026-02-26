
import {useQuery} from '@tanstack/react-query'
import { useState } from 'react'

export interface Todo{
    userId : number,
    id : number, 
    todo : string,
    completed : boolean
}


export default function QueryBasics() {
    const[page, setPage] = useState<number>(0);
    const {isPending , isError , data, error, isFetching, isPlaceholderData} = useQuery<Todo[], Error>({
        queryKey: ['todos', page],
        queryFn:() => fetchTodos(page),
        placeholderData: (previousData) => previousData,
    })
    

    if(isPending) return <div>Loading...</div>
    if(isError) return <div>`error is ${error.message}`</div>


  return (
    <>
        <div>queryBasics</div>
        <ul>
            {data.map((item:any) => (
                <li key={item.id}>
                    {item.todo}
                </li>
            ))}
            <button onClick={() => setPage((old) => Math.max((old - 1), 0))} disabled={page === 0}>Previous 5</button>
            <button onClick={
                () => !isPlaceholderData && data&& setPage((old) => old + 1)
               }> Next 5</button>
        </ul>
    </>
  )
}

export const fetchTodos = async(page : number):Promise<Todo[]> => {
    const limit = 5;
    const skip = page * limit;
    const response = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
    const result = await response.json();
    return result.todos;
}