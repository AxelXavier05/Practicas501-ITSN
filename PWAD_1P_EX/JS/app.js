function actualizarReloj(){
  const span=document.getElementById('reloj');
  if(!span)return;
  const ahora=new Date();
  const pad=n=>String(n).padStart(2,'0');
  span.textContent=`${pad(ahora.getHours())}:${pad(ahora.getMinutes())}:${pad(ahora.getSeconds())}`;
}
setInterval(actualizarReloj,1000);
actualizarReloj();

(function(){
  const form=document.getElementById('form-contacto');
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const nombre=document.getElementById('nombre');
    const correo=document.getElementById('correo');
    const mensaje=document.getElementById('mensaje');
    [nombre,correo,mensaje].forEach(c=>c.classList.remove('is-invalid'));
    let valido=true;
    if(!nombre.value.trim()){nombre.classList.add('is-invalid');valido=false;}
    const patronCorreo=/^\S+@\S+\.\S+$/;
    if(!patronCorreo.test(correo.value.trim())){correo.classList.add('is-invalid');valido=false;}
    if(!mensaje.value.trim()){mensaje.classList.add('is-invalid');valido=false;}
    if(!valido)return;
    alert('¡Gracias! Tu mensaje fue enviado correctamente.');
    form.reset();
  });
})();
