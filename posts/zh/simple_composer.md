---
title: "Simple Composer"
date: "2020-01-19"
excerpt: "C Am G7 C"
sections: ["project"]
tags: ["React", "Axios", "Express", "MongoDB"]
---

## Simple Composer

An app that helps you write songs

[Source Code](https://github.com/timkuo25/SimpleComposer)

<iframe src="https://www.youtube-nocookie.com/embed/qE7vtyHC7jI" title="Simple Composer Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>

Frontend: React, Axios, Tonal.js, Howler.js

Backend: Express

Database: MongoDB

## Installation

1. After cloning the project, fill in your MongoDB URL in backend/.env.defaults and save the file

```
MONGO_URL={MongoDB URL}
```

2. Install node_modules in both frontend and backend

```bash
cd frontend
yarn
cd ../backend
yarn
```

3. Start the backend

```bash
yarn server
```

4. Open another terminal and start the frontend

```bash
yarn start
```

## How to use:

1. Enter a username
2. Choose a key
3. Choose chords
4. Play!

## Features

1. Enter a username and press Send. If the user doesn't exist in the database, you're taken to the key settings page. If the user already exists, their previously saved chart is loaded.
2. On the settings page, choose a key and octave, then press start to open the chart. The top right shows the username and the selected key and octave, and a default chart is shown based on the key.
3. On the chart page, you can click the key and octave values to change them. When you change the key, the chart is automatically transposed into chords of the new key
4. Click any chord to change it. The options are limited to the diatonic chords of the selected key
5. Press Save to save the current chart. For a new user, a new record is added to the database with the alert "Data added!"; for an existing user, their record is updated with the alert "Data saved!"
6. Press Play to play the current chart in order, skipping empty slots. Once you press Play, you can't press it again until the music finishes
7. Press Clear to clear the current chart
8. Press No Idea to replace the chart with the Canon chord progression
9. Press Change User to go back to the username page