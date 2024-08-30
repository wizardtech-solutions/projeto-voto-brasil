document.addEventListener('DOMContentLoaded', () => {
  const formInicioVoto = document.querySelector('#formInicioVoto');

  const inputs = document.querySelectorAll('.box_codigo');
  inputs.forEach((input, index) => {
    setTimeout(() => {
      input.style.color = '#333333'; // Torna o texto visível
    }, index * 200); // Ajusta o atraso para cada texto
  });


  setTimeout(() => {
    formInicioVoto.submit();
  }, 1500);





});


