gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.slider-wrapper',
      scrub: 1,
      start: "top top",
      end: "bottom bottom",
    }
  });

  // Animate .song_list
  let mm = gsap.matchMedia();

  mm.add("(min-width: 401px)", () => {
    tl.fromTo(".song_list", { yPercent: 5 }, { yPercent: -90 }, 0)
      .fromTo(".slider_img-wrapper", { top: "-265rem" }, { top: "265rem" }, 0);
  });

  mm.add("(max-width: 400px)", () => {
    tl.fromTo(".song_list", { yPercent: 5 }, { yPercent: -90 }, 0)
      .fromTo(".slider_img-wrapper", { top: "-235rem" }, { top: "235rem" }, 0);
  });

  let songList = $(".song_list"); // Select the container
  let items = songList.children().get(); // Convert jQuery object to an array

  items.reverse(); // Reverse the order of items

  // Append the reversed items back into the container
  $.each(items, function (index, item) {
    songList.append(item);
  });
});



$(".slider").each(function () {
  let $sliderImg = $(this).find(".slider_img-wrapper");
  let $songs = $(".song");

  gsap.set($sliderImg, { willChange: "transform, opacity", force3D: true });
  gsap.set($songs, { willChange: "opacity" });

  // Single unified state — only one index can be active at a time
  let activeIndex = -1;
  let leaveTimer = null;

  function activate(index) {
    if (activeIndex === index) return;
    clearTimeout(leaveTimer);

    // Reset previous image x
    if (activeIndex !== -1) {
      gsap.to($sliderImg.eq(activeIndex), {
        x: "0%", duration: 0.2, ease: "power2.out", overwrite: "auto"
      });
    }

    activeIndex = index;

    // Dim everything except the active pair
    gsap.to($sliderImg.not($sliderImg.eq(index)), {
      opacity: 0.25, duration: 0.2, overwrite: "auto"
    });
    gsap.to($sliderImg.eq(index), {
      opacity: 1, x: "15%", duration: 0.2, ease: "power2.out", overwrite: "auto"
    });
    gsap.to($songs.not($songs.eq(index)), {
      opacity: 0.25, duration: 0.2, overwrite: "auto"
    });
    gsap.to($songs.eq(index), {
      opacity: 1, duration: 0.2, overwrite: "auto"
    });
  }

  function deactivate() {
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(function () {
      if (activeIndex === -1) return;
      let idx = activeIndex;
      activeIndex = -1;

      gsap.to($sliderImg, { opacity: 1, duration: 0.2, overwrite: "auto" });
      gsap.to($sliderImg.eq(idx), {
        x: "0%", duration: 0.2, ease: "power2.out", overwrite: "auto"
      });
      gsap.to($songs, { opacity: 1, duration: 0.2, overwrite: "auto" });
    }, 150);
  }

  // Hover on IMAGE
  $sliderImg.each(function (index) {
    $(this).on("mouseenter", function () { activate(index); });
    $(this).on("mouseleave", function () { deactivate(); });
  });

  // Hover on SONG
  $songs.each(function (index) {
    $(this).on("mouseenter", function () { activate(index); });
    $(this).on("mouseleave", function () { deactivate(); });
  });
});


$(document).ready(function () {
  // 🔹 Text & Image Arrays
  let textArray = [
    "TẤM KHIÊN & ĐIỂM TỰA", "LỜI NHẮN TỪ VŨ TRỤ", "THẾ GIỚI SONG SONG",
    "BIẾN CHÔNG GAI THÀNH CƠ HỘI", "NGƯỜI ĐÀN ÔNG TRƯỞNG THÀNH MẠNH MẼ TIẾN LÊN",
    "ANH, TÔI THÀNH CHÚNG TA", "GIÁ TRỊ CỦA VĂN HÓA LÀ SỰ KẾT NỐI",
    "ĐỈNH NÓC, KỊCH TRẦN, BAY PHẤP PHỚI", "MÙA HÈ RỰC RỠ", "CẢM ƠN VÌ ĐÃ ĐẾN"
  ];

  let imageArray = [
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860acd2bfc505ce7f294_Property%201%3DDefault01.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860ab8bfe229f10ff092_Property%201%3DDefault02.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860ad1cc5dbf86a8b965_Property%201%3DDefault03.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a7055078f56d881e5_Property%201%3DDefault04.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a76d28f60e1900b7d_Property%201%3DDefault05.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860aaaa9e66cd428d163_Property%201%3DDefault06.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a83c0ed0c6c72a72c_Property%201%3DDefault07.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a25c4c8e6545c69bc_Property%201%3DDefault08.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a37ff54b81d0bae45_Property%201%3DDefault09.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860aa79f0c901ca50ed9_Property%201%3DDefault10.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a111e297205316d26_Property%201%3DDefault11.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860ae994495169ce06f2_Property%201%3DDefault12.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a90b4d2b580de7d2c_Property%201%3DVariant13.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a2d5d4dad66e287ce_Property%201%3DVariant14.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a80fc196182846595_Property%201%3DVariant15.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860a7898d97e5c3e0888_Property%201%3DVariant16.png",
    "https://cdn.prod.website-files.com/67c297bf156dfbf01f80f48e/67d6860abedede17797dee24_Property%201%3DVariant17.png"
  ];

  let index = 0;
  let totalFrames = imageArray.length;
  let interval;
  let customEase =
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";

  // 🔹 Init custom easing
  CustomEase.create("custom", customEase);

  // 🔹 Start bar animation alongside content loop
  gsap.fromTo(".bar", { width: "1%" },
    {
      width: "100%",
      duration: 3,
      ease: "custom"
    });

  function updateContent() {
    let textToShow = textArray[index % textArray.length];

    gsap.to(".loader_text", {
      duration: 0.1,
      ease: "custom",
      onComplete: function () {
        $(".loader_text").text(textToShow);
      }
    });

    gsap.to(".loader_img", {
      duration: 0.1,
      ease: "custom",
      onComplete: function () {
        $(".loader_img").attr("src", imageArray[index]);
      }
    });

    index = (index + 1) % totalFrames;
  }

  interval = setInterval(updateContent, 100);

  setTimeout(() => {
    clearInterval(interval);
    gsap.to('.pre-loader', {
      duration: 0.2,
      delay: 0.3,
      opacity: 0,
      ease: "custom",
      onComplete: () => {
        document.querySelector('.pre-loader').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, 3000);

  // 🔹 Event Listener: Click to Open Video Popup
  $(".slider_img-wrapper").on("click", function () {
    let videoID = $(this).attr("data-video-id"); // Get video ID
    let videoTitle = $(this).attr("data-title") || "Video Popup"; // Get title, fallback if empty

    if (videoID) {
      let src = `https://www.youtube.com/embed/${videoID}?cc_load_policy=0`; // Disable captions

      // Set popup window size and position
      const width = 800;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      // Open a new browser popup (resizable=no)
      let popup = window.open(
        "",
        "videoPopup",
        `width=${width},height=${height},left=${left},top=${top},resizable=no`
      );

      if (popup) {
        popup.document.write(`
          <html>
            <head>
              <title>${videoTitle}</title>
              <style>
                body { margin: 0; background: black; display: flex; justify-content: center; align-items: center; height: 100vh; }
                iframe { width: 100%; height: 100%; border: none; }
              </style>
            </head>
            <body>
              <iframe src="${src}" allowfullscreen></iframe>
            </body>
          </html>
        `);
        popup.document.close();
      } else {
        alert("Popup blocked! Please allow popups in your browser.");
      }
    }
  });
});
