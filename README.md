# Interfacing with API's using Async Thunk

**_Note:_** This program is for learning purposes only. Comments throughout the code are used as such.

Program will store list of users who have a list of albums containing a list of photos. <br />
Each list will be displayed as a dropdown menu.<br />
Each user will be able to add a new album and each album will be able to add a new photo.

When building a redux store, there are choices to be made in how to store data (most follow Normalized).

|                       **Denormalized Form**                        |                             **Normalized From**                              |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| Easier to use **if** the data is already structured as you need it | More flexible. With a little code, we can easily figure out any relationship |
| Good if your project has rock-solid requirements that won't change |                     **_Downside:_** More code to write!                      |

A problem that can arise with `Denormalized Form` is that if the structure of the data changes, this
could lead to:

-   needing to map over each user
    -   needing to map over each album
    -   the containing user would need to be passed into the album component

This could become confusing; however, if the UI is not expected to change over time, then this form
is good to use.

**_Note:_** If using a `Denormalized Form`, code within the redux store can be used to reduce the `Denormalized Form`
into the `Normalized Form`.

For this project, the `Normalized Form` will be used.

### Options for Data Fetching

For this project (which is for practice), both `Async Thunk` functions and
`Redux Toolkit Query` will be used.

Async Thunk functions will handle users (i.e., fetching list of users, creating user,
and deleting user).

Redux Toolkit Query will be used to handle albums and photos.

**_IMPORTANT:_** **Never** make requests in reducers.

**Reducers should:**

-   always be 100% synchronous
-   only operate on their arguments - no outides variables

## Program Features

1.  When user first comes to the application, a list of users must immediately be fetched

    -   When request is made, show "Loading..." message so user knows that data is being fetched.

2.  Once response is received:

    -   Hide the "Loading..." message
    -   Show the list of users that was just fetched

3.  If anything goes wrong with the request, then display an error message

3 peices of state will be added into the user's slice to track the above list.

|              | Show Loading Message |      List of users       |  Show Error Message  |
| :----------: | :------------------: | :----------------------: | :------------------: |
| **property** |     `isLoading`      |          `data`          |       `error`        |
|   **type**   |       boolean        | Array of objects (users) | null \| error object |

For every request, there will be multiple actions. `isLoading` will be set to true/false
and either receive a successful response or receive an error.

-   Start request and successfully get response
-   Start request and receive error.

When a request is started, Async Thunk Function will automatically dispatch an action.
This action will have a type of like `pending`. That dispatch will go to all of the
reducers and the state of `isLoading` will be set to `true`.

With a success, eventually a response will be received and the Async Thunk Function will
see there were no errors and automatically dispatch a second action with a type like
`fulfilled`. This dispatch will go through all of the different reducers `data` will
be updated and the `isLoading` flag will be set to `false`.

With an error, the start of the request will be exactly the same as with a success.
When error occurs, Async Thunk Function will see something went wrong and automatically
dispatch an action with type like `rejected`. This dispatch will got through all of the
reducers and `isLoading` is set to `false` and `error` will be set to the error object.
The `action` in `(state, action) => {}` will have `action.error` property which will be
set to `state.error`.

### "Fine-Grained" Loading State

"Fine-Grained" loading state is maintaining separate state variables for each kind of
request.

When `+ Add User` button is clicked, a loading spinner should show only on that button.

There are 2 options:

|                   Option 1                    |                      Option 2                      |
| :-------------------------------------------: | :------------------------------------------------: |
| Keep track of requests in state in components |       Keep track of requests in redux store        |
|                  `useState`                   | Use `requestId` that is returned from `dispatch()` |
|      Good for really small applications       |            Good for larger applications            |

### Albums

When dropdown menu of user is opened, only the albums that the user created will be
fetched and listed.

#### User

| field |  type  |                notes                 |
| :---: | :----: | :----------------------------------: |
|  id   | number | ID randomly generated by JSON-Server |
| name  | string | Name randomly generated by React App |

#### Album

| field  |  type  |                notes                 |
| :----: | :----: | :----------------------------------: |
|   id   | number | ID randomly generated by JSON-Server |
| title  | string | Name randomly generated by React App |
| userId | number | ID of the user that owns this album  |

#### Photo

|  field  |  type  |                   notes                    |
| :-----: | :----: | :----------------------------------------: |
|   id    | number |    ID randomly generated by JSON-Server    |
|   url   | string |       URL where the image is hosted        |
| albumId | number | ID of the album that this photo belongs to |

#### Steps for Creating a RTK Query API

