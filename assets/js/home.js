let questionText = document.querySelector(".question");
let btnQuestion = document.querySelectorAll(".btn-answer");
let progress = document.querySelector(".progress")
let currentQuestion = 0;

function continue1() {
    document.querySelector(".body").style = "display: none"
    document.querySelector(".testBody").style = "display: flex"
}

window.onload = function () {
    // Khi load vào trang, thì hiện câu hỏi đầu tiên
    questionText.innerHTML = questions[0].question
}

function submitAnswer () {
    // khi người dùng click vào câu trả lời
    currentQuestion++;
    questionText.innerHTML = questions[currentQuestion].question;
    progress.setAttribute("value", `${currentQuestion+1}`);
}

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