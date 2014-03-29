blastEngine = require '../blastEngine'

class Ship extends blastEngine.DisplayObject
	fireButtonReleased: true
	height: 160
	maxMissiles: 3
	missiles: []
	now: 0
	repeatRate: 30
	speed: 300
	then: 0
	vx: 0
	width: 160

	constructor: ({@stage, @frames}, options) ->
		@ctx = @stage.ctx
		if options
			@extendWith options
		@setProperties()
		@centerOnScreen()
		# @loadMissiles()

	centerOnScreen: ->
		@x = @stage.width / 2 - @width / 2
		@y = @stage.height - @height - 25

	setProperties: ->
		@image = new blastEngine.Graphic(@stage.ctx, "images/ship.png")
		@laserSound = new blastEngine.Sound("audio/laser")
		@explodeSound = new blastEngine.Sound("audio/explode")
		@thrust =
			left: 0
			right: 0
		# User defineable settings

	moveLeft: (state) =>
		if state is 'down'
			@thrust.left = @speed * @frames.delta
			@vx -= @thrust.left
		else if state is 'up'
			@vx += @thrust.left

	moveRight: (state) =>
		if state is 'down'
			@thrust.right = @speed * @frames.delta
			@vx += @thrust.right
		else if state is 'up'
			@vx -= @thrust.right

	loadMissiles: ->
		i = 0
		while i < @maxMissiles
			@missiles.push new Missile(@)
			i++

	fire: (state) =>
		if state is 'down'
			@laserSound.play()

		# @fireButtonReleased = true
		# @now = @frames.now
		# fireDelta = (@now - @then) / 1000
		# missilesLoaded = @missiles.length > 0
		# gunIsCool = fireDelta > 1 / @repeatRate
		# readyToFire = gunIsCool and missilesLoaded and @fireButtonReleased
		# if readyToFire
		# 	@laserSound.play()
		# 	@fireButtonReleased = false
		# 	@missiles[0].fire()
		# 	@then = @now

	drawType: ->
		@image.draw()

	die: ->
		@explodeSound.play()

module.exports = Ship
