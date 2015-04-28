
define([
	'Mousetrap',
	'libs/gamestrut/functionalStuff/key',
	'libs/gamestrut/functionalStuff/controller',
	'libs/gamestrut/functionalStuff/collision',
	'libs/gamestrut/functionalStuff/box2dvariables',
	'libs/gamestrut/entities/entity',
	'libs/gamestrut/entities/level'
], function (Mousetrap, Key, Controller, Collision, box2d, Entity, Level) {

	/**
	 * Animate Entity Object 
	 *
	 * Represents an entity in a 'level'.
	 *
	 * @type object
	 */
	var AnimateEntity = function (options) {

		Entity.call( this, options );

		// GENERAL STUFF
		this.type = 'AnimateEntity';
		this.x = this.x || 0;
		this.y = this.y || 0;
		this.width = this.width || 0;
		this.height = this.height || 0;
		this.level = this.level; 

		// ANIMATION STUFF
		this.time = new Date().getTime();

		// TEXTURE STUFF
		this.textures = {};
		this.previousTexture = this.texture;
		this.sx = this.sx || 0;
		this.sy = this.sy || 0;
		this.angle = this.angle || 0;
		this.lookingRight = this.lookingRight || true;
		this.lookingLeft = this.lookingLeft || false;
		this.color = this.color || 'green';
		this.zindex = this.zindex || '0';

		// SET SCALE
		this.SCALE = this.scale || 40;

		console.log( this );

		// INITIALIZE STUFF
		// COLLISIONS
		this.initCollisions();
		// CONTROLLERS
		this.initControllers();
		// PHYSICS
		if (typeof this.level != 'undefined') {
			this.initPhysics();
		}
	};

	// SET PROTOTYPE INHERITENCE
	AnimateEntity.prototype = Object.create( Entity.prototype );
	// SET CONSTRUCTOR OF ANIMATE ENTIY PROTOTYPE
	AnimateEntity.prototype.constructor = AnimateEntity;

	/**
	 * Sets up the entity for box2D
	 * physics.
	 *
	 * @return {undefined}
	 */
	AnimateEntity.prototype.initPhysics = function () {

		/* Physics Stuff */
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = this.density || 1;
		fixDef.restitution = this.restitution || 0;
		fixDef.friction = this.friction || 0.5;
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = (this.x + (this.width/2)) / this.SCALE;
		bodyDef.position.y = (this.y + (this.height/2)) / this.SCALE;
		bodyDef.angle = this.angle;
		fixDef.shape = new box2d.b2PolygonShape(); // sets type of shape
		fixDef.shape.SetAsBox((this.width / this.SCALE) / 2, (this.height / this.SCALE) / 2); // sets width & height
		this.body = this.level.world.CreateBody(bodyDef);
		this.body.SetUserData(this);
		this.body.CreateFixture(fixDef); // adds the defined body to the defined world.
	};

	return AnimateEntity;
});