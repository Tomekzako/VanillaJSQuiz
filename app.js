document.addEventListener('DOMContentLoaded', function () {
    const url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";
    const div = document.querySelector('#result');
    const quiz = document.querySelector('.quiz');



    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

            function createQuestion(index) {
                const questionElement = document.createElement('div');
                questionElement.id = 'question';
                quiz.appendChild(questionElement);

                let header = document.createElement('h2');
                header.innerText = 'Question ' + (index + 1) + ' :';
                questionElement.appendChild(header);

                var task = document.createElement('p');
                task.innerText = data.questions[index].question;
                questionElement.appendChild(task);



                return questionElement;
            }
            createQuestion(0);


        })
        .catch(function () {
            console.log('error');
        });


});