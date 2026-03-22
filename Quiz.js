const greeting_form = document.getElementById('greeting-form');
const ex_form = document.getElementById('exercises');
const submission = document.getElementById('submission');

const questions = ["What is the largest country in the world?",
                "What is the most famous language?",
                "World cup 2010 winner?"
                ];
const answers = [
                ["Russia","USA","Germany","China"],
                ["Chinese","Arabic","Japanese","English"],
                ["Brasil","Italy","Spain","Argentina"]
                ];

const ans = ["Russia","English","Spain"];
let currentExNum = 0;

let studentAnswer = new Array(ans.length).fill("No_Ans");
let studentAnswerSelectedIndex = new Array(ans.length).fill("No_Ans");

function start_quiz(){
    greeting_form.style.display = 'none';
    ex_form.style.display = 'block';

    var question = document.createElement("p");
    question.innerText = questions[0];
    ex_form.appendChild(question);

    const ans_array = answers[0];
    for(let i = 0;i<ans_array.length;i++){
        let radio_button = document.createElement("input");
        radio_button.type = "radio";
        radio_button.name = `Ex_${currentExNum}`;
        radio_button.value = ans_array[i];
        radio_button.id = ans_array[i];
        /*if(i==0){
            radio_button.checked = true;
        }*/

        let label = document.createElement("label");
        label.htmlFor = radio_button.id;
        label.innerText = radio_button.id;

        ex_form.appendChild(radio_button);
        ex_form.appendChild(label);

        ex_form.appendChild(document.createElement("br"));
    }
    let back_button = document.createElement("input");
    back_button.type = "button";
    back_button.onclick = back;
    back_button.value = "Back";

    let next_button = document.createElement("input");
    next_button.type = "button";
    next_button.onclick = next;
    next_button.value = "Next";

    let submit_button = document.createElement("input");
    submit_button.type = "button";
    submit_button.onclick = submit;
    submit_button.value = "Submit";

    ex_form.appendChild(back_button);
    ex_form.appendChild(next_button);
    ex_form.appendChild(submit_button);
}

function back(){
    let currentQuestionAnswered = document.querySelector(`input[name="Ex_${currentExNum}"]:checked`);
    studentAnswer[currentExNum] = currentQuestionAnswered ? currentQuestionAnswered.value : "No_Ans";
    if(studentAnswer[currentExNum] != "No_Ans"){
        for(let i = 0;i<answers[currentExNum].length;i++){
            if(answers[currentExNum][i] == studentAnswer[currentExNum]){
                studentAnswerSelectedIndex[currentExNum] = i;
                break;
            }
        }
    }

    if(currentExNum == 0){
        currentExNum = ans.length-1;
    }
    else{
        currentExNum--;
    }
    ex_form.replaceChildren();

    var question = document.createElement("p");
    question.innerText = questions[currentExNum];
    ex_form.appendChild(question);

    const ans_array = answers[currentExNum];
    for(let i = 0;i<ans_array.length;i++){
        let radio_button = document.createElement("input");
        radio_button.type = "radio";
        radio_button.name = `Ex_${currentExNum}`;
        radio_button.value = ans_array[i];
        radio_button.id = ans_array[i];
        if(i==studentAnswerSelectedIndex[currentExNum]){
            radio_button.checked = true;
        }

        let label = document.createElement("label");
        label.htmlFor = radio_button.id;
        label.innerText = radio_button.id;

        ex_form.appendChild(radio_button);
        ex_form.appendChild(label);

        ex_form.appendChild(document.createElement("br"));
    }
    let back_button = document.createElement("input");
    back_button.type = "button";
    back_button.onclick = back;
    back_button.value = "Back";

    let next_button = document.createElement("input");
    next_button.type = "button";
    next_button.onclick = next;
    next_button.value = "Next";

    let submit_button = document.createElement("input");
    submit_button.type = "button";
    submit_button.onclick = submit;
    submit_button.value = "Submit";

    ex_form.appendChild(back_button);
    ex_form.appendChild(next_button);
    ex_form.appendChild(submit_button);
}

function next(){
    let currentQuestionAnswered = document.querySelector(`input[name="Ex_${currentExNum}"]:checked`);
    studentAnswer[currentExNum] = currentQuestionAnswered ? currentQuestionAnswered.value : "No_Ans";
    if(studentAnswer[currentExNum] != "No_Ans"){
        for(let i = 0;i<answers[currentExNum].length;i++){
            if(answers[currentExNum][i] == studentAnswer[currentExNum]){
                studentAnswerSelectedIndex[currentExNum] = i;
                break;
            }
        }
    }

    if(currentExNum == ans.length-1){
        currentExNum = 0;
    }
    else{
        currentExNum++;
    }
    ex_form.replaceChildren();


    var question = document.createElement("p");
    question.innerText = questions[currentExNum];
    ex_form.appendChild(question);

    const ans_array = answers[currentExNum];
    for(let i = 0;i<ans_array.length;i++){
        let radio_button = document.createElement("input");
        radio_button.type = "radio";
        radio_button.name = `Ex_${currentExNum}`;
        radio_button.value = ans_array[i];
        radio_button.id = ans_array[i];
        if(i==studentAnswerSelectedIndex[currentExNum]){
            radio_button.checked = true;
        }

        let label = document.createElement("label");
        label.htmlFor = radio_button.id;
        label.innerText = radio_button.id;

        ex_form.appendChild(radio_button);
        ex_form.appendChild(label);

        ex_form.appendChild(document.createElement("br"));
    }
    let back_button = document.createElement("input");
    back_button.type = "button";
    back_button.onclick = back;
    back_button.value = "Back";

    let next_button = document.createElement("input");
    next_button.type = "button";
    next_button.onclick = next;
    next_button.value = "Next";

    let submit_button = document.createElement("input");
    submit_button.type = "button";
    submit_button.onclick = submit;
    submit_button.value = "Submit";

    ex_form.appendChild(back_button);
    ex_form.appendChild(next_button);
    ex_form.appendChild(submit_button);
}

function submit(){
    let currentQuestionAnswered = document.querySelector(`input[name="Ex_${currentExNum}"]:checked`);
    studentAnswer[currentExNum] = currentQuestionAnswered ? currentQuestionAnswered.value : "No_Ans";
    if(studentAnswer[currentExNum] != "No_Ans"){
        for(let i = 0;i<answers[currentExNum].length;i++){
            if(answers[currentExNum][i] == studentAnswer[currentExNum]){
                studentAnswerSelectedIndex[currentExNum] = i;
                break;
            }
        }
    }
    
    ex_form.style.display = 'none';
    submission.style.display = 'block';

    let score = 0;
    for(let i =0;i<ans.length;i++){
        if(ans[i] == studentAnswer[i]){
            score++;
        }
    }

    submission.innerHTML = "Your score is: " + score + " over " + ans.length;
}