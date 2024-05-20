const questionText = document.querySelector(".question");
// const btnQuestion = document.querySelectorAll('.btn-answer');
 const btnQuestion = document.getElementsByClassName('btn-answer'); // TH Cái trên không chạy
const progress = document.querySelector(".progress")
const answerBox = document.querySelector(".answerBox")
let currentQuestion = 0; // GLOBAL
let result =[];
let resultNormalLevel = []; // Bình thường
let resultLowLevel = []; // Nhẹ
let resultMediumLevel = []; // Vừa
let resultSevereLevel = []; // Nặng
let resultVerySevereLevel = []; // Rất nặng
let pointA = 0;
let pointD = 0;
let pointS = 0;
let answer = [
    { answer: "Không đúng với tôi chút nào cả", point: 0 },
    { answer: "Đúng với tôi phần nào, hoặc thỉnh thoảng mới đúng", point: 1 },
    { answer: "Đúng với tôi phần nhiều, hoặc phần lớn thời gian là đúng", point: 2 },
    { answer: "Hoàn toàn đúng với tôi, hoặc hầu hết thời gian là đúng", point: 3 }
]
let questions = [
    { question: "Tôi thấy khó mà thoải mái được", type: "S" },
    { question: "Tôi bị khô miệng", type: "A" },
    { question: "Tôi dường như chẳng có chút cảm xúc tích cực nào", type: "D" },
    { question: "Tôi bị rối loạn nhịp thở (thở gấp, khó thở dù chẳng làm việc gì nặng)", type: "A" },
    { question: "Tôi thấy khó bắt tay vào công việc", type: "D" },
    { question: "Tôi có xu hướng phản ứng thái quá với mọi tình huống", type: "S" },
    { question: "Tôi bị ra mồ hôi (chẳng hạn như mồ hôi tay…)", type: "A" },
    { question: "Tôi thấy mình đang suy nghĩ quá nhiều", type: "S" },
    { question: "Tôi lo lắng về những tình huống có thể làm tôi hoảng sợ hoặc biến tôi thành trò cười", type: "A" },
    { question: "Tôi thấy mình chẳng có gì để mong đợi cả", type: "D" },
    { question: "Tôi thấy bản thân dễ bị kích động", type: "S" },
    { question: "Tôi thấy khó thư giãn được", type: "S" },
    { question: "Tôi cảm thấy chán nản, thất vọng", type: "D" },
    { question: "Tôi không chấp nhận được việc có cái gì đó xen vào cản trở việc tôi đang làm", type: "S" },
    { question: "Tôi thấy mình gần như hoảng loạn", type: "A" },
    { question: "Tôi không thấy hăng hái với bất kỳ việc gì nữa", type: "D" },
    { question: "Tôi cảm thấy mình chẳng đáng làm người", type: "D" },
    { question: "Tôi thấy mình khá dễ phật ý, tự ái", type: "S" },
    { question: "Tôi nghe thấy rõ tiếng nhịp tim dù chẳng làm việc gì cả (ví dụ, tiếng nhịp tim tăng, tiếng tim loạn nhịp)", type: "A" },
    { question: "Tôi hay sợ vô cớ", type: "A" },
    { question: "Tôi thấy cuộc sống vô nghĩa", type: "D" }
]
const renderAnswer = () => {
    let htmlAnswer = ''; // LOCAL
    let Class = ['firstAnswer', 'secondAnswer', 'thirdAnswer', 'fourthAnswer']
    // CALL API -> SERVER |||| SERVER -> answer
    answer.forEach(function (item, index) {
        //item - Nó là phần tử mảng luôn. (Phần tử)
        //index - thứ tự phần tử.
        // Mỗi một item là một phần tử của html
        htmlAnswer += `<button onclick="submitAnswer(${item.point})" class="btn-answer ${Class[index]}">${item.answer}</button>`
    })
    answerBox.innerHTML = htmlAnswer
}
const renderQuestion = () => {
    // In ra câu trả lời hiện tại theo biến currentQuestion
    questionText.innerHTML = questions[currentQuestion].question;
    // Thay đổi cục progressbar - tiến độ theo biến currentQuestion
    progress.setAttribute("value", `${currentQuestion+1}`);
    removeChoosenQuestion();
    if (currentQuestion < result.length) {
         // trước khi thêm hover vào câu đã chọn, thì phải xóa hover của câu trước
        highlightChoosenQuestion();
    }
}
function submitAnswer (point) {
    // 2TH. TH1: Câu trả lời mới.
    // TH2: Thay đổi câu trả lời (Câu trả lời đã click)
    if (currentQuestion == result.length) {
        // Câu chưa trả lời
        let resultItem = {
            point: point, 
            type: questions[currentQuestion].type
        }
        result.push(resultItem)
        currentQuestion++;
        renderQuestion();
    } else {
        // Chọn lại đáp án - câu đã trả lời
        result[currentQuestion] = {
            point: point, 
            type: questions[currentQuestion].type
        }
        currentQuestion++;
        renderQuestion();
       
    }

    // khi người dùng click vào câu trả lời

}
function continue1() {
    document.querySelector(".body").style = "display: none"
    document.querySelector(".testBody").style = "display: flex"
}
function removeChoosenQuestion() {
    for (var i = 0; i < btnQuestion.length; i++) {
         btnQuestion[i].classList.remove("choosenAnswer")
    }
}

