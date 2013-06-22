# BlastEngine 

A basic framework for getting started with `canvas` game development

I've been working with `canvas` and [frame/time-based animations](http://viget.com/extend/time-based-animation) quite a bit [recently](http://puma.com/runpumarun). It's been a ton of fun, and I've learned quite a bit along the way. My purpose in creating this to share a simple starting point for anyone who wants to start playing around with canvas game dev.

This is by no means meant to be a complete framework. There are core elements missing.

## The Game

Check out the demo [here](http://greypants.github.com/blastEngine/).

The example I've created is a basic Galaga-esque space shooter. Right now, the game runs infinitely. You can blast bugs, but no collision detection has been set up on the ship itself - so you can't die. If you're here to learn and experiment, try hooking that up as your first goal!


## Code Walk-through
It is crucial to be as organized as possible. Game JS can get HUGE and nigh impossible to navigate if you're not careful. Break your code out into logical chucks and separate files and folders.  Helps you to keep your methods focused and specific, focusing on one concern at a time. Refactor often.

Here's my current setup:

### File (JavaScript) structure:
- javascript/engine
	- All the core game engine logic. The logic in these files are completely game agnostic. You should be able to build any game on top of them.
- javascript/engine/types
	- These are reusable classes you may want to extend to create your game objects.

- javascript/games
	- If you want to add a new game, create a folder with your game files here
- javascript/games/spaceBlaster
	- An example game, ready to be hacked on.

- init.js
	This is where you create the game to be loaded into index.html

### More documentation to come...
