# INFO6250 Final Project

Name: Zhen Li   NUID: 001543167

## Topic

This is a chat app with login/logout and polling to see new messages

## How to start

You should `npm install`, `npm run build` and then `npm start`.

## HomePage

When the page loads, it will make a fetch call to see if the user is already logged in.
-If the user is logged in, he/she will see the chat page.
-If the user is not logged in, he/she will see the login page.

## Login Page

There is a login form, people need to input their username to login.
-If there is no username in the input field, the login button will be disabled.
-The username "dog" is not allowed.
-Special characters are not allowed.
-An error message will be shown to the user if the login fails.

## Chat Page

There is a message list to show previous messages, a textarea to send new message and two contol buttons.

The message list shows all previous messages like a real chat app.
-It shows who send the message and what the message is.
-When you logout and login again, you can see the new messages while your absence.
The textarea allows you to send new messages.
-When the area is empty, you can't send.
There is a mode button at the bottom.
-The default theme for new users is light. You can click the button to change theme between light and dark.(UI interactions that require state management)
-After you logout, the user setting is saved and will not reset when you login again.
There is also a logout button at the bottom
-When you click the button, you will logout and login page will be shown.
