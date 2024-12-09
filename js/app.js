const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGQ5ZGQ3ZTViMmY4MDllZGRiNmYzNjhhZjRlNGE4MSIsIm5iZiI6MTY5OTAzMDQyMi4xMzIsInN1YiI6IjY1NDUyNTk2NDFhNTYxMzM2Yjc2ZmIyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WGx4AvmmK-SLbwa6QqpxF0PJOKUpWlQ009Fks-3-wb8'
    }
  };

fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(res => res.json())
  .then(res => {
    console.log(res);

    const carouselInner = $('.carousel-inner');
    carouselInner.empty();

    let cnt = 0;
    let title = "";
    res.results.forEach(res => {
        if (res.original_title !== undefined) {
            title = res.original_title;
        } else if (res.original_name !== undefined) {
            title = res.original_name;
        }
        if (cnt == 0){
            const card = `
            <div class="carousel-item active" data-bs-interval="3000">
                <img src="https://image.tmdb.org/t/p/original/${res.backdrop_path}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${title}</h5>
                    <p>${res.overview}</p>
                </div>
                <input class="id" type="hidden" value="${res.id}">
                <input class="title" type="hidden" value="${res.original_title}">
                <input class="title-name" type="hidden" value="${res.original_name}">
                <input class="overview" type="hidden" value="${res.overview}">
                <input class="backdrop-path" type="hidden" value="${res.backdrop_path}">
            </div>
            `;
            carouselInner.append(card);
        } else {
            const card = `
            <div class="carousel-item" data-bs-interval="3000">
                <img src="https://image.tmdb.org/t/p/original/${res.backdrop_path}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${title}</h5>
                    <p>${res.overview}</p>
                </div>
                <input class="id" type="hidden" value="${res.id}">
                <input class="title" type="hidden" value="${res.original_title}">
                <input class="title-name" type="hidden" value="${res.original_name}">
                <input class="overview" type="hidden" value="${res.overview}">
                <input class="backdrop-path" type="hidden" value="${res.backdrop_path}">
            </div>
            `;
            carouselInner.append(card);
        }
        cnt = cnt + 1;
      });
    })
.catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => {
        console.log(res);

        const cardContainer = $('.popular-movie');
        cardContainer.empty();

        res.results.forEach(res => {
            const card = `
            <div class="card col-lg-2 col-md-3 col-4">
                <img class="card-img" src="https://image.tmdb.org/t/p/original/${res.poster_path}" />
                <input class="id" type="hidden" value="${res.id}">
                <input class="title" type="hidden" value="${res.original_title}">
                <input class="title-name" type="hidden" value="${res.original_name}">
                <input class="overview" type="hidden" value="${res.overview}">
                <input class="backdrop-path" type="hidden" value="${res.backdrop_path}">
            </div>
            `;
            cardContainer.append(card);
          });
    })
    .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
  .then(res => res.json())
  .then(res => {
    console.log(res);

    const cardContainer = $('.trending-tv');
    cardContainer.empty();

    res.results.forEach(res => {
        const card = `
        <div class="card col-lg-2 col-md-3 col-4">
            <img class="card-img" src="https://image.tmdb.org/t/p/original/${res.poster_path}" />
            <input class="id" type="hidden" value="${res.id}">
            <input class="title" type="hidden" value="${res.original_title}">
            <input class="title-name" type="hidden" value="${res.original_name}">
            <input class="overview" type="hidden" value="${res.overview}">
            <input class="backdrop-path" type="hidden" value="${res.backdrop_path}">
        </div>
        `;
        cardContainer.append(card);
      });
    })
  .catch(err => console.error(err));

  $('form').submit(function(event) {
    event.preventDefault();

    const keyword = $('.keyword').val();
    console.log(keyword);

    fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => {
        console.log(res);

        const wrapper = $('.wrapper');
        wrapper.empty();

        wrapper.append(`
            <div id="results" class="contents">
                <h3>Results</h3>
                <div class="results row gx-0"></div>
            </div>`);

        const cardContainer = $('.results');

        res.results.forEach(res => {
            if (res.media_type === "movie" || res.media_type === "tv"){
                const card = `
                <div class="card col-lg-2 col-md-3 col-4">
                    <img class="card-img" src="https://image.tmdb.org/t/p/original/${res.poster_path}" />
                    <input class="id" type="hidden" value="${res.id}">
                    <input class="title" type="hidden" value="${res.original_title}">
                    <input class="title-name" type="hidden" value="${res.original_name}">
                    <input class="overview" type="hidden" value="${res.overview}">
                    <input class="backdrop-path" type="hidden" value="${res.backdrop_path}">
                </div>
                `;
                cardContainer.append(card);
            }
        });
        })
    .catch(err => console.error(err));
});

  $(document).on('click', ".card, .carousel-item", function() {
    const id = $(this).children(".id").val();
    let title = '';
    const titleMovie = $(this).children(".title").val();
    const titleName = $(this).children(".title-name").val();
    const overview = $(this).children(".overview").val();
    const imgPath = $(this).children(".backdrop-path").val();
    if (titleMovie !== 'undefined') {
        title = titleMovie;
    } else if (titleName !== 'undefined') {
        title = titleName;
    }
    const popup = `
    <div class='modal'>
        <div class='modal-inner'>
            <img src="https://image.tmdb.org/t/p/original/${imgPath}" />
            <div>
                <h3>${title}</h3>
                <p>${overview}</p>
            </div>
            <button class='btn'>close</button>
        </div>
    </div>
    `
    $(".wrapper .overlay").remove();
    $(".wrapper").append("<div class='overlay'></div>");
    $(".overlay").append(popup);
    $('.modal, .overlay').fadeIn();
});

  $(document).on("click", ".modal button", function() {
    $('.modal, .overlay').fadeOut();
  });

  $(document).click(function(e) {
    if($(e.target).closest('.overlay').length) {
        $('.modal, .overlay').fadeOut();
    }
  });

// switch color
$(".dropdown-menu .light").on('click', function() {
    $("html").attr("data-bs-theme", "light");
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark").addClass('light');
    }
})
$(".dropdown-menu .dark").on('click', function() {
    $("html").attr("data-bs-theme", "dark");
    if ($("body").hasClass("light")) {
        $("body").removeClass("light").addClass('dark');
    }
})