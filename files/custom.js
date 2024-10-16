$(document).ready(function () {
  var i = 0;

  $('.slide_footer h4').click(function () {
    if (i == 0) {
      $('.footer_wrap').show();
      $('.slide_footer h4').addClass('active');
      i++;
    } else if (i == 1) {
      $('.footer_wrap').hide();
      $('.slide_footer h4').removeClass('active');
      i = 0;
    }
  });

  $('.store_link').click(function () {
    alert('Currently preparing.');
  });

  let headerHeight = $('.header2, #header').height();
  let rollIt = $(this).scrollTop() >= headerHeight;

  if (rollIt) {
    $('.header2,  #header').addClass('on');
  } else {
    $('.header2,  #header').removeClass('on');
  }

  $(window).scroll(function () {
    let rollIt = $(this).scrollTop() >= headerHeight;
    if (rollIt) {
      $('.header2,  #header').addClass('on');
    } else {
      $('.header2,  #header').removeClass('on');
    }
  });

  $(window).scroll(function () {
    if(this.location.pathname.includes('/ad_select') || this.location.pathname.includes('/ad_write') ){
      if(!$('#toggleButton').hasClass('show')){
        if ($(this).scrollTop() > 200) {
          $('.go_top2').addClass('show');
        } else {
          $('.go_top2').removeClass('show');
        }
      }
    }else{
      if ($(this).scrollTop() > 200) {
        $('.go_top2').addClass('show');
      } else {
        $('.go_top2').removeClass('show');
      }
    }
  });

  $('.go_top2').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
    return false;
  });

  $('.btn-group-toggle button').click(function () {
    if (!$(this).hasClass('active')) {
      $('.btn-group-toggle .btn.active').removeClass('active');
      $(this).addClass('active');
    }
  });

  $('.form-control.custom-select').change(function () {
    $(this).css('color', '#222');
  });

  $('.hd_menu_btn, .menu_hd .close_btn, .menu_bg').on('click', function () {
    $('body').toggleClass('menu_on');
  });

  $('.gnb_1dli_wr, .point_collapse_hd').click(function () {
    var $this = $(this);
    var isExpanded = $this.attr('aria-expanded') === 'true';

    $this.attr('aria-expanded', !isExpanded);

    $this.toggleClass('on', !isExpanded);

    $($this.data('target')).collapse('toggle');
  });

  $(document).ready(function () {
    const $counters = $('.counter');

    const exposurePercentage = 100; 
    const duration = 1000;

    const addCommas = true; // ex) true = 1,000 / false = 1000

    function updateCounter($el, start, end) {
      let startTime;
      function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        const current = Math.round(start + progress * (end - start));
        const formattedNumber = addCommas ? current.toLocaleString() : current;
        $el.text(formattedNumber);

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          $el.text(addCommas ? end.toLocaleString() : end);
        }
      }
      requestAnimationFrame(animateCounter);
    }

    $(window)
      .on('scroll', function () {
        $counters.each(function () {
          const $el = $(this);
          if (!$el.data('scrolled')) {
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight;
            const contentHeight = rect.bottom - rect.top;

            if (
              rect.top <=
                winHeight - (contentHeight * exposurePercentage) / 100 &&
              rect.bottom >= (contentHeight * exposurePercentage) / 100
            ) {
              const start = parseInt($el.data('start'));
              const end = parseInt($el.data('end'));
              updateCounter($el, start, end);
              $el.data('scrolled', true);
            }
          }
        });
      })
      .scroll();
  });

  const slider = document.querySelector('.tab_st3_wr .row');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });
});
