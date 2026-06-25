const decorationImages = [
    "assets/images/BikiniBottom_Sky_01.png",
    "assets/images/BikiniBottom_Sky_02.png",
    "assets/images/BikiniBottom_Sky_03.png",
    "assets/images/BikiniBottom_Sky_04.png",
    "assets/images/BikiniBottom_Sky_05.png"
];

const decorationLayer = document.getElementById("body-decorations");

const settings = {
    amount: 40,

    minSize: 140,
    maxSize: 280,
    sizeStep: 5,

    minRotation: -25,
    maxRotation: 25,
    rotationStep: 1,

    minOpacity: 0.15,
    maxOpacity: 0.35,

    padding: 30,

    spacing: 75,
    maxAttempts: 200
};

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function randomStep(min, max, step) {
    const steps = Math.floor((max - min) / step);
    return min + Math.floor(Math.random() * (steps + 1)) * step;
}

function isOverlapping(newImage, placedImages) {
    for (let i = 0; i < placedImages.length; i++) {
        const oldImage = placedImages[i];

        const overlap =
            newImage.x < oldImage.x + oldImage.width + settings.spacing &&
            newImage.x + newImage.width + settings.spacing > oldImage.x &&
            newImage.y < oldImage.y + oldImage.height + settings.spacing &&
            newImage.y + newImage.height + settings.spacing > oldImage.y;

        if (overlap) {
            return true;
        }
    }

    return false;
}

function createDecorations() {
    decorationLayer.innerHTML = "";

    const pageWidth = document.body.scrollWidth;
    const pageHeight = document.body.scrollHeight;

    decorationLayer.style.height = pageHeight + "px";

    const placedImages = [];

    for (let i = 0; i < settings.amount; i++) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < settings.maxAttempts) {
            attempts++;

            const randomImage = decorationImages[Math.floor(Math.random() * decorationImages.length)];

            const size = randomStep(settings.minSize, settings.maxSize, settings.sizeStep);
            const rotation = randomStep(settings.minRotation, settings.maxRotation, settings.rotationStep);
            const opacity = randomBetween(settings.minOpacity, settings.maxOpacity);

            const x = randomBetween(settings.padding, pageWidth - size - settings.padding);
            const y = randomBetween(settings.padding, pageHeight - size - settings.padding);

            const newImage = {
                x: x,
                y: y,
                width: size,
                height: size
            };

            if (!isOverlapping(newImage, placedImages)) {
                const img = document.createElement("img");

                img.src = randomImage;
                img.style.width = size + "px";
                img.style.left = x + "px";
                img.style.top = y + "px";
                img.style.opacity = opacity;
                img.style.transform = `rotate(${rotation}deg)`;

                decorationLayer.appendChild(img);
                placedImages.push(newImage);

                placed = true;
            }
        }
    }
}

createDecorations();

function updateParallax() {
    const scrollSpeed = 0.45;
    decorationLayer.style.transform = `translateY(${-window.scrollY * scrollSpeed}px)`;
}

window.addEventListener("scroll", updateParallax);
window.addEventListener("resize", createDecorations);