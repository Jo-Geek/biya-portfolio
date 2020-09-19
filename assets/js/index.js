$(document).ready(() => {
  animateParticle();
  addDustParticles();

  $('[href="#aboutme"]').click(e => {
    showAboutMe(e);
  });

  $('[href="#myworks"]').click(e => {
    showWorks(e, false);
  });

  $('#aboutme').click(e => {
    e.preventDefault();
    e.stopPropagation();
  });

  $('#works button.back').click(e => {
    showHome(e);
  });

  $(document).click(() => {
    $('body').removeClass('aboutme');
  })

  itemTypeClick();

  scrollClick();
  thumbnailStripClick();
});

window.onload = () => {
  removeLoader();
  loadArticles();

}

function getNewCoord() {
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 50;
  var w = $(window).width() - 50;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function animateParticle() {
  var newq = getNewCoord();
  $('.particles img:nth-child(6)').animate({ top: newq[0], left: newq[1] }, 10000, function () {
    animateParticle();
  });
};

function addDustParticles() {
  for (i = 0; i < 10; i++) {
    $('#dust').append(`<span></span>`);
  }

  for (i = 0; i < 10; i++) {
    $('#dust').append(`<i></i>`);
  }
}

function itemTypeClick() {
  $('#works nav [data-type]').click(function () {

    $('#works nav [data-type]').removeClass('active');
    $(this).addClass('active');
    var type = $(this).data('type');
    $('#works .gallery').removeClass('all');
    $('#works .gallery').removeClass('modeling');
    $('#works .gallery').removeClass('digitalart');
    $('#works .gallery').removeClass('paperpencil');

    $('#works .gallery').addClass(type);

    $($(`#works .gallery [data-type='${type}']`).get(0)).click();
  })
}

function itemClick() {
  $('#works .list article').click(function () {
    let type = $(this).data('media-type');
    let caption = $(this).data('caption');
    $('#curentItem .item').empty();
    $('#curentItem .caption').html(caption);
    if (type == 'img') {
      let src = $(this).find('img').attr('src');
      $('#curentItem .item').css('background-image', `url('${src}')`);
    } else if (type == 'embed') {
      let src = $(this).data('embed-url');
      $('#curentItem .item').css('background-image', `none`);
      $('#curentItem .item').append(`<iframe title="vimeo-player" src="${src}" frameborder="0" allowfullscreen></iframe>`);
    }
  })
}

function scrollClick() {
  $('#works .gallery .scroll-up').click(function () {
    let scr = $('#works .gallery .item-scroller').scrollTop();
    $('#works .gallery .item-scroller').animate({ scrollTop: scr - $('#works .gallery .list').height() / 2 });
  })
  $('#works .gallery .scroll-down').click(function () {
    let scr = $('#works .gallery .item-scroller').scrollTop();
    $('#works .gallery .item-scroller').animate({ scrollTop: scr + $('#works .gallery .list').height() / 2 });
  })


  $('#works .list').bind('wheel', function (e) {
    if (e.originalEvent.deltaY < 0) {
      let scr = $('#works .gallery .item-scroller').scrollTop();
      $('#works .gallery .item-scroller').scrollTop(scr - 50);
    } else {
      let scr = $('#works .gallery .item-scroller').scrollTop();
      $('#works .gallery .item-scroller').scrollTop(scr + 50);
    }
  })
}

function thumbnailStripClick() {
  $('.thumbnail-strip article').click(function (e) {
    let type = $(this).data('media-type');
    let caption = $(this).find('.caption').text();
    $('#curentItem .item').empty();
    $('#curentItem .caption').html(caption);
    if (type == 'img') {
      let src = $(this).find('img').attr('src');
      $('#curentItem .item').css('background-image', `url('${src}')`);
    } else if (type == 'embed') {
      let src = $(this).data('embed-url');
      $('#curentItem .item').css('background-image', `none`);
      $('#curentItem .item').append(`<iframe title="vimeo-player" src="${src}" frameborder="0" allowfullscreen></iframe>`);
    }

    showWorks(e, true);
  })


}

function showAboutMe(e) {
  e.preventDefault();
  e.stopPropagation();
  $('body').addClass('aboutme');
}

function showWorks(e, dontTriggerFirst) {
  dontTriggerFirst = dontTriggerFirst || false;

  e.preventDefault();
  e.stopPropagation();
  $('body').attr('class', '');
  $('body').addClass('works');

  $('#works nav [data-type]').removeClass('active');
  $('#works nav [data-type=all]').addClass('active');
  var type = 'all';
  $('#works .gallery').removeClass('modeling');
  $('#works .gallery').removeClass('digitalart');
  $('#works .gallery').removeClass('paperpencil');

  $('#works .gallery').addClass(type);

  if (!dontTriggerFirst) {
    $($(`#works .gallery [data-type='${type}']`).get(0)).click();
  }
}

function showHome(e) {
  e.preventDefault();
  e.stopPropagation();
  $('body').attr('class', '');
}

function loadArticles() {
  $.get('assets/images/gallery/manifest.json', data => {
    console.log(data);

    data.forEach(article => {
      let html = '<article ';
      html += `data-type='${article.type}' data-media-type='${article.mediaType}' data-caption='${article.caption}'`;

      if (article.embedUrl) {
        html += ` data-embed-url='${article.embedUrl}'`;
      }

      html += `><img src='assets/images/gallery/${article.imgSrc}'/></article>`;

      $('.gallery .item-scroller').append(html);
    });

    itemClick();
  })
  /*
   <article data-type="modeling" data-media-type="embed" data-caption="Adventure 3D Reel"
              data-embed-url="https://player.vimeo.com/video/278965903">
              <img src="assets/images/Gallery/adventure.png" />
            </article>
  */
}

function removeLoader() {
  setTimeout(() => {
    //remove the laoder
    $('.loader').animate({ top: '-100%' }, 300, () => {

      //activate social icons
      setTimeout(() => {
        $('.social-icons').addClass('activate');

        //activate thumbnail strip
        setTimeout(() => {
          $('section.thumbnail-strip').addClass('activate');


        }, 400); //activate thumbnail strip
      }, 400); //activate social icons
    }); //remove the laoder
  }, 1000);

}