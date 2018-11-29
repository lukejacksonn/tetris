# Tetris

> The classic NES Tetris built with hyperapp

I recently got quite hooked on watching the [CTWC](https://thectwc.com). This inspired me to go try build the game Tetris for myself in order to better understand the game. There has been talk on the [hyperapp slack](https://hyperapp.slack.com) about creating a project – working application built with hyperapp – that we can use to dogfood new ideas and serve as a reference when creating new apps.

The idea of a game came up and it seemed like a good theme to run with; limited enough in scope but complex enough to stress test design patterns and perf. I wanted to implement a dependency _and_ build step free project as to put focus mostly on the application code as well as structure.

A lot of the code has been copied and adapted from two codepens:

- [Falling blocks](https://codepen.io/zaceno/pen/JreKPN) by [Zacharias Enochsson](https://github.com/zaceno) built with Hyperapp V1
- [Saigon Racer](https://codepen.io/zaceno/pen/JreKPN) by [Luke Jackson](https://github.com/lukejacksonn) built with Hyperapp V2

## Output

The application currently looks like this and you can [play it online here](https://tetris-rbizvjgqbj.now.sh):

<img width="606" alt="screen shot 2018-11-29 at 16 58 38" src="https://user-images.githubusercontent.com/1457604/49238355-256adf00-f3f8-11e8-872f-63c44df57b02.png">

## TODO

This project has been left unoptimized in places. There is a lot of low hanging fruit when it comes to features or details to add. The aim is to replicate the [classic NES version](https://jsnes.org/run/Tetris) as closely as possible for fun!

See the project [issues](https://github.com/lukejacksonn/tetris/issues) to see what needs to be done or create a new issue.
