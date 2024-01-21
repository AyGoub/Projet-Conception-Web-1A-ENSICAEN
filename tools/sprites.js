// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL, posX, posY, ctx) {
    this.image = new Image();
    this.image.src = imgURL;
    this.image.alt = "image";
    this.image.ctx = ctx;

    this.image.posX = posX;
    this.image.posY = posY;
    return this.image;
}
// -----------------------------------------------------------------------------------
// Dessine l'image sur le canvas
// imge: graphics source
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
function drawCanvasImage(image, posX, posY) {
    image.ctx.drawImage(image, posX, posY,512,256,0,0,512,256);
}
// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticalement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, widthTile, heightTile, nbXTiles, nbYTiles, ctx) {
    this.spriteImage = new Image();
    this.spriteImage.src = spriteImgURL;
    this.spriteImage.alt = "sprite image";

    this.x = x;
    this.y = y;
    this.widthTile = widthTile;
    this.heightTile = heightTile;
    this.nbXTiles = nbXTiles;
    this.nbYTiles = nbYTiles;
    this.ctx = ctx;
    this.loop = false;
    this.animations = {}; // Ajout de cette ligne pour initialiser l'objet d'animation
    this.currentAnimation = null;
    this.currentTile = 0;


}

// Ajout d'une animation spécifique
// nameAnim : nom de l'animation
// tiles : tableau d'indices de tile
CanvasSprite.prototype.addAnimation = function(nameAnim, tiles) {
    this.animations[nameAnim] = tiles;    
};

// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function(nameAnim, loop) {
    if (this.animations.hasOwnProperty(nameAnim)) {
        this.currentAnimation = nameAnim;
        this.currentTile = 0;
        this.loop = loop;
    } else {
        console.log("erreur");
    } 
};


// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function(tileIndex) {
    return (tileIndex % this.nbXTiles) * this.widthTile;
};

// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function(tileIndex) {
    return Math.floor(tileIndex / this.nbXTiles) * this.heightTile;
};

// Dessine une tile
CanvasSprite.prototype.drawTile = function(tileIndex) {
    let tileX = this.tileX(tileIndex);
    let tileY = this.tileY(tileIndex);
    
    this.ctx.clearRect(0, 0, 512, 256);
    this.ctx.drawImage(this.spriteImage, tileX, tileY, this.widthTile, this.heightTile, 0, 0, 512, 256);
};


// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function() {
    if (this.currentTile === this.animations[this.currentAnimation].length - 1) {
        this.currentTile = 0;
        return false;
    } else {
        this.drawTile(this.animations[this.currentAnimation][this.currentTile]);
        this.currentTile++;
        return true;
    }
};

// Dessine une tile
CanvasSprite.prototype.simpleAnim = function(tps) {
    this.spriteImage.timeId = setInterval(() => this.nextTile(), tps);
}

CanvasSprite.prototype.stopAnim = function() {
    clearInterval(this.spriteImage.timeId);
}
