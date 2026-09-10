/* =========================================
   SELECT ELEMENTS
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================================
   VARIABLES
========================================= */

let currentIndex = 0;

let visibleItems = Array.from(galleryItems);


/* =========================================
   FILTER IMAGES
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active from all buttons */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* Add active to clicked button */

        button.classList.add("active");


        /* Get selected category */

        const selectedCategory =
            button.dataset.filter;


        /* Filter gallery */

        visibleItems = [];


        galleryItems.forEach(item => {

            const itemCategory =
                item.dataset.category;


            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.classList.remove("hide");

                visibleItems.push(item);

            } else {

                item.classList.add("hide");

            }

        });

    });

});


/* =========================================
   OPEN LIGHTBOX
========================================= */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        /* Find clicked image in visible items */

        currentIndex =
            visibleItems.indexOf(item);


        if (currentIndex === -1) {
            return;
        }


        showImage();


        lightbox.classList.add("show");


        /* Prevent background scrolling */

        document.body.style.overflow = "hidden";

    });

});


/* =========================================
   SHOW IMAGE
========================================= */

function showImage() {

    const item =
        visibleItems[currentIndex];


    if (!item) {
        return;
    }


    const image =
        item.querySelector("img");


    const title =
        item.querySelector("h3");


    const category =
        item.querySelector("p");


    /* Set image */

    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt;


    /* Set title */

    lightboxTitle.textContent =
        title.textContent;


    /* Set category */

    lightboxCategory.textContent =
        category.textContent;


    /* Counter */

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;

}


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {

    currentIndex++;


    if (
        currentIndex >=
        visibleItems.length
    ) {

        currentIndex = 0;

    }


    showImage();

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {

    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    showImage();

}


/* =========================================
   BUTTON EVENTS
========================================= */

nextBtn.addEventListener(
    "click",
    nextImage
);


prevBtn.addEventListener(
    "click",
    previousImage
);


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}


closeBtn.addEventListener(
    "click",
    closeLightbox
);


/* =========================================
   CLICK OUTSIDE IMAGE TO CLOSE
========================================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", (event) => {

    /* Escape */

    if (
        event.key === "Escape" &&
        lightbox.classList.contains("show")
    ) {

        closeLightbox();

    }


    /* Right Arrow */

    if (
        event.key === "ArrowRight" &&
        lightbox.classList.contains("show")
    ) {

        nextImage();

    }


    /* Left Arrow */

    if (
        event.key === "ArrowLeft" &&
        lightbox.classList.contains("show")
    ) {

        previousImage();

    }

});