let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
let body = document.querySelector('body');
if (isMobile.any()) {
   body.classList.add('touch');
   let arrow = document.querySelectorAll('.arrow');
   for (i = 0; i < arrow.length; i++) {
      let thisLink = arrow[i].previousElementSibling;
      let subMenu = arrow[i].nextElementSibling;
      let thisArrow = arrow[i];

      thisLink.classList.add('parent');
      arrow[i].addEventListener('click', function () {
         subMenu.classList.toggle('open');
         thisArrow.classList.toggle('active');
      });
   }
} else {
   body.classList.add('mouse');
}
jQuery('img.svg').each(function () {
   var $img = jQuery(this);
   var imgID = $img.attr('id');
   var imgClass = $img.attr('class');
   var imgURL = $img.attr('src');

   jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image ID to the new SVG
      if (typeof imgID !== 'undefined') {
         $svg = $svg.attr('id', imgID);
      }
      // Add replaced image classes to the new SVG
      if (typeof imgClass !== 'undefined') {
         $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
         $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

   }, 'xml');

});
$('.menuu .button').click(function (event) {
   $(this).toggleClass('active');
   $('.burgerr').toggleClass('active');
   return false;
});
$('.nav__link').click(function (event) {
   event.preventDefault();
   $('.sub-menu__list').toggleClass('on');
});
$(document).mouseup(function (e) {
   var container = $(".on");
   if (container.has(e.target).length === 0) {
      container.removeClass('on');
   }
});
// Accordeon
$(document).ready(function () {
   $(".set > a").on("click", function () {
      if ($(this).hasClass('active')) {
         $(this).removeClass("active");
         $(this).siblings('.content').slideUp(200);
         $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      }
      else {
         $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
         $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
         $(".set > a").removeClass("active");
         $(this).addClass("active");
         $('.content').slideUp(200);
         $(this).siblings('.content').slideDown(200);
      }
      return false
   });

});
$('.tel').on('input', function () {
   $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''))
});