document.addEventListener('DOMContentLoaded', function () {
    const url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";
    const quiz = document.querySelector('.quiz');
    const container = document.querySelector('.container');
    const btns = document.querySelectorAll('button');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const intro = document.querySelector('.intro');
    const main = document.querySelector('.main');
    let questionCounter = 0;
    let select = [];


    intro.addEventListener('click', function () {
        intro.style.display = 'none';
        fadeIn();

    })

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('mouseenter', function () {
            this.classList.add('active');
        });

        btns[i].addEventListener('mouseleave', function () {
            this.classList.remove('active');
        });
    }

    function fadeIn() {
        const fadeEl = document.createElement('div');
        fadeEl.style.display = 'flex';
        fadeEl.style.opacity = 0;
        fadeEl.classList.add('fullCount');
        fadeEl.innerHTML = '<h1>Question: ' + (questionCounter + 1) + '</h1>';


        var tick = function () {
            fadeEl.style.opacity = +fadeEl.style.opacity + 0.01;


            if (+fadeEl.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            } else {
                fadeEl.style.display = 'none';
                main.style.display = 'block';
            }
        };
        container.appendChild(fadeEl);
        tick();
    }



    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

            next.addEventListener('click', function (event) {
                event.preventDefault();
                userChoice();
                if (isNaN(select[questionCounter])) {
                    alert('YOU HAVE TO MAKE A SELECTION!!!');
                } else {
                    console.log(select);
                    questionCounter++;
                    main.style.display = 'none';
                    fadeIn();
                    createQuestion(questionCounter);
                    createNext();

                }
            });

            function createQuestion(index) {
                const questionElement = document.createElement('div');
                questionElement.id = 'exercise';
                quiz.appendChild(questionElement);

                let header = document.createElement('h2');
                header.innerText = 'Question ' + (index + 1) + ' :';
                questionElement.appendChild(header);

                let task = document.createElement('p');
                task.innerText = data.questions[index].question;
                questionElement.appendChild(task);

                let answ = createAnswer(index);
                questionElement.appendChild(answ);

                return questionElement;
            }

            function createNext() {
                let exercise = document.querySelector('#exercise');
                exercise.parentNode.removeChild(exercise);
            }

            function createAnswer(index) {
                let ul = document.createElement('ul');
                let li;
                let input = '';
                let options;

                for (var i = 0; i < data.questions[index].answers.length; i++) {
                    li = document.createElement('li');
                    options = document.createElement('p');
                    input = document.createElement('input');
                    input.type = "checkbox";
                    input.name = "answer";
                    input.value = i;
                    options.innerText = data.questions[index].answers[i].answer;
                    options.appendChild(input);
                    li.appendChild(options);
                    ul.appendChild(li);
                }
                return ul;
            }

            function userChoice() {
                let allOptions = document.getElementsByName('answer');
                for (var i = 0; i < allOptions.length; i++) {
                    if (allOptions[i].checked) {
                        select[questionCounter] = +allOptions[i].value;
                    }
                }
            }

            createQuestion(0);
        })
        .catch(function () {
            console.log('error');
        });


});