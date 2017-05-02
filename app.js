document.addEventListener('DOMContentLoaded', function () {
    const url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";
    const quiz = document.querySelector('.quiz');
    const container = document.querySelector('.container');
    const btns = document.querySelectorAll('button');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const start = document.querySelector('.start');
    const intro = document.querySelector('.intro');
    const main = document.querySelector('.main');
    let questionCounter = 0;
    let count = 10;
    let select = [];

    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

            intro.addEventListener('click', function () {
                intro.style.display = 'none';
                prev.style.display = 'none';
                start.style.display = 'none';
                fadeIn();
                timer();
                count = 9;
            });

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

            //           const setTime = setInterval(function() {
            //               timer();
            //               if (count < 0) {
            //                clearInterval(setTime);
            //                finalSite();   
            //            }
            //           }, 1000);
            //        
            //            function timer() {
            //                const countTimer = document.querySelector('#timer');
            //                countTimer.innerText = count--;
            //                console.log(countTimer);
            //                if (countTimer.innerText < 1) {
            //                    countTimer.parentNode.removeChild(countTimer);
            //                }
            //            }
            function timer() {
                const countTimer = document.createElement('h3');
                countTimer.id = 'timer';
                let counter = setInterval(function () {
                    count = count - 1;
                    console.log(count);
                    if (count < 6) {
                        countTimer.style.color = 'red';
                        countTimer.style.fontWeight = 'bold';
                        countTimer.style.fontSize = '6rem';
                        countTimer.style.top = '25px';
                    } else {
                        countTimer.style.color = 'white';
                        countTimer.style.fontWeight = '400';
                        countTimer.style.top = '6%';
                    }
                    if (count <= 0) {
                        clearInterval(counter);
                        countTimer.parentNode.removeChild(countTimer);
                        finalSite();
                        return;
                    }
                    countTimer.innerText = count;
                    main.appendChild(countTimer);
                }, 1000);
            }





            next.addEventListener('click', function () {
                userChoice();
                if (isNaN(select[questionCounter])) {
                    alert('YOU HAVE TO CHOOSE THE ANSWER!!!');
                } else {
                    if (questionCounter + 4 < data.questions.length) {
                        count = 8;
                        console.log(select);
                        console.log(questionCounter);
                        questionCounter++;
                        main.style.display = 'none';
                        fadeIn();
                        createQuestion(questionCounter);
                        createNext();
                    } else {
                        finalSite();
                    }

                }
            });


            prev.addEventListener('click', function () {
                questionCounter--;
                createQuestion(questionCounter);
                createNext();
                count = 10;

            });


            start.addEventListener('click', function () {
                main.style.display = 'none';
                main.classList.remove('finaleSite');
                questionCounter = 0;
                fadeIn();
                count = 10;
                quiz.style.display = 'block';
                createQuestion(questionCounter);
                createNext();
                prev.style.display = 'none';
                start.style.display = 'none';
                next.style.display = 'block';
                main.lastChild.style.display = 'none';


            });

            function createQuestion(index) {
                const questionElement = document.createElement('div');
                questionElement.id = 'exercise';
                quiz.appendChild(questionElement);


                let task = document.createElement('h2');
                task.innerText = data.questions[index].question;
                questionElement.appendChild(task);

                let answ = createAnswer(index);
                questionElement.appendChild(answ);

                return questionElement;
            }


            function createNext() {
                let exercise = document.querySelector('#exercise');
                exercise.parentNode.removeChild(exercise);
                prev.style.display = 'block';


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
                    input.type = "radio";
                    input.name = "answer";
                    input.data = data.questions[index].answers[i].correct;
                    options.innerText = data.questions[index].answers[i].answer;
                    li.appendChild(input);
                    li.appendChild(options);
                    ul.appendChild(li);
                }
                return ul;
            }

            function userChoice() {
                let allOptions = document.getElementsByName('answer');
                for (var i = 0; i < allOptions.length; i++) {
                    if (allOptions[i].checked) {
                        select[questionCounter] = +allOptions[i].data;

                    }
                }
            }

            function finalSite() {
                main.classList.add('finaleSite');
                let result = document.createElement('p');
                result.classList.add('yourScore');
                quiz.style.display = 'none';
                prev.style.display = 'none';
                next.style.display = 'none';
                start.style.display = 'block';

                let score = 0;
                for (var i = 0; i < select.length; i++) {

                    if (select[i] == 1) {
                        score++;
                    }
                }
                result.innerText = 'Your score is ' + score + ' on ' + select.length;
                main.appendChild(result);
            }

            createQuestion(0);
        })
        .catch(function () {
            console.log('error');
        });


});