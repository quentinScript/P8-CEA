var song = new Audio('https://cdn.glitch.com/97dc613b-fd0f-4701-a84c-110007fa8125%2Foofoe-whereucomefrom.mp4?v=1617201399021');
var songListen = false;



socket.on('setCategorie', function (data) {
  console.log(data);
  $('[data-souspage]').removeClass("show");
  $('[data-page]').removeClass("show");
  $('[data-composant]').removeClass("show");
  $('[data-souspage="'+data.categorie+'"]').addClass("show");
  $('[data-souspage] video').each(function(){
      $(this)[0].pause();
      $(this)[0].currentTime = 0.00001;
  });
    
  $('[data-souspage="'+data.categorie+'"] video')[0].play();
});


socket.on('setComposant', function (data) {
  console.log(data);
  $('[data-souspage]').removeClass("show");
  $('[data-page]').removeClass("show");
  $('[data-composant]').removeClass("show");
  $('[data-composant="'+data.composant+'"]').addClass("show");
});


   socket.on('setPhonePosition', function (data) {
  console.log(data.id);
    $('[data-page]').removeClass("show");
    $('[data-souspage]').removeClass("show");
   $('[data-souspage="'+data.id+'"]').addClass("show");
});



