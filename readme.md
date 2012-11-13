# Blockblaster: A basic canvas game boilerplate

I've been working with `canvas` and [frame/time-based animations](http://viget.com/extend/time-based-animation) quite a bit [recently](http://puma.com/runpumarun). It's been a ton of fun, and I've learned quite a bit along the way. My purpose in creating this is to improve upon a few patterns, apply some lessons learned, and create a decent, re-usable starting point for my own future projects.

If you haven't worked with canvas yet, my hope is that this will give you a great place to start. If you have already had the pleasure (and sometimes pain), I hope you pick up a few new ideas, and share a few of your own.

## The Game

The example I've created is a basic Galaga-esque space shooter. This project is very much in flux, and may change quite a bit in the coming days and weeks.

Check out the demo [here](http://greypants.github.com/blockblaster-boilerplate/).

## Code Walk-through
It is crucial to be as organized as possible. Game JS can get HUGE and nigh impossible to navigate if you're not careful. Break your code out into logical chucks and separate files and folders.  Helps you to keep your methods focused and specific, focusing on one concern at a time. Refactor often. Here's my current setup:

### File (JavaScript) structure:
- javascript/dependencies
	- Polyfills (requestAnimationFrame, etc.)
	- Libraries (jQuery, easelJS, etc.)
	- Anything else you didn't write :)
- javascript/scenes
	- Scenes are separate logical segments like an intro screen, an instruction screen, a level, a game over screen, etc.
	- Each scene may have different objects and event responses associated with it
- javascript/types
	- **Object**: This is my base object, on which most of my graphic Types extend.
	- **Image**: For creating and drawing images to the canvas.
	- **Rectangle**: For creating and drawing simple rectangles to the canvas.
	- **Enemy**: The baddies.
	- **Missile**: The bullets.
	- **Ship**: The player.
- root
 - **init**: Sets up the and starts the game.
 - **core**: Where I keep my global setup and helper methods that get used game-wide.
 - **frames**: Controls the progression of animationFrames and the game itself.
 - **input**: Manages all user input (mouse, keyboard, touch, etc.)

 ### Frame-based programming with time-based animation
 All this magic happens in game.frames.js. For a fuller explanation of the concept, see my [blog post](http://viget.com/extend/time-based-animation)

 ### Object Oriented JavaScript and the `prototype` chain
 Coming soon...

 ### Handling User Input
 Coming soon...

 ## Handling Collisions
 Coming soon...

 ## My To-do List
 - Add a Sprite type
 - Add animation handling
 - Add audio handling
 - Finish documentation