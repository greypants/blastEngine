class window.GameObject
	initialize: (properties)->
		@set properties  if properties

	set: (properties) ->
		for property of properties
			this[property] = properties[property]
		@color = @color or "black"
		@rotation = @rotation or 0
		@scale = @scale or 1

	draw: ->
		Game.ctx.save()

		# Round to whole pixel
		x = (@x + 0.5) | 0
		y = (@y + 0.5) | 0

		# Apply Transformations (scale and rotate from center)
		Game.ctx.translate x + @width / 2, y + @height / 2
		Game.ctx.rotate @rotation
		Game.ctx.scale @scale, @scale
		Game.ctx.translate -@width / 2, -@height / 2

		# Call extended Object Type's draw method
		@drawType?()
		Game.ctx.restore()