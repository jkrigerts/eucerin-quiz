<script>
    import { allQuestions } from "$lib/questions.js";

    // Pick random 3 questions
    let questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 3);

    let current = 0;
    let selected = null;
    let score = 0;
    let finished = false;

    let reviewing = false; // after answer selected
    let reviewSecondsLeft = 20;
    let reviewTimer = null;

    let showFeedback = false;
    let feedbackText = "";
    let feedbackType = ""; // "correct" or "wrong"

    function choose(index) {
        if (selected !== null) return;

        selected = index;
        reviewing = true;
        reviewSecondsLeft = 20;

        const correct = index === questions[current].correct;

        if (correct) {
            score++;
            feedbackText = "PAREIZI!";
            feedbackType = "correct";
        } else {
            feedbackText = "NEPAREIZI!";
            feedbackType = "wrong";
        }

        showFeedback = true;

        startReviewTimer();
    }

    function startReviewTimer() {
        clearInterval(reviewTimer);
        reviewTimer = setInterval(() => {
            reviewSecondsLeft--;
            if (reviewSecondsLeft <= 0) {
                clearInterval(reviewTimer);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        clearInterval(reviewTimer);
        showFeedback = false;

        if (current < questions.length - 1) {
            current++;
            selected = null;
            reviewing = false;
        } else {
            finished = true;
        }
    }

    function restart() {
        questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 3);

        current = 0;
        score = 0;
        selected = null;
        finished = false;
        reviewing = false;
        showFeedback = false;
        clearInterval(reviewTimer);
    }
</script>

{#if !finished}
    <h1 class="title">{@html questions[current].text}</h1>

    <div class="answers">
        {#each questions[current].answers as ans, i}
            <button
                class="
          answer-btn
          {selected !== null && i === questions[current].correct
                    ? 'correct'
                    : ''}
          {selected === i && i !== questions[current].correct ? 'wrong' : ''}
        "
                on:click={() => choose(i)}
                disabled={selected !== null}
            >
                {@html ans}
            </button>
        {/each}
    </div>

    {#if reviewing}
        <button class="next-btn" on:click={nextQuestion}>NĀKAMAIS</button>
        <p class="timer">Nākamais jautājums pēc: {reviewSecondsLeft}s</p>
    {/if}

    {#if showFeedback}
        <div class="feedback {feedbackType}">
            {feedbackText}
        </div>
    {/if}
{:else}
    <div class="result">
        <h1 class="title">Jūsu rezultāts</h1>
        <p class="subtitle">{score} / {questions.length}</p>

        <button class="restart-btn" on:click={restart}> SĀKT NO JAUNA </button>
    </div>
{/if}

<style>
    .title {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.4;
        color: #0d233f;
        margin: 3rem 0;
    }

    .subtitle {
        font-family: "Montserrat", sans-serif;
        font-weight: 800;
        font-size: 3.5rem;
    }

    .answers {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .answer-btn {
        width: 100%;
        background: #a70532;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 1.3rem;
        font-size: 1.4rem;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        text-align: left;
        line-height: 1.3;
    }

    /* FIX: No hover when disabled
    .answer-btn:hover:not(:disabled) {
        background: #8c042b;
    } */

    .answer-btn:disabled {
        opacity: 1;
        pointer-events: none;
    }

    /* Correct / wrong */
    .answer-btn.correct {
        background: #217224 !important;
    }

    .answer-btn.wrong {
        background: #9fa5aa !important;
    }

    /* Next button */
    .next-btn {
        margin-top: 4rem;
        background: #a70532;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 1rem;
        width: 100%;
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        cursor: pointer;
    }

    .timer {
        margin-top: 0.8rem;
        text-align: center;
        font-size: 0.9rem;
        color: #0d233f;
    }

    /* FEEDBACK popup */
    .feedback {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        padding: 2rem 4rem;
        border-radius: 8px;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 1.4rem;
        color: white;
        text-transform: uppercase;
        opacity: 1;
        animation: fadeIn 0.2s ease-out;
    }

    .feedback.correct {
        background: #217224;
    }

    .feedback.wrong {
        background: #9fa5aa;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    .result {
        text-align: center;
        margin-top: 3rem;
    }

    .restart-btn {
        margin-top: 2rem;
        padding: 1rem 2rem;
        border-radius: 8px;
        background: #a70532;
        color: white;
        border: none;
        font-size: 1.2rem;
        font-weight: 600;
        text-transform: uppercase;
        font-family: "Montserrat", sans-serif;
    }
</style>
