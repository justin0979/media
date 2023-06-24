# Interfacing with API's using Async Thunk

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

|          | Show Loading Message |      List of users       |  Show Error Message  |
| :------: | :------------------: | :----------------------: | :------------------: |
| property |     `isLoading`      |          `data`          |       `error`        |
|   type   |       boolean        | Array of objects (users) | null \| error object |
