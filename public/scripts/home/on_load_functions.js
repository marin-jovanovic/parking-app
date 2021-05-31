
window.onload = function() {
   
    driver_tab_name_changer();

    $("#registerFormU").slideUp();
    $("#registerFormC").slideUp();

    // let tester = $(".center__err").html();

    // console.log(tester.length);

    // if (tester.length == 0) {
      // console.log("nikaj, pocetna vjv");

      // za pocetnu animaciju s logotipom
      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

      // TODO: fixano tako sta su dodani .text i .slider na kraj stranice
  
      // ne prepoznaje
      tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
      
      // ne prepoznaje
      tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
  
      try {
        tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");

      } catch(error) {

      }

      // tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
      // tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
      tl.fromTo(".landing", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

    // } else {
    //   console.log("ne pocetna");

    //   $(".intro").remove();

    // }

}
