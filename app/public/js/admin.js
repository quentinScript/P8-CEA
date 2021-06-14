let lastPos=7;
let lastCat=9.


$(function(){
    // on pose le telephone sur la table
socket.on('setPhonePosition', function (data) {
  console.log(data.id);
    $('[data-phone]').removeClass("show");
    $('[data-categorie]').removeClass("show");
   $('[data-phone="'+data.id+'"]').addClass("show");
    lastPos=7;
    lastCat= data.id;
    
    
    socket.emit('categorieChoice', {
      categorie: data.id
    });
});
    
    //choix d'une catégorie
  $('[data-categorie]').on('click', function(){
    
    let categorie = $(this).data('categorie');
    console.log(categorie);
      //lastCat= categorie;
    $('[data-categorie]').removeClass("show");
    $('[data-donnee]').removeClass("show");
      
      if(categorie != lastPos){
          lastPos = categorie;
   $('[data-categorie="'+categorie+'"]').addClass("show");
          }
      else{
          $('[data-categorie="'+categorie+'"]').removeClass("show");
          lastPos = 7;
      }
      
    socket.emit('categorieChoice', {
      categorie: categorie
    });
  });
    // pour 2G / 4G / 5G
    
    $('[data-donnee]').on('click', function(){
    
    let categorie = $(this).data('donnee');
    console.log(categorie);
    $('[data-categorie]').removeClass("show");
    $('[data-donnee]').removeClass("show");
      if(categorie != lastPos){
          lastPos = categorie;
   $('[data-donnee="'+categorie+'"]').addClass("show");
          }
      else{
          $('[data-donnee="'+categorie+'"]').removeClass("show");
          lastPos = 7;
      }
      
      
    socket.emit('categorieChoice', {
      categorie: categorie
    });
  });
    
    // pour la catégorie composant du téléphone
    $('[data-compo]').on('click', function(){
    
    let composant = $(this).data('compo');
    console.log(composant);
        
      
      
    socket.emit('composantChoice', {
      composant: composant
    });
  });
});
