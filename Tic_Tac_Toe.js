/*function greetingMessage(){
    const form = document.getElementById('players-name');
    const greeting = document.getElementById('display-players-names');

    form.addEventListener('submit', function(e){
        e.preventDefault();  // ✅ stops page from refreshing
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        greeting.textContent = `Hello ${player1} and ${player2}, you will play against each other!`;
    });
}*/

const arrGrid = Array(9).fill("empty");

function greetingMessage(){
    const greeting = document.getElementById('display-players-names');
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    greeting.textContent = `Hello ${player1} and ${player2}, you will play against each other!`;
}

function removeForm(){
    document.getElementById('players-name').style.display = 'none';
    document.getElementById('grid').style.display = 'block'
    document.getElementById('reset-button').style.display = 'block';
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('exit-button').style.display = 'block';
}

function drawGrid(){
    var c = document.getElementById("grid");
    var ctx = c.getContext("2d");
    
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.moveTo(0,100);
    ctx.lineTo(300,100);
    ctx.moveTo(0,200);
    ctx.lineTo(300,200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
}

const form = document.getElementById('players-name');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // stop page refresh

    greetingMessage();
    removeForm();
    drawGrid();
});

function drawX(fx,fy,lx,ly){
    var c = document.getElementById("grid");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(lx, ly);
    ctx.moveTo(lx,fy);
    ctx.lineTo(fx,ly);
    ctx.stroke();
}

