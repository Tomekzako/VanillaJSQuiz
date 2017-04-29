document.addEventListener('DOMContentLoaded', function () {
    const url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";
    const quiz = document.querySelector('.quiz');
    const btns = document.querySelectorAll('button');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const intro = document.querySelector('.intro');
    const main = document.querySelector('.main');
    const introUp = document.querySelector('.introUp');
    let questionCounter = 0;


    introUp.addEventListener('click', function () {
        intro.style.display = 'none';
        main.style.display = 'block';
    })

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('mouseenter', function () {
            this.classList.add('active');
        });

        btns[i].addEventListener('mouseleave', function () {
            this.classList.remove('active');
        });
    }


    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

            next.addEventListener('click', function () {
                questionCounter++;
                createQuestion(questionCounter);
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


            createQuestion(0);


        })
        .catch(function () {
            console.log('error');
        });


});