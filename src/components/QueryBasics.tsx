
import {useQuery} from '@tanstack/react-query'

export interface Todo{
    userId : number,
    id : number, 
    todo : string,
    completed : boolean
}


export default function QueryBasics() {
    const {isPending , isError , data, error} = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
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
        </ul>
    </>
  )
}

export const fetchTodos = async():Promise<Todo[]> => {
    const response = await fetch('https://dummyjson.com/todos');
    const result = await response.json();
    return result.todos;
}