// NAVIGATION LOGIC   

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update active nav button
    const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}



//  QUIZ DATA  

const questions = [
    {
        q: "Your boss calls from an unknown number saying they urgently need you to wire $15,000 to a vendor for a critical project. The voice sounds exactly like them. What should you do?",
        options: [
            "Wire the money immediately - it's the boss and it's urgent",
            "Ask them to send an email confirmation first",
            "Hang up and call your boss back on their known office extension to verify",
            "Wire half the amount to test if it's legitimate"
        ],
        answer: 2,
        feedback: "✅ Correct! Always verify financial requests Out-of-Band using a known contact method. AI voice cloning can perfectly mimic anyone's voice from just a few seconds of audio. Even if the caller has personal information, verify through a separate channel you initiate."
    },
    {
        q: "You're at a parking meter and see a QR code sticker labeled 'Quick Pay' that looks slightly raised from the meter surface. What's your safest action?",
        options: [
            "Scan it - it's probably just a new sticker placed by the city",
            "Peel it off and scan the QR code underneath",
            "Use the official parking app or physical payment slot instead",
            "Scan it but don't enter your credit card info"
        ],
        answer: 2,
        feedback: "✅ Correct! 'Quishing' attacks involve placing fake QR code stickers over legitimate ones. A raised or newer-looking sticker is a red flag. Always use official apps downloaded from trusted sources or physical payment methods. Never trust QR codes you can't verify."
    },
    {
        q: "You receive a text from 'FedEx': 'We cannot deliver your package due to incomplete address. Update here: [shortened link]'. You aren't expecting a package. What do you do?",
        options: [
            "Click the link to check if someone sent you a surprise gift",
            "Reply 'STOP' to unsubscribe from spam",
            "Delete it and go directly to FedEx.com or call their official number to check",
            "Forward it to friends to see if they're expecting packages"
        ],
        answer: 2,
        feedback: "✅ Correct! This is a classic 'Smishing' attack. Legitimate delivery companies never ask you to update addresses via text links. Shortened URLs hide the real destination. Always go directly to the official website or app - never click links in unexpected texts. Replying 'STOP' confirms your number is active."
    },
    {
        q: "At 2 AM, your phone buzzes with 15 MFA approval requests in a row. Then you get a call from 'IT Support' saying there's a system glitch and you need to approve one request to stop the spam. What should you do?",
        options: [
            "Approve one request to stop the annoying notifications",
            "Deny all requests, hang up, and report to your real IT security team immediately",
            "Ask the caller for their employee ID and callback number",
            "Turn off your phone and deal with it in the morning"
        ],
        answer: 1,
        feedback: "✅ Correct! This is an 'MFA Fatigue' attack. The caller IS the attacker trying to trick you into granting access. NEVER approve MFA requests you didn't initiate. Deny all requests, hang up immediately, and report to your actual security team. Real IT will never ask you to approve suspicious MFA requests."
    },
    {
        q: "You receive an email from 'security@paypa1-secure.com' (note the '1' instead of 'l') saying your account has been compromised and you must reset your password immediately by clicking their link. The email has your real name and mentions a recent purchase. What do you do?",
        options: [
            "Click the link - they have my name and purchase info, so it must be real",
            "Close the email, type 'paypal.com' directly into your browser, and check your account there",
            "Reply to ask if it's legitimate",
            "Call the phone number provided in the email"
        ],
        answer: 1,
        feedback: "✅ Correct! This is a sophisticated phishing attempt using a 'cousin domain' (paypa1 vs paypal). Having your name and purchase history doesn't make it legitimate - this info is often from data breaches. NEVER click links in security emails. Always navigate to websites manually and check your account there."
    }
];



//  QUIZ STATE  

let currentScore = 0;
let answeredQuestions = 0;
let questionResults = [];



//  QUIZ INITIALIZATION

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const finishBtn = document.getElementById('finish-btn');
    
    if (!quizContainer) return;
    
    // Reset state
    currentScore = 0;
    answeredQuestions = 0;
    questionResults = [];
    quizContainer.innerHTML = '';
    
    // Create quiz questions
    questions.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.id = `question-${index}`;
        
        const title = document.createElement('h3');
        title.innerHTML = `<span style="color: var(--primary);">Question ${index + 1}</span> of ${questions.length}`;
        qDiv.appendChild(title);
        
        const questionText = document.createElement('p');
        questionText.textContent = q.q;
        questionText.style.marginBottom = '1.5rem';
        questionText.style.fontSize = '1.1rem';
        qDiv.appendChild(questionText);
        
        const optDiv = document.createElement('div');
        optDiv.className = 'quiz-options';
        
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback';
        feedbackDiv.innerHTML = q.feedback;
        
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(btn, i, q.answer, feedbackDiv, index, optDiv);
            optDiv.appendChild(btn);
        });
        
        qDiv.appendChild(optDiv);
        qDiv.appendChild(feedbackDiv);
        quizContainer.appendChild(qDiv);
    });
    
    // Show finish button
    if (finishBtn) {
        finishBtn.style.display = 'inline-block';
    }
}



//  ANSWER CHECKING 

function checkAnswer(btn, selectedIndex, correctIndex, feedbackDiv, qIndex, optDiv) {
    // Prevent multiple answers
    if (btn.disabled) return;
    
    // Disable all buttons in this question
    const buttons = optDiv.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);
    
    // Show feedback
    feedbackDiv.classList.add('show');
    
    // Track result
    const isCorrect = selectedIndex === correctIndex;
    questionResults[qIndex] = {
        correct: isCorrect,
        question: questions[qIndex].q
    };
    
    if (isCorrect) {
        btn.classList.add('correct');
        currentScore++;
    } else {
        btn.classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
    }
    
    answeredQuestions++;
    
    // Check if all questions answered
    if (answeredQuestions === questions.length) {
        setTimeout(() => {
            document.getElementById('finish-btn').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add pulse animation to finish button
            document.getElementById('finish-btn').classList.add('pulse-btn');
        }, 500);
    }
}



