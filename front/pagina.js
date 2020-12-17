
function insereComent(nome, comentario, id){
  var novoComentario = document.createElement("div");
  var div_info = document.createElement("div");
  var nome_comentario = document.createElement("p");
  var botao_voz = document.createElement('button');
  var comentario_inserido = document.createElement("p");

  //Aplicação de classes;
  novoComentario.className = "Comentario";
  div_info.className = "HeadComentario";
  nome_comentario.className = "Nome";
  botao_voz.className = "botaoComentario";

  //Comunicação botão-comentario;
  comentario_inserido.id = id;
  botao_voz.value = id;
  botao_voz.type = "button";
  botao_voz.onclick = "iniciarVoz(this);"

  //Atribuição de conteudo;
  nome_comentario.innerHTML = nome+':';
  botao_voz.innerHTML = "VOZ";
  comentario_inserido.innerHTML = comentario;
  //Criação do comentario;
  div_info.appendChild(nome_comentario);
  div_info.appendChild(botao_voz);
  novoComentario.appendChild(div_info);
  novoComentario.appendChild(comentario_inserido);
  document.getElementById("DivComentarios").appendChild(novoComentario);

}

document.body.onload = function(){
  $.get("http://localhost:3000/carregar", (resposta) =>{
    var separar = JSON.parse(resposta);
    separar.forEach(element => {
      var comentario_formatado = JSON.parse(JSON.stringify(element));
      insereComent(comentario_formatado.nome, comentario_formatado.comentario, comentario_formatado.id);
    });
    return
  });
}

$('input').click(function(){
  if($(this).val() === "Escreva o seu nome:"){
    $(this).val("");
  };
});

$('textarea').click(function(){
  if(($(this).val()) === "Escreva a sua mensagem."){
    $(this).val("");
  };
})

$("button[name=cancelar]").click(() =>{
  $("input[name=Nome]").val("Escreva o seu nome:");
  $("textarea[name=Mensagem]").val("Escreva a sua mensagem:");
});

$('button[name=enviar]').click(() => {
  var nomeEnviado = $("input[name=Nome]").val();
  var mensagemEnviada = $("textarea[name=Mensagem]").val();
  var data = {nome: nomeEnviado, comentario: mensagemEnviada}
  $.post("http://localhost:3000/enviar", data, function(data){
    var res = JSON.parse(data)
    insereComent(res.nome, res.comentario, res.id);
    
 })
});

$("button[class=botaoComentario]").click(() =>{
  console.log("leu");
})

$('div[class=Comentario]').click(()=>{
  console.log("esse lixo vai");
})

$('.HeadComentario').click(()=>{
  console.log(" vai");
})
$('#DivComentarios').on("click", ".botaoComentario", function(){
  var acesse = $(this).val();
  console.log($('#'+acesse).html());
})
