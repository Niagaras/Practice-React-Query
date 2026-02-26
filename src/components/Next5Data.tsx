import { useInfiniteQuery } from '@tanstack/react-query'
import type { Todo } from '../components/QueryBasics'
import { Fragment } from 'react/jsx-runtime';

    interface todoResponse {
        todos: Todo[],
        total: number,
        skip: number,
        limit: number,
    }

export default function Next5Data() {

    const {
        data,
        isPending,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<todoResponse, Error>({
        queryKey: ['infinite-todos'],
        initialPageParam: 0,
        queryFn: async({ pageParam }) : Promise<todoResponse> => {
            const limit = 5
            const skip = (pageParam as number ) * limit
            const res = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
            return res.json();
        },
        getNextPageParam: (lastPage, allPages) : number | undefined => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? allPages.length : undefined;
        },
        });

        if(isPending) return <div>Loading...</div>
        if(isError) return <div>Error: {error.message}</div>    

  return (
    <div>
        <h2>Next 5 Data</h2>
        {
            data.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}> 
                {page.todos.map((item) => (
                    <div key={item.id}>
                        {item.todo}
                    </div>
                ))}
                </Fragment>

            ))
        }
        <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
        >
            {
                isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No more data'
            }

        </button>
    </div>
  )
}
