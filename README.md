# planIt (version 2.0)

## About

### Description

planIt is a Trello inspired project management tool designed for service-professionals (e.g. Freelancers, Developers, Accountants, Lawyers etc.). Its purpose is to help organize tasks and deliverables by project, as well as track time. You can access the live app [here](https://just-plan-it.netlify.app/).

This is a re-factored version of planIt (version 1.0). The original version's repo can be found [here](https://github.com/KaunainKarmali/planIt/tree/production) and the live version can be accessed [here](https://plan-it-v1.netlify.app/).

### Key features

The following key features exist:
* Create, edit, and delete multiple tasks with deadlines
* Track time spent on each task

### Project status

While this project is functional, it is a re-factored version of the original planIt (version 1) app, and I am working on migrating additional key functionalities. Therefore, this project is currently in development. 

Currently working on the following features:
* Shifting away from firebase and migrating the backend functionality from version 1.0
* Migrating the functionality for each user to have a personal task board
* Migrating the functionality to create multiple projects
* Improving site responsiveness

## Getting started

Begin using the app by performing the following:

1. Clone down this repository. You will need `node` or `nodemon` and `npm` installed globally on your machine.

2. Begin running the app in your terminal
  * Run `npm i` to install dependencies
  * Run `npm start` while in the root folder

3. To use the app, go to `localhost:3000` on your browser

## Technology used

The following tech stack was used in the development of planIt:
* HTML5
* CSS
* JavaScript (ES6)
* React
* Node JS
* Express
* MongoDB
* Material-UI library

## Reflection

### How I got started

This project began as a to-do list in jQuery, then evolved into an app identical to Google's Keep app, and now has been transformed into a Trello-like project management app. planIt (version 1) project goals included learning how to build a full stack application by incorporating new technologies including Node, Express, and Mongo. This repo is for planIt (version 2), and its project goals include re-factoring key functionality from version 1.0, while improving on code quality. This includes, but is not limited to, incorporating best practices, improving responsiveness, and making the site more accessible. These are all practices I learned since making version 1.0. 

### The inspiration and journey of planIt

While building planIt (version 1), I was working at Ernst and Young in a client-facing role that requires working on multiple projects simultaneously. In this role, we are required to submit timesheets on a weekly basis for client billings. When time sheeting at the end of each week, I frequently ran into the dilemma of trying to recall how much time I spent on a task. This was the inspiration behind planIt, where users can track tasks by project and how much time was spent on tasks.

My technical challenge for planIt (version 2) was around making incremental decisions regarding what and how to re-factor key functionality from version 1.0 while researching and incorporating coding / accessibility best practices as I work to improve code quality. These incremental decisions have resulted in incorporating Styled Components to build my own custom components instead of relying on material-UI library, as well as breaking down components into smaller pieces to improve future scalability.  

Refer to the README of planIt (version 1) [here](https://github.com/KaunainKarmali/planIt/tree/production) for technical challenges in version 1. 

### Next steps

I am currently working on developing version 2.0 of planIt using my own custom components, instead of relying on the material-UI library. Version 2.0 is also aimed at incorporating coding best practices and accessibility considerations that I learned throughout my bootcamp.

## Contribute

Looking for contributors to improve this software's functionality for free users. I would love to hear from you if you are interested!

## Licence

MIT License

Copyright (c) 2021 Kaunain Karmali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
