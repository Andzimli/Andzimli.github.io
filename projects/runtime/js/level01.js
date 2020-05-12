var level01 = function(window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 400, "y": groundY -120 },
                { "type": "sawblade", "x": 700, "y": groundY -70 },
                { "type": "rock", "x": 1000, "y": groundY -95 },
                { "type": "enemy", "x": 1100, "y": groundY -60 },
                { "type": "enemy", "x": 1200, "y": groundY -60 },
                { "type": "enemy", "x": 1300, "y": groundY -60 },
                { "type": "rock", "x": 1400, "y": groundY -75 },
                { "type": "reward", "x": 1500, "y": groundY -150 },

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x; //levelData.gameItems[i].x;
            sawBladeHitZone.y = y; //levelData.gameItems[i].y;
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            sawBladeHitZone.addChild(obstacleImage);
            game.addGameItem(sawBladeHitZone);
        }

        function createRock(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 5;
            var rockHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            rockHitZone.x = x; //levelData.gameItems[i].x;
            rockHitZone.y = y; //levelData.gameItems[i].y;
            var obstacleImage = draw.bitmap('img/moon.1.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            rockHitZone.addChild(obstacleImage);
            game.addGameItem(rockHitZone);
        }

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50, 50, 'firebrick');
            redSquare.x = -25;
            redSquare.y = -25;
            var redCircle = draw.circle(25, 50, 'red');
            redCircle.x = 0;
            redCircle.y = -40;
            enemy.addChild(redCircle);
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -0.55;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-20);
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.fadeOut();
            };

        }

        function createReward(x, y) {
            var reward = game.createGameItem('reward', 25);
            var rewardLook = draw.bitmap('img/op-spark-logo.png');
            rewardLook.x = -25;
            rewardLook.y = -25;
            reward.addChild(rewardLook);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -0.55;
            game.addGameItem(reward);
            reward.onPlayerCollision = function() {
                game.increaseScore(1000);
                reward.fadeOut();
            };
        }
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItemObject = levelData.gameItems[i];
            var obstacleType = gameItemObject.type;
            var obstacleX = gameItemObject.x;
            var obstacleY = gameItemObject.y;
            if (obstacleType === 'sawblade') {
                createSawBlade(obstacleX, obstacleY);
            }
            if (obstacleType === 'rock') {
                createRock(obstacleX, obstacleY);
            }
            if (obstacleType === 'enemy') {
                createEnemy(obstacleX, obstacleY);
            }
            if (obstacleType === 'reward') {
                createReward(obstacleX, obstacleY);
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
