const STORAGE_KEY = "QuizENT101";
//localStorage.removeItem("QuizENT101");

Vue.createApp({
    data() {
        return {
            questions: [],
            currentIndex: 0,
            selected: null,
            feedback: '',
            newQ: '',
            newOpts: '',
            newCorrect: 0,
            score: 0
        }
    },

    computed: {
        currentQuestion() {
            return this.questions[this.currentIndex];
        }
    },
    
    async created() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if  (saved) this.questions = JSON.parse(saved);
        else {
            const res = await fetch("questioners.json");
            this.questions = await res.json();
            this.questions = this.shuffle(this.questions);
        }
    },
    
    methods: {
        submit() {
            if (this.selected === null) {
                alert('Pick one'); 
                return;
            } 

            if (this.selected == this.currentQuestion.correctIndex) {
                this.feedback = "Correct!";
                if (this.score >= this.questions.length) {
                    this.score--;
                    this.feedback = '';
                }
                this.score++;
            } else {
                this.feedback = `Wrong! The correct answer is "${this.currentQuestion.options[this.currentQuestion.correctIndex]}".`;
            }

            if (this.currentIndex < this.questions.length - 1) {
                this.currentIndex++;
                this.selected = null;
            } else { 
                if (this.score == this.questions.length) {
                    this.feedback += " Nice you got a perfect score!";
                }
                alert('Quiz is finished!');
            }

        },

        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
}).mount('#app');