function drawCircle(fx, fy, lx, ly){
    var c = document.getElementById("grid");
    var ctx = c.getContext("2d");

    const centerX = fx + (lx - fx) / 2;
    const centerY = fy + (ly - fy) / 2;
    const radius = Math.min(lx - fx, ly - fy) / 2 - 10;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawChoosedShape(fx,fy,lx,ly,shape){
    if(shape == "Circle"){
        drawCircle(fx,fy,lx,ly);
    }
    else{
        drawX(fx,fy,lx,ly);
    }
}

function checkWinner(player1_name,player2_name){
    if (
        (arrGrid[0]=="Circle" && arrGrid[1] == "Circle" && arrGrid[2] == "Circle")
        ||
        (arrGrid[3]=="Circle" && arrGrid[4] == "Circle" && arrGrid[5] == "Circle")
        ||
        (arrGrid[6]=="Circle" && arrGrid[7] == "Circle" && arrGrid[8] == "Circle")
        ||
        (arrGrid[0]=="Circle" && arrGrid[3] == "Circle" && arrGrid[6] == "Circle")
        ||
        (arrGrid[1]=="Circle" && arrGrid[4] == "Circle" && arrGrid[7] == "Circle")
        ||
        (arrGrid[2]=="Circle" && arrGrid[5] == "Circle" && arrGrid[8] == "Circle")
        ||
        (arrGrid[0]=="Circle" && arrGrid[4] == "Circle" && arrGrid[8] == "Circle")
        ||
        (arrGrid[2]=="Circle" && arrGrid[4] == "Circle" && arrGrid[6] == "Circle")
        ){
        return player1_name + " wins!"
    }
    else if (
        (arrGrid[0]=="X" && arrGrid[1] == "X" && arrGrid[2] == "X")
        ||
        (arrGrid[3]=="X" && arrGrid[4] == "X" && arrGrid[5] == "X")
        ||
        (arrGrid[6]=="X" && arrGrid[7] == "X" && arrGrid[8] == "X")
        ||
        (arrGrid[0]=="X" && arrGrid[3] == "X" && arrGrid[6] == "X")
        ||
        (arrGrid[1]=="X" && arrGrid[4] == "X" && arrGrid[7] == "X")
        ||
        (arrGrid[2]=="X" && arrGrid[5] == "X" && arrGrid[8] == "X")
        ||
        (arrGrid[0]=="X" && arrGrid[4] == "X" && arrGrid[8] == "X")
        ||
        (arrGrid[2]=="X" && arrGrid[4] == "X" && arrGrid[6] == "X")
        ){
        return player2_name + " wins!"
    }
    else{
        return "still in play!"
    }
}

function LeaveGame(){
    window.location.replace("index.html");
}

function reset(){
    for (let i =0;i<arrGrid.length;i++){
        arrGrid[i] = "empty";
    }
    var c = document.getElementById("grid");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    
    drawGrid();
}

function correspondantSection(x,y){
    if(x>=0 && x <=100 && y >= 0 && y <= 100){
        return 0;
    }
    else if(x>=100 && x <=200 && y >= 0 && y <= 100){
        return 1;
    }
    else if(x>=200 && x <=300 && y >= 0 && y <= 100){
        return 2;
    }
    else if(x>=0 && x <=100 && y >= 100 && y <= 200){
        return 3;
    }
    else if(x>=100 && x <=200 && y >= 100 && y <= 200){
        return 4;
    }
    else if(x>=200 && x <=300 && y >= 100 && y <= 200){
        return 5;
    }
    else if(x>=0 && x <=100 && y >= 200 && y <= 300){
        return 6;
    }
    else if(x>=100 && x <=200 && y >= 200 && y <= 300){
        return 7;
    }
    else{
        return 8;
    }
}

function checkLocationValidation(x,y){
    const section = correspondantSection(x,y);
    if(arrGrid[section] == "empty"){
        return "valid";
    }
    else{
        return "not valid";
    }
}

/*function StartGame(){
    const player1_name = document.getElementById('player1').value;
    const player2_name = document.getElementById('player2').value;
    var player_turn= "player1";
    var shape = player_turn == "player1" ? "X" : "Circle";

    const canvas = document.getElementById('grid');

    while(checkWinner(player1_name,player2_name) == "still in play!"){
        document.getElementById('player-turn').innerHTML = player1_name + " it is your turn!";

        canvas.addEventListener("click",function(e){
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const valididy = checkLocationValidation(x,y);
            if(valididy == "valid"){
                var fx = x < 100 ? 0 : x < 200 ? 100 : 200;
                var lx = x < 100 ? 100 : x < 200 ? 200 : 300;
                var fy = y < 100 ? 0 : y < 200 ? 100 : 200;
                var ly = y < 100 ? 100 : y < 200 ? 200 : 300;
                drawChoosedShape(fx,fy,lx,ly,shape);
                arrGrid[correspondantSection(x,y)] = shape;
                var newPlayerTurn = player_turn == "player1" ? "player2" : "player1";
                player_turn = newPlayerTurn;
            }
        });
    }
    document.getElementById('player-turn').innerHTML = checkWinner(player1_name,player2_name);

}*/

function StartGame(){
    const player1_name = document.getElementById('player1').value;
    const player2_name = document.getElementById('player2').value;
    var player_turn= "player1";
    var shape = player_turn == "player1" ? "X" : "Circle";
    document.getElementById('player-turn').innerHTML = player1_name + " it is your turn!";
    const canvas = document.getElementById('grid');

    canvas.addEventListener("click",function(e){
        if(checkWinner(player1_name,player2_name) != "still in play!"){
            document.getElementById('player-turn').innerHTML = checkWinner(player1_name,player2_name);
            return;
        }
        var playerTurnName = (playerTurn == "player1" ? player1_name : player2_name) + " it is your turn!";
        document.getElementById('player-turn').innerHTML = playerTurnName;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const validity = checkLocationValidation(x,y);
        if(validity == "valid"){
            var fx = x <= 100 ? 0 : x <= 200 ? 100 : 200;
            var lx = x <= 100 ? 100 : x <= 200 ? 200 : 300;
            var fy = y <= 100 ? 0 : y <= 200 ? 100 : 200;
            var ly = y <= 100 ? 100 : y <= 200 ? 200 : 300;
            drawChoosedShape(fx,fy,lx,ly,shape);
            arrGrid[correspondantSection(x,y)] = shape;
            var newPlayerTurn = player_turn == "player1" ? "player2" : "player1";
            player_turn = newPlayerTurn;
            shape = player_turn == "player1" ? "X" : "Circle";
        }
    });    
    
    
}







