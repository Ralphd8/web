const player1_name = document.getElementById('player1').value;
const player2_name = document.getElementById('player2').value;
var c = document.getElementById("grid");

const form = document.getElementById('players-name');
form.addEventListener('submit', submitForm);

const arrGrid = Array(9).fill("empty");
let gameOver = false;

var player_turn= "player1_name";
var shape = player_turn == "player1_name" ? "X" : "Circle";

function greetingMessage(){
    document.getElementById('display-players-names').textContent = `Hello ${player1_name} and ${player2_name}, you will play against each other!`;
}

function removeForm(){
    document.getElementById('players-name').style.display = 'none';
    document.getElementById('grid').style.display = 'block'
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('exit-button').style.display = 'block';
}

function drawGrid(){
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

function submitForm(e){
    e.preventDefault(); // stop page refresh

    greetingMessage();
    removeForm();
    drawGrid();
}
function drawX(fx,fy,lx,ly){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(lx, ly);
    ctx.moveTo(lx,fy);
    ctx.lineTo(fx,ly);
    ctx.stroke();
}

function drawCircle(fx, fy, lx, ly){
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
        return player2_name + " wins!"
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
        return player1_name + " wins!"
    }
    else if(arrGrid[0] !="empty" && 
            arrGrid[1] !="empty" && 
            arrGrid[2] !="empty" && 
            arrGrid[3] !="empty" && 
            arrGrid[4] !="empty" && 
            arrGrid[5] !="empty" && 
            arrGrid[6] !="empty" && 
            arrGrid[7] !="empty" && 
            arrGrid[8] !="empty" 
    ){
        return "Draw!";
    }
    else{
        return "still in play!"
    }
}

function LeaveGame(){
    window.location.replace("index.html");
}

function clickCanvas(e){
    if(gameOver == true) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const validity = checkLocationValidation(x,y);
    if(validity == "valid"){
        var playerTurnName = (player_turn == "player1_name" ? player2_name : player1_name) + " it is your turn!";
        document.getElementById('player-turn').innerHTML = playerTurnName;
        var fx = x <= 100 ? 0 : x <= 200 ? 100 : 200;
        var lx = x <= 100 ? 100 : x <= 200 ? 200 : 300;
        var fy = y <= 100 ? 0 : y <= 200 ? 100 : 200;
        var ly = y <= 100 ? 100 : y <= 200 ? 200 : 300;
        drawChoosedShape(fx,fy,lx,ly,shape);
        arrGrid[correspondantSection(x,y)] = shape;
        var newPlayerTurn = player_turn == "player1_name" ? "player2_name" : "player1_name";
        player_turn = newPlayerTurn;
        shape = player_turn == "player1_name" ? "X" : "Circle";
    }
    if(checkWinner(player1_name,player2_name) == "Draw!"){
        document.getElementById('player-turn').innerHTML = "Draw!"
        gameOver = true;
        return;
    }
    if(checkWinner(player1_name,player2_name) != "still in play!"){
        document.getElementById('player-turn').innerHTML = checkWinner(player1_name,player2_name);
        gameOver = true;
        return;
    }
}

function Reset(){
    arrGrid.fill("empty"); // clear data
    gameOver = false;      // allow clicking again

    var ctx = c.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height); // erase everything
    drawGrid(); // draw empty grid

    // reset player turn
    player_turn = "player1_name";
    shape = "X";
    document.getElementById('player-turn').innerHTML = document.getElementById('player1').value + ", it's your turn!";
        
}



function StartGame(){
    document.getElementById('player-turn').innerHTML = player1_name + " it is your turn!";

    c.addEventListener("click",clickCanvas);    
    
}









