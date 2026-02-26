import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import type { Todo } from './QueryBasics'
export default function InputData() {

    const mutation = useMutation({
      mutationFn: async(newTodo: Omit<Todo, 'id'>) => {
        const response = await fetch('https://dummyjson.com/todos/add', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(newTodo),
        })
        if( !response.ok) throw new Error('Failed to add todo')
          return response.json();
      }
    })
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const todoData = {
      todo: formData.get('title') as string, 
      userId: Number(formData.get('userid')),
      completed: formData.get('completed') === 'true',
      id: 0,
    }
    mutation.mutate(todoData)
    }

  return (
    <>
    {mutation.isPending && <div>Adding todo....</div>}
    {mutation.isError && <div>Error</div>}
    <form onSubmit={onSubmit}>
        <label htmlFor="title">todo</label>
        <input type="text" id='title' name='title' />
        <label htmlFor="userid">userid</label>
        <input type="text" id='userid' name='userid' />
<label htmlFor="completed">Completed?</label>
        <select id="completed" name="completed">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Submit'}
        </button>
      </form>

</>
  )
  }