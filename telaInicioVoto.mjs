document.addEventListener('DOMContentLoaded', () => {
  const formInicioVoto = document.querySelector('#formInicioVoto');
  const code = document.querySelector('#id');

  console.log('idinsert',code.value);

  const inputs = document.querySelectorAll('.box_codigo');
  inputs.forEach((input, index) => {
    setTimeout(() => {
      input.style.color = '#333333'; // Torna o texto visível
    }, index * 200); // Ajusta o atraso para cada texto
  });

  setTimeout(() => {
    if(code.value.length == 5) formInicioVoto.submit();
  }, 1500);





});


