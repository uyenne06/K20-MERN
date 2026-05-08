var splide = new Splide( '.splide',{
    perPage: 5,
    rewind: true,
    perMove: 1,
    type: "loop",
    wheel: true,
    autoplay: true,
    breakpoints: {
        1023: {
            perPage: 4,
        },
        823: {
            perPage: 3,
        },
        62: {
            perPage: 2,
        },
        423: {
            perPage: 1,
        },
    },
});
// splide.mount();