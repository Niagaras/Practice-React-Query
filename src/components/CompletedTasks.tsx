
import { useQuery } from "@tanstack/react-query"
import type { Todo } from "./QueryBasics"
export default function CompletedTasks() {

    const {isPending, isError, data, error} = useQuery<Todo[], Error> ({
        queryKey : ['todos', 'completed'],
        queryFn : fetchCompletedTasks,
    })

    if(isPending) return <div> Loading ...</div>
    if(isError) return <div>Error: {error.message}</div>
    

  return (
    <>
        <div>CompletedTasks</div>
        <ul>
            {data?.map((item : Todo) => (
                item.completed && <li key={item.id}>
                    {item.todo}
                    = {item.completed ? 'Completed' : 'Not Completed'}
                </li>
            ))}
        </ul>
    </>
  )
}


const fetchCompletedTasks = async():Promise<Todo[]> => {
    const response = await fetch ('https://dummyjson.com/todos?completed=true');
    const result = await response.json();
    return result.todos;
}