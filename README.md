Welcome hero,

here is a small application that can help you find any gnome in a city!
You can use any gnome's engineering machine to access the application: laptop, tablet or mobile.

In the application you can see a gallery of every gnome in the city.
Each card in gallery shows avatar image, name and professions of gnome.
You can click on a card and see some details.
(And it also shows gender - male gnomes have red badge on its name)

On top of the page you can see a gears icon. Press on it and filters panel will be opened.
Here you can filter the list by various parameters.

Of course, I made this application ready for you!
You can find it up and running on
https://gnomes-library.vercel.app/

You can also start this application by yourself! 
In the project directory:
At first, run
### `yarn`
or
### `npm install`
to install all project dependencies

Then, just run
### `yarn start`
or
### `npm start`
and the app will be available in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To run tests in the application just run
### `yarn test`
or
### `npm test`
These commands launches the test runner in the interactive watch mode.<br />

And of course, you can build this application for production by running
### `yarn build`
or
### `nom run build`

It builds the app for production to the `build` folder.<br />
Your app is ready to be deployed!

## ToDo
There are still few improvements I would like to implement.
For example, I'm using a ResponsiveImage component to display images on cards. The idea of it is display lightweight image
as a placeholder and allow browser to download full-size image in the background. When it is loaded - just use fullsized.
Unfortunately, those gnomes do not provide thumbnail and fullsize images separately. They just use one URL.
If we can force those lazy creatures to give us small thumb - application performance can be improved.

