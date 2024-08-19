document.addEventListener('DOMContentLoaded', () => {

    const inputs = document.querySelectorAll('.box_codigo');
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.style.color = '#333333'; // Torna o texto visível
      }, index * 250); // Ajusta o atraso para cada texto
    });
    
});


