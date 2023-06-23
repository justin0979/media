# Interfacing with API's using Async Thunk

Program will store list of users who have a list of albums containing a list of photos. <br />
Each list will be displayed as a dropdown menu.<br />
Each user will be able to add a new album and each album will be able to add a new photo.

Two ways to store data:

|                       **Denormalized Form**                        |                             **Normalized From**                              |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| Easier to use **if** the data is already structured as you need it | More flexible. With a little code, we can easily figure out any relationship |
| Good if your project has rock-solid requirements that won't change |                     **_Downside:_** More code to write!                      |
