<script>
    let questions = [
        {
            title: "Dermopure Clinical",
            subtitle:
                "Derm-recommended solutions to correct blemishes and marks, from skin to mind.",
            answers: ["Option A", "Option B", "Option C", "Option D"],
            correct: 1,
        },
        {
            title: "Another Topic",
            subtitle: "Short description goes here in normal case text.",
            answers: ["A", "B", "C", "D"],
            correct: 0,
        },
        {
            title: "Final Question",
            subtitle: "Something descriptive again.",
            answers: ["A", "B", "C", "D"],
            correct: 2,
        },
    ];

    let current = 0;
    let selected = null;
    let score = 0;
    let finished = false;

    function choose(index) {
        if (selected !== null) return;

        selected = index;

        if (index === questions[current].correct) score++;

        setTimeout(() => {
            if (current < questions.length - 1) {
                current++;
                selected = null;
            } else {
                finished = true;
            }
        }, 900);
    }

    function restart() {
        current = 0;
        selected = null;
        score = 0;
        finished = false;
    }
</script>

{#if !finished}
    <h1 class="title">{questions[current].title}</h1>
    <p class="subtitle">{questions[current].subtitle}</p>

    <div class="answers">
        {#each questions[current].answers as ans, i}
            <button
                class="answer-btn
        {selected !== null && i === questions[current].correct ? 'correct' : ''}
        {selected === i && i !== questions[current].correct ? 'wrong' : ''}"
                on:click={() => choose(i)}
                disabled={selected !== null}
            >
                {ans}
            </button>
        {/each}
    </div>
{:else}
    <div class="result">
        <h1 class="title">Your Score</h1>
        <p class="subtitle">{score} / {questions.length}</p>
        <button class="restart-btn" on:click={restart}>Restart</button>
    </div>
{/if}

<style>
    .title {
        font-family: "Montserrat", sans-serif;
        font-weight: 600; /* SemiBold */
        text-transform: uppercase;
        font-size: 1.8rem;
        color: #0d233f;
        margin-bottom: 1rem;
    }

    .subtitle {
        font-family: "Montserrat", sans-serif;
        font-weight: 500; /* Medium */
        font-size: 1rem;
        color: #0d233f;
        margin-bottom: 2rem;
        line-height: 1.4;
        text-transform: none;
    }

    .answers {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .answer-btn {
        background: #a70532;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 1rem;
        font-size: 1rem;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s;
    }

    .answer-btn:hover {
        background: #8c042b;
    }

    .answer-btn.correct {
        background: #4caf50 !important;
    }

    .answer-btn.wrong {
        background: #d32f2f !important;
    }

    .result {
        text-align: center;
    }

    .restart-btn {
        margin-top: 2rem;
        background: #a70532;
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border-radius: 8px;
        text-transform: uppercase;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
    }
</style>
