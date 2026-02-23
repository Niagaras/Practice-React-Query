
import { useQuery } from "@tanstack/react-query"
import type { Todo } from "./QueryBasics"

export default function OneUserTasks() {
    const {isPending, isError, data, error} = useQuery<Todo[], Error>({
        queryKey : ['todos', 198],
        queryFn : ({queryKey} : {queryKey : [string, number]}) =>{
            const [_key, userId] = queryKey;
            return fetchOneUserTasks({queryKey : [_key, userId]})
        },
    })

    if(isPending) return <div> Loading ...</div>
    if(isError) return <div>Error: {error.message}</div>
  return (
    <>
        <div>OneUserTasks</div>
        <ul>
            {
                data?.map((item : Todo) => (
                    <li key={item.id}>
                        {item.todo}
                       =
                        {item.userId}
                    </li>
                 )
                )
            }
        
        </ul>
    </>
  )
}

export const fetchOneUserTasks = async({queryKey} : {queryKey : [string, number] }):Promise<Todo[]> => {
    const [_key, userId] = queryKey;
    const response = await fetch (`https://dummyjson.com/todos/user/${userId}`);
    const result = await response.json();
    return result.todos;
}