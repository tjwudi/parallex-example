$(document).ready(function() {
  // skrollr object 
  var skr = null;

  // Size the height of all page sections to
  // the height of the initial viewport
  var $pages = $('section[id*="-page"]'),
      $firstPage = $pages.filter('#first-page'),
      $secondPage = $pages.filter('#second-page'),
      $logoWrapper = $firstPage.find('.logo-wrapper'),
      $window = $(window);

  function resizeFirstPage() {
    var newHeight = $window.height();
    $firstPage.height(newHeight);
    $secondPage.css('margin-top', newHeight);
    $logoWrapper.width($window.width());
    $window.on('resize', function(event) {
      $logoWrapper.width($window.width());
    });
  }

  /**
   * Reposition all elements that should be
   * vertical aligned.
   * @function
   */
  var $vc = $('.vc');
  function repositionVC() {
    $vc.each(function() {
      var $vc = $(this),
          vcPosition = $vc.css('position');
      // they are originally not visible
      $vc.css('visibility', 'visible');

      if ($vc.hasClass('vcw')) {
        // vertical align to window
        $vc.css('top', ($window.height() - $vc.height()) / 2);
      }
      else if (vcPosition === 'absolute' || vcPosition === 'relative') {
        $vc.css('top', ($vc.parent().height() - $vc.height()) / 2);
      }
      else {
        $vc.css('margin-top', ($vc.parent().height() - $vc.height()) / 2);
      }
    });
  }
  
  $window.bind('load', function(event) {
    resizeFirstPage();
    repositionVC();
  });

  // Initialize the parallex effect for the iphone :)
  $parallexImg = $('.parallex-img:first');
  $parallexImg.css('top', $window.height());
  $parallexImg.attr('data-' + 0 + '-start', 'margin-top: -20px;');
  $parallexImg.attr('data-' + $window.height() + '-start', 'margin-top: -80px;');

  // Remove the pre mask
  var $body = $(document.body),
      $preMask = $('.pre-mask')
      $main = $('main');
  setTimeout(function() {
    $body.removeClass('pre');
    $preMask.removeClass('activated');
    $main.removeClass('hidden');
  }, 800);

  // init skrollr
  skr = skrollr.init();
});
