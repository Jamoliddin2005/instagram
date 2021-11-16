$(function() {
    setTimeout(() => {
        $(".preload").fadeOut()
        $('.alert').animate({
            top: "-100px"
        }).fadeOut()
    }, 2000)
});