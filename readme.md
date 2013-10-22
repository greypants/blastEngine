# BlastEngine 
![](https://raw.github.com/greypants/blastEngine/master/images/ship.png)

### A starter framework for getting started with `canvas` game development
#### [Click Here for Demo](http://greypants.github.com/blastEngine/)

I've been working with `canvas` and [frame/time-based animations](http://viget.com/extend/time-based-animation) quite a bit [recently](http://puma.com/runpumarun). It's been a ton of fun, and I've learned quite a bit along the way. My purpose in creating this to share a simple starting point for anyone who wants to start playing around with canvas game dev. I also recently gave a talk about [HTML 5 Game dev with Canvas and JavaScript](http://greypants.github.io/html5-games-talk/#/) at [ConvergeRVA](http://convergerva.com/) and [Front-end Design Conference](http://frontenddesignconference.com/). Check out those slides for more info.

This is by no means meant to be a complete framework, but rather a way to start experimenting and get your feet wet. There are core classes missing for things like Sprites and Tweens.

I also chose to use plain vanilla JavaScript - no frameworks, libraries, script loaders, or compilation. I did this to keep the example simple, and to better expose the underlying principles at work. In real life, I'd probably be using the tools and syntax provided by CoffeeScript, Underscore.js, and Almond.js or Require.js.

## The Sample Game

![](https://raw.github.com/greypants/blastEngine/master/images/enemy.png)

The example I've created is a bare-bones Galaga-esque space shooter. Right now, the game runs infinitely. You can blast bugs until your ship collides with one and the game resets.

*Sweet game illustrations by [Joseph Le](http://www.josephle.net/)*


## Code Walk-through
It is crucial to be as organized as possible. Game JS can get HUGE and nigh impossible to navigate if you're not careful. Break your code out into logical chucks and separate files and folders.  Helps you to keep your methods focused and specific, focusing on one concern at a time. Refactor often.

Here's my current setup:

### File (JavaScript) structure:
- javascript/engine
	- All the core game engine logic. The logic in these files are completely game agnostic. You should be able to build any game on top of them.
- javascript/engine/objects
	- These are reusable classes you may want to extend to create your game objects.

- javascript/games
	- If you want to add a new game, create a folder with your game files here
- javascript/games/spaceBlaster
	- An example game, ready to be hacked on.

- init.js
	This is where you create the game to be loaded into index.html

### More documentation to come...
