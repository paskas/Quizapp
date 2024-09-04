let questions = [
    {
        "question": "Wer spielte die Rolle des Iron Man im MCU?",
        "answer_1": "Chris Evans",
        "answer_2": "Robert Downey Jr.",
        "answer_3": "Chris Hemsworth",
        "answer_4": "Mark Ruffalo",
        "right_answer": 2
    },
    {
        "question": "In welchem Film erscheint der Charakter Black Panther zum ersten Mal?",
        "answer_1": "Captain America: Civil War",
        "answer_2": "Black Panther",
        "answer_3": "Avengers: Age of Ultron",
        "answer_4": "Guardians of the Galaxy",
        "right_answer": 1
    },
    {
        "question": "Wer ist der Hauptgegner in Doctor Strange?",
        "answer_1": "Dormammu ",
        "answer_2": "Loki",
        "answer_3": "Thanos",
        "answer_4": "Hela",
        "right_answer": 1
    },
    {
        "question": "Welcher Infinity-Stein ist im Tesserakt verborgen?",
        "answer_1": "Seelenstein",
        "answer_2": "Zeitstein",
        "answer_3": "Raumstein ",
        "answer_4": "Realitätsstein",
        "right_answer": 3
    },
    {
        "question": "Wie heißt Peter Parkers Tante?",
        "answer_1": "Mary",
        "answer_2": "Jane",
        "answer_3": "May",
        "answer_4": "Betty",
        "right_answer": 3
    },
    {
        "question": "Wer ist der erste Avenger, der in den Comics und Filmen vorgestellt wurde?",
        "answer_1": "Thor",
        "answer_2": "Iron Man",
        "answer_3": "Hulk",
        "answer_4": "Captain America",
        "right_answer": 4
    },
    {
        "question": "Welcher dieser Charaktere ist ein Mitglied der Guardians of the Galaxy?",
        "answer_1": "Hawkeye",
        "answer_2": "Rocket",
        "answer_3": "Falcon",
        "answer_4": "Scarlet Witch",
        "right_answer": 2
    },
    {
        "question": "In welchem Film wird die Avengers-Formation zum ersten Mal vollständig gezeigt?",
        "answer_1": "Avengers: Age of Ultron",
        "answer_2": "The Avengers",
        "answer_3": "Avengers: Endgame",
        "answer_4": "Captain America: The Winter Soldier",
        "right_answer": 2
    },
    {
        "question": "Was ist der richtige Name von Black Widow?",
        "answer_1": "Wanda Maximoff",
        "answer_2": "Peggy Carter",
        "answer_3": "Natasha Romanoff",
        "answer_4": "Carol Danvers",
        "right_answer": 3
    },
    {
        "question": "Wie heißt der Planet, auf dem Thanos sich am Ende von Avengers: Infinity War zurückzieht?",
        "answer_1": "Vormir",
        "answer_2": "Titan",
        "answer_3": "Knowhere",
        "answer_4": "Garten",
        "right_answer": 4
    }
];


let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCESS = new Audio('audio/correct.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');


function init() {
    document.getElementById('question_length').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestions();
        showAnswer();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function updateToNextQuestions() {
    let question = questions[currentQuestion];
    document.getElementById('question_itle').innerHTML = question['question'];
    document.getElementById('question_number').innerHTML = currentQuestion + 1;
}


function showAnswer() {
    if (currentQuestion >= questions.length) {
        showEndScreen()
    } else {
        let answer = questions[currentQuestion];
        document.getElementById('answer_1').innerHTML = answer['answer_1'];
        document.getElementById('answer_2').innerHTML = answer['answer_2'];
        document.getElementById('answer_3').innerHTML = answer['answer_3'];
        document.getElementById('answer_4').innerHTML = answer['answer_4'];
    }
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress_bar_end_screen').innerHTML = `${percent} %`;
    document.getElementById('progress_bar_end_screen').style = `width:${percent}%;`;
    document.getElementById('progress_bar_quiz').innerHTML = `${percent} %`;
    document.getElementById('progress_bar_quiz').style = `width:${percent}%;`;
}


function showEndScreen() {
    document.getElementById('question_body').classList.add('d-none')
    document.getElementById('end_screen').style = '';
    document.getElementById('amount_of_questions').innerHTML = questions.length;
    document.getElementById('amount_of_right_questions').innerHTML = rightQuestions;
}


function answer(selction) {                                                                 //  welche Anwtort geklickt wird übergibt den wert an answer(selction)
    let question = questions[currentQuestion];                                              //  die Variable beinhaltet die aktuelle Frage
    let selctedQuestionNumber = selction.slice(-1)                                          //  die Variable beinhaltet den übergabe Wert z.B. answer_1 wo mit slice(-1) der letzte Buschstabe aus dem String übergeben wird
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (rightAnswerSelected(selctedQuestionNumber, question)) {                                //  Vergleich ob die angeklickt Antwort mit der right_answer übereinstimmt
        document.getElementById(selction).parentNode.classList.add('bg-success');           //  richtige antwort, setzt den übergeordneten container (parent) auf "grün"
        AUDIO_SUCESS.play();
        rightQuestions++;
    } else {                                                                                //  anonsten mach das !
        document.getElementById(selction).parentNode.classList.add('bg-danger');            //  falsche antwort, setzt den übergeordneten container (parent) auf "rot"
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next_question_btn').disabled = false;                          //  setzt den button auf enable
}


function rightAnswerSelected(selctedQuestionNumber, question) {
    return selctedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;                                                                       //  wird um 1 erhöht z.B. von 0 auf 1
    document.getElementById('next_question_btn').disabled = true;                           //  setzt den button auf disable
    resetAnswerButtons();                                                                    // resettet die Farben der answer div`s 
    showQuestion();                                                                         // zeigt die neue Frage an 
    showAnswer();                                                                           // zeigt die neuen Antworten an 
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {
    document.getElementById('question_body').classList.remove('d-none')
    document.getElementById('end_screen').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

