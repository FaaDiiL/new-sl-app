# New-SL-App

## _This is a extension for the sl app that lets you use bikes!_

This is a app for you when you need som other alternative to busses, trains, boats.
Bikes is now available!

- Buy a single ticket
- Click on the reserve bike text on the ticket.
- Select a bike with a black background.
- Press on the confirm button
- When the bike journey ends press the red exit button

## Demo

- [Demo] - Try it out!

## Features

- Choose a more green alternative modes of transport.
- pick a bike close to you from a map view.

## Tech

New-Sl-App uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps!
- [ReactRouter] - Handleing the rotes on the page
- [StyledComponents] - This is for styling the code.
- [node.js] - Installing pakages

## Installation

New-SL-App requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd new-sl-app
git clone https://github.com/FaaDiiL/new-sl-app.git .
npm i
npm start
```

do not forget to add your api-key if it's not working.
Go to src/components/bikeMap/BikeMap.js

```js
const accessToken =
  'pk.eyJ1IjoiZmFkaWxtYXAiLCJhIjoiY2t1dWU5OGp3MWtvbzJvcXZybzlpNXFhcSJ9.893BxZCnUJJSSZPa475ibA'
```

## License

MIT

**Free Software, Ohh Yeah!**

[//]: # 'Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax'
[demo]: https://new-sl-app.surge.sh/
[reactjs]: https://reactjs.org/
[reactrouter]: https://reactrouter.com/
[styledcomponents]: https://styled-components.com/
[node.js]: http://nodejs.org
