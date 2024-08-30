
document.addEventListener('DOMContentLoaded', () => {

  const sec = document.querySelector('.content_tela_inicio_voto');
  if(sec) {
    const formInicioVoto = document.querySelector('#formInicioVoto');
    const code = document.querySelector('#id');
  
    const inputs = document.querySelectorAll('.box_codigo');
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.style.color = '#333333'; // Torna o texto visível
      }, index * 200); // Ajusta o atraso para cada texto
    });
  
    setTimeout(() => {
      if(code.value.length == 5) formInicioVoto.submit();
    }, 1500);


  }  

});