//  SHOW QUIZ RESULTS 

function showResults() {
    const scoreDisplay = document.getElementById('quiz-score');
    const scoreVal = document.getElementById('score-val');
    const scoreMessage = document.getElementById('score-message');
    const scoreBreakdown = document.getElementById('score-breakdown');
    const finishBtn = document.getElementById('finish-btn');
    
    if (!scoreDisplay) return;
    
    // Hide finish button
    if (finishBtn) {
        finishBtn.style.display = 'none';
    }
    
    // Calculate percentage
    const percentage = (currentScore / questions.length) * 100;
    
    // Update score
    scoreVal.textContent = currentScore;
    
    // Determine message and style based on score
    let message = '';
    let messageClass = '';
    
    if (percentage === 100) {
        message = '🏆 Perfect Score! You\'re a phishing detection expert! Your vigilance will keep you and your organization safe.';
        messageClass = 'excellent';
    } else if (percentage >= 80) {
        message = '🎯 Excellent Work! You have strong phishing awareness. Keep practicing to maintain your skills.';
        messageClass = 'excellent';
    } else if (percentage >= 60) {
        message = '👍 Good Job! You\'re on the right track, but review the feedback to strengthen your defenses.';
        messageClass = 'good';
    } else if (percentage >= 40) {
        message = '⚠️ Needs Improvement. Review the attack vectors section and retake the quiz to improve your score.';
        messageClass = 'average';
    } else {
        message = '🚨 High Risk! You may be vulnerable to phishing attacks. Please review all sections carefully and practice identifying threats.';
        messageClass = 'poor';
    }
    
    scoreMessage.textContent = message;
    scoreMessage.className = messageClass;
    
    // Create breakdown
    let breakdownHTML = '<h4 style="color: var(--primary); margin-bottom: 1rem;">Your Answers:</h4>';
    questionResults.forEach((result, index) => {
        const icon = result.correct ? '✅' : '❌';
        const color = result.correct ? 'var(--primary)' : 'var(--accent)';
        breakdownHTML += `
            <p style="color: ${color};">
                <span style="font-size: 1.2rem;">${icon}</span>
                <strong>Q${index + 1}:</strong> ${result.correct ? 'Correct' : 'Incorrect'}
            </p>
        `;
    });
    
    scoreBreakdown.innerHTML = breakdownHTML;
    
    // Show score display
    scoreDisplay.style.display = 'block';
    
    // Scroll to score
    setTimeout(() => {
        scoreDisplay.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
}


//  RESET QUIZ 

function resetQuiz() {
    const scoreDisplay = document.getElementById('quiz-score');
    
    // Hide score
    if (scoreDisplay) {
        scoreDisplay.style.display = 'none';
    }
    
    // Reset and reload quiz
    currentScore = 0;
    answeredQuestions = 0;
    questionResults = [];
    
    loadQuiz();
    
    // Scroll to top of quiz
    setTimeout(() => {
        document.getElementById('quiz-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}


//  EVENT LISTENERS 

document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz
    loadQuiz();
    
    // Finish button handler
    const finishBtn = document.getElementById('finish-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', function() {
            if (answeredQuestions < questions.length) {
                const unanswered = questions.length - answeredQuestions;
                alert(`Please answer all questions before viewing results. You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}.`);
                
                // Find first unanswered question
                const quizQuestions = document.querySelectorAll('.quiz-question');
                for (let i = 0; i < quizQuestions.length; i++) {
                    const buttons = quizQuestions[i].querySelectorAll('.quiz-options button');
                    const hasAnswer = Array.from(buttons).some(btn => btn.disabled);
                    if (!hasAnswer) {
                        quizQuestions[i].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        break;
                    }
                }
            } else {
                showResults();
            }
        });
    }
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation for quiz
    document.addEventListener('keydown', function(e) {
        const activeSection = document.querySelector('.section.active');
        if (activeSection && activeSection.id === 'quiz') {
            // Number keys 1-4 for answer selection
            if (e.key >= '1' && e.key <= '4') {
                const quizQuestions = document.querySelectorAll('.quiz-question');
                for (let question of quizQuestions) {
                    const buttons = question.querySelectorAll('.quiz-options button');
                    if (buttons.length && !buttons[0].disabled) {
                        const index = parseInt(e.key) - 1;
                        if (buttons[index]) {
                            buttons[index].click();
                        }
                        break;
                    }
                }
            }
        }
    });
});


//  UTILITY FUNCTIONS  

// Add loading animation for section transitions
function addLoadingEffect() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease-in-out';
            section.style.opacity = '1';
        }, 100);
    });
}



// Easter egg - Konami code

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    alert('🎉 Easter Egg Unlocked! You\'re a true cyber defender! 🛡️');
}

// Console warning for security awareness
console.log('%c⚠️ SECURITY WARNING', 'color: #ff3333; font-size: 24px; font-weight: bold;');
console.log('%cIf someone told you to paste something here, it\'s a scam!', 'color: #00ff41; font-size: 16px;');
console.log('%cThis is a common social engineering technique called "Self-XSS".', 'color: #e0e0e0; font-size: 14px;');
console.log('%cNever paste unknown code into your browser console.', 'color: #e0e0e0; font-size: 14px;');
console.log('%c\n🛡️ Stay safe! - ShieldAware Team', 'color: #00ff41; font-size: 16px; font-weight: bold;');