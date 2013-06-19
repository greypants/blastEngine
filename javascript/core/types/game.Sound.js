Game.Sound = function(src, loop) {
	this.isEnabled = true;
	this.createAudioElement(loop);
	this.addSources(src, ['ogg', 'mp3']);
	!loop & this.changePlayStateOnEnded();
};

Game.Sound.prototype = {

	addSources: function(src, fileTypes) {
		fileTypes.forEach(function(extension){
			var source = this[src] = document.createElement('source');
			source.src = Game.audioPath + src + '.' + extension;
			source.type = 'audio/'+ extension;
			this.audio.appendChild(source);
		}.bind(this));
	},

	createAudioElement: function(loop) {
		this.audio = document.createElement("audio");
		this.audio.preload = 'auto';
		this.audio.loop = !!loop;
	},

	changePlayStateOnEnded: function() {
		this.audio.addEventListener('ended', function() {
			this.isPlaying = false;
		}.bind(this), false);
	},

	disable: function() {
		this.audio.pause();
		this.isEnabled = false;
	},

	enable: function() {
		this.isEnabled = true;
		this.resume();
	},

	play: function() {
		if(this.isEnabled) {
			this.isPlaying = true;
			clearTimeout(this.playTimeout);

			if(this.audio.readyState > 1){
				this.audio.currentTime = 0;
				this.audio.play();

			} else {
				this.playTimeout = setTimeout(function(){
					this.play();
				}.bind(this), 20);
			}
		}
	},

	pause: function() {
		this.audio.pause();
		this.isPlaying = false;
	},

	resume: function() {
		if(this.isEnabled && this.isPlaying) {
			this.audio.play();
		}
	},

	stop: function() {
		if(this.audio.readyState > 1) {
			this.audio.pause();
			this.audio.currentTime = 0;
			this.isPlaying = false;
		}
	}
};