function highlightChoosenQuestion() {
    let currentResult = result[currentQuestion]
   
    // HOVER ACTION
    for (var i = 0; i < btnQuestion.length; i++) {
        // btnQuestion[i].classList.remove("active")
        // point = 0 1 2 3
        // btnQuestion = [0 1 2 3]
        if (i == currentResult.point) {
            btnQuestion[i].classList.add("choosenAnswer")
            // Thêm hover vào câu đã chọn
            break;
            // classlist.add - thêm giá trị class
            // classlist.remove - xóa giá trị class
        }
    }
}
const backQuestion = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
    }
    renderQuestion();
}
const nextQuestion = () => {
    // Tăng biến crrQuestion
    // Render câu hỏi
    // Câu hiện tại chưa trả lời thì ko cho next
    // Khi next hết câu hỏi thì thôi, không tăng biến nữa.
    if (currentQuestion < result.length && currentQuestion < 20) {
        currentQuestion++;
        renderQuestion();
    }
 }
window.onload = function () {
    // Khi load vào trang, thì hiện câu hỏi đầu tiên
    renderQuestion();
    renderAnswer();
}
function getEachPoint () {
    result.forEach((item, index) => {
        if (item.type == 'A') {
            pointA += item.point * 2;
        } else if (item.type == 'D') {
            pointD += item.point * 2;
        } else if (item.type == 'S') {
            pointS += item.point * 2;
        }
    })
}
function getEachPoint () {
    // get result A
    if (pointA <= 7) {
        // Bình thường
        resultNormalLevel.push(
            {
                type: 'lo âu',
                level:'bình thường'
            }
        )
    } else if (pointA >= 8 && pointA <= 9) {
        // nhẹ
        resultLowLevel.push(
            {
                type: 'lo âu',
                level:'nhẹ'
            }
        )
    } else if (pointA >= 10 && pointA <= 14) {
        resultMediumLevel.push(
            {
                type: 'lo âu',
                level:'vừa'
            }
        )
    } else if (pointA >= 15 && pointA <= 19) {
        resultSevereLevel.push(
            {
                type: 'lo âu',
                level:'nặng'
            }
        )
    } else {
        resultVerySevereLevel.push(
            {
                type: 'lo âu',
                level:'rất nặng'
            }
        )
    }
    //get result D
    if (pointD <= 9) {
        // Bình thường
        resultNormalLevel.push(
            {
                type: 'trầm cảm',
                level:'bình thường'
            }
        )
    } else if (pointD >= 10 && pointD <= 13) {
        // nhẹ
        resultLowLevel.push(
            {
                type: 'trầm cảm',
                level:'nhẹ'
            }
        )
    } else if (pointD >= 14 && pointD <= 20) {
        resultMediumLevel.push(
            {
                type: 'trầm cảm',
                level:'vừa'
            }
        )
    } else if (pointD >= 21 && pointD <= 27) {
        resultSevereLevel.push(
            {
                type: 'trầm cảm',
                level:'nặng'
            }
        )
    } else {
        resultVerySevereLevel.push(
            {
                type: 'trầm cảm',
                level:'rất nặng'
            }
        )
    }
    // get result S
    if (pointS <= 14) {
        // Bình thường
        resultNormalLevel.push(
            {
                type: 'stress',
                level:'bình thường'
            }
        )
    } else if (pointS >= 15 && pointS <= 18) {
        // nhẹ
        resultLowLevel.push(
            {
                type: 'stress',
                level:'nhẹ'
            }
        )
    } else if (pointS >= 19 && pointS <= 25) {
        resultMediumLevel.push(
            {
                type: 'stress',
                level:'vừa'
            }
        )
    } else if (pointS >= 26 && pointS <= 33) {
        resultSevereLevel.push(
            {
                type: 'stress',
                level:'nặng'
            }
        )
    } else {
        resultVerySevereLevel.push(
            {
                type: 'stress',
                level:'rất nặng'
            }
        )
    }
}
function renderResult () {
    let resultText = '';
    if (resultNormalLevel.length > 0) {
        resultText += 'Bạn không có dấu hiệu của ' + (resultNormalLevel.length < 3 ? resultNormalLevel[0].type + ' và '+ resultNormalLevel[1].type : resultNormalLevel[0].type +', '+ resultNormalLevel[1].type +' và '+ resultNormalLevel[2].type)
    } else {
        
    }
}