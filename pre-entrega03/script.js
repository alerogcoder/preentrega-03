// Clase para manejar el cuestionario
class Quiz {

    constructor() {
        this.totalPuntos = 0;
        this.totalCorrectos = 0;
        this.totalIncorrectos = 0;
        this.nombreUsuario = '';
        this.preguntas = [
            { pregunta: "¿Cuándo se estrenó Psicosis? (Alfred Hitchcock)", respuesta: "1960" },
            { pregunta: "¿Cuándo se estrenó La Naranja Mecánica? (Stanley Kubrik)", respuesta: "1971" },
            { pregunta: "¿Cuándo se estrenó Reservoir Dogs? (Quentin Tarantino)", respuesta: "1992" },
            { pregunta: "¿Cuándo se estrenó Réquiem por un Sueño? (Darren Aronofsky)", respuesta: "2000" },
            { pregunta: "¿Cuándo se estrenó Whiplash? (Damien Chazelle)", respuesta: "2014" },
            { pregunta: "¿Cuándo se estrenó Avengers: Endgame? (Hermanos Russo)", respuesta: "2019" }
        ];
        this.currentQuestionIndex = 0;
    }

    // Método para actualizar puntos correctos
    puntosCorrectos() {
        this.totalCorrectos++;
        this.totalPuntos++;
    }

    // Método para actualizar puntos incorrectos
    puntosIncorrectos() {
        this.totalIncorrectos++;
        this.totalPuntos--;
    }

    // Método para verificar si el usuario es "pepe"
    nameIsPepe() {
        if (this.nombreUsuario.toLowerCase() === "pepe") {
            this.totalPuntos = 7;
            this.mostrarResultadoFinal();
            return true;
        }
        return false;
    }

    // Método para mostrar alertas finales
    mostrarResultadoFinal() {
        const resultados = `${this.nombreUsuario.toUpperCase()}: has acertado ${this.totalCorrectos} preguntas sobre 6. 
                            Has fallado ${this.totalIncorrectos} preguntas sobre 6.
                            Tu total de puntos es de ${this.totalPuntos}`;
        document.getElementById('finalResults').textContent = resultados;
        document.getElementById('results').classList.remove('hidden');

        // Guardar los resultados en Local Storage
        localStorage.setItem('quizResult', JSON.stringify({
            nombreUsuario: this.nombreUsuario,
            totalCorrectos: this.totalCorrectos,
            totalIncorrectos: this.totalIncorrectos,
            totalPuntos: this.totalPuntos
        }));
    }

    // Método para mostrar la siguiente pregunta
    mostrarPregunta() {
        if (this.currentQuestionIndex < this.preguntas.length) {
            document.getElementById('currentQuestion').textContent = this.preguntas[this.currentQuestionIndex].pregunta;
            document.getElementById('questions').classList.remove('hidden');
        } else {
            this.mostrarResultadoFinal();
        }
    }

    // Método para manejar la respuesta del usuario
    manejarRespuesta(respuestaUsuario) {
        if (respuestaUsuario === this.preguntas[this.currentQuestionIndex].respuesta) {
            this.puntosCorrectos();
        } else {
            this.puntosIncorrectos();
        }
        this.currentQuestionIndex++;
        this.mostrarPregunta();
    }

    // Método para iniciar el cuestionario
    iniciar(nombreUsuario) {
        this.nombreUsuario = nombreUsuario;

        if (this.nameIsPepe()) {
            return;
        }

        // Ocultar el input del nombre
        document.getElementById('userInput').classList.add('hidden');

        // Mostrar la primera pregunta
        this.mostrarPregunta();
    }

    // Método para reiniciar el cuestionario
    reiniciar() {
        this.totalPuntos = 0;
        this.totalCorrectos = 0;
        this.totalIncorrectos = 0;
        this.currentQuestionIndex = 0;

        // Ocultar secciones de preguntas y resultados
        document.getElementById('questions').classList.add('hidden');
        document.getElementById('results').classList.add('hidden');

        // Mostrar la sección de entrada de usuario
        document.getElementById('userInput').classList.remove('hidden');
    }
}

// Crear instancia del cuestionario
const quiz = new Quiz();

// Manejar eventos del DOM
document.getElementById('startQuiz').addEventListener('click', () => {
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    quiz.iniciar(nombreUsuario);
});

document.getElementById('submitAnswer').addEventListener('click', () => {
    const respuestaUsuario = document.getElementById('userAnswer').value;
    document.getElementById('userAnswer').value = ''; // Limpiar el input
    quiz.manejarRespuesta(respuestaUsuario);
});

document.getElementById('restartQuiz').addEventListener('click', () => {
    quiz.reiniciar();
});

// Recuperar los resultados de Local Storage
const resultadoGuardado = JSON.parse(localStorage.getItem('quizResult'));
if (resultadoGuardado) {
    const { nombreUsuario, totalCorrectos, totalIncorrectos, totalPuntos } = resultadoGuardado;
    document.getElementById('finalResults').textContent = `${nombreUsuario.toUpperCase()}: has acertado ${totalCorrectos} preguntas sobre 6. 
                                                        Has fallado ${totalIncorrectos} preguntas sobre 6.
                                                        Tu total de puntos es de ${totalPuntos}`;
    document.getElementById('results').classList.remove('hidden');
}