1.  Identify a group of related requests that your app needs to make
2.  Make a new file that will create the applications
3.  The API needs to store a ton of state related to data, request status, errors. Add a `reducerPath`
4.  The API needs to know where to send requests. Add a `baseQuery`
5.  The API needs to know what specific requests you want to make. Add `endpoints`
6.  Export all of the automatically generated Hooks
7.  Connect the API to the store. Reducer, middleware, and listeners
8.  Export the hooks from the `store/index.ts` file
9.  Use the generated hooks in a component

#### Questions to ask for endpoints:

| Questions                                                    |     Fetching     |     Creating      |      Removing      |
| :----------------------------------------------------------- | :--------------: | :---------------: | :----------------: |
| What's the goal?                                             |   fetch albums   |  create an album  |  remove an album   |
| What's a simplified name?                                    |  `fetchAlbums`   |   `createAlbum`   |   `removeAlbum`    |
| Is this a query or a mutation?                               |      query       |     mutation      |      mutation      |
| What's the path for this request, relative to the `baseUrl`? |    `/albums`     |     `/albums`     | `/albums/ +userId` |
| What's the query string for this request?                    | `?userId=userId` |         -         |         -          |
| What's the method for this request?                          |       GET        |       POST        |        POST        |
| What's the body for this request?                            |        -         | `{title, userId}` |         -          |

#### Accessing a Specific User's Albums

Since the `Album` object contains the property `userId`, it is easy to find which albums belong to which user
when the user's dropdown button is clicked to display the list of albums. However, what if the album's object
did not contain the `userId` property, how could it be determined which album belonged to which user?

The implementation of fetching, adding and removing albums of a specific user follows the method of **not**
using `album.userId`. Instead, a user's list of albums will be identified as that users with a tag. The tag
`{type: "UsersAlbums", id: user.id}` will be the last object pushed into an array of albums' tags
`{type: "Album", id: album.id}`. This last object identifies which albums belong to which user whenever the
dropdown menu is displayed.

Fetching the list of albums belonging to a specified user will have the tag `{type: UsersAlbums, id: user.id}`
marking all of the albums in this array as this user's album list.

Adding an album to a user's list requires that the `user` object be passed to the `useAddAlbumMutation()`, so,
the tag `{type: "UsersAblums", id: user.id}` will mark the fetched album list as being stale and re-run
the query to fetch the albums.

Removing albums from a user's album list are tageed with `{type: "Album", id: album.id}` (instead of
`{type: "Album", id: album.userId}`) since the fetched list has `{type: "UsersAlbums, id: user.id"}` to
identify which user's list is being mutated.

## Custom Hooks

Goal is to wrap up the loading state & error state (used with `useState` in `UsersList` component).

Instead of having two separate state variables:

```javascript
const [isLoadingUsers, setIsLoadingUsers] = useState(false);
const [loadingUsersError, setLoadingUsersError] = useState(null);
```

use:

```javascript
import { fetchUsers } from "../store";

const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
```

-   `doFetchUsers` - function to start data loading process. Calling this function does the following:
    -   run the thunk and dispatch the result
    -   update loading state and error state appropriately
-   `isLoadingUsers` - a boolean that keeps track of whether users are being fetched.
-   `loadingUsersError` - will be `null` or an error object. Keeps track of whether there was an error
    fetching users.

### Side Notes

<details>
<summary>AppDispatch</summary>
The default dispatch type will need to be changed to correctly dispatch thunks.<br />
First, export the dispatch type from the configuredStore:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

// Inferred type: { users: UsersState }
export type AppDispatch = typeof store.dispatch;
```

```javascript
const dispatch = useDispatch<AppDispatch>();
```

Official docs from [Define Root State and Dispatch Types](https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types).

<hr />

</details>

<details>
<summary>dispatch(fetchUsers())</summary>

`dispatch(fetchUsers())` will return a `promise`; however, the `promise`'s `.then()` gets called
_whether the request succeeds **or** fails_.

A fix is to add `.unwrap()`, which returns a new `promise` that will follow the conventional rules.

```javascript
dispatch(thunk())
    .unwrap()
    .then(() => setIsLoadingUsers(false))
    .catch((err: SerializedError) => {
        setIsLoadingUsers(false);
        setLoadingUsersError(err);
    });
```

To remove redundant code (`setIsLoadingUsers(false)`), use `.finally()`:

```javascript
dispatch(thunk())
    .unwrap()
    .catch((err: SerializedError) => setLoadingUsersError(err))
    .finally(() => setIsLoadingUsers(false));
```

<hr />

</details>
