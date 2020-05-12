var building
var background = function(window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app, ground) {
        /* Error Checking - DO NOT DELETE */
        if (!app) {
            throw new Error("Invaid app argument");
        }
        if (!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;

        // container which will be returned
        var background;

        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];

        function rColor() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        function rTall() {
            var tall = Math.floor(Math.random() * 255);
            return tall
        }
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, 'goldenrod');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a moon and starfield

            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth / 1.5;
            moon.y = groundY / 2;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);
            var circle;
            for (var i = 0; i < 50; i++) {
                circle = draw.circle(10, rColor(), rColor(), 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = rTall();
                var x = 75;
                var building = draw.rect(75, buildingHeight, rColor(), 'Black', 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            // TODO 4: Part 1 - Add a tree


            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth / 2;
            tree.y = groundY / 2;
            background.addChild(tree);

        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            tree.x--;
            tree.y--;

            // TODO 4: Part 2 - Move the tree!
            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            if (tree.y < -400) {
                tree.y = canvasHeight;
            }

            // TODO 5: Part 2 - Parallax
            buildings.forEach(moveAndCheck);
            
        } // end of update function - DO NOT DELETE
        
        function moveAndCheck(someBuilding, ix, abs) {
            if (someBuilding.x < 0) {
                var buildingHeight = rTall();
                var newBuilding = draw.rect(75, buildingHeight, rColor(), 'Black', 1);
                newBuilding.x = canvasWidth;
                newBuilding.y = groundY - buildingHeight;
                abs[ix] = newBuilding;
                background.addChild(newBuilding);
                background.removeChild(someBuilding);

            }
            else { someBuilding.x -= 0.5 }
        }


        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
