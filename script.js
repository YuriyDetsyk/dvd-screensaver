// Initial setup
const imgEl = document.querySelector('#image');
const viewportSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const imageBoundingRect = imgEl.getBoundingClientRect();
const directionChanges = [
  { oldDirection: 'topRight', newDirection: 'topLeft', collisionType: 'horizontal' },
  { oldDirection: 'topRight', newDirection: 'bottomRight', collisionType: 'vertical' },
  { oldDirection: 'bottomRight', newDirection: 'bottomLeft', collisionType: 'horizontal' },
  { oldDirection: 'bottomRight', newDirection: 'topRight', collisionType: 'vertical' },
  { oldDirection: 'topLeft', newDirection: 'topRight', collisionType: 'horizontal' },
  { oldDirection: 'topLeft', newDirection: 'bottomLeft', collisionType: 'vertical' },
  { oldDirection: 'bottomLeft', newDirection: 'bottomRight', collisionType: 'horizontal' },
  { oldDirection: 'bottomLeft', newDirection: 'topLeft', collisionType: 'vertical' },
];
let direction = 'topRight';

imgEl.style.left = `${Math.max(Math.random() * viewportSize.width - imageBoundingRect.width, imageBoundingRect.width)}px`;
imgEl.style.top = `${Math.max(Math.random() * viewportSize.height - imageBoundingRect.height, imageBoundingRect.height)}px`;

// Animation
setInterval(() => {
  const collision = getCollision();
  if (collision) {
    changeImgColor();
    changeImgDirection(collision);
  }

  updateImgPosition();
}, 10);

// Collision check
function getCollision() {
  const boundingRect = imgEl.getBoundingClientRect();

  if (
    boundingRect.left >= viewportSize.width - boundingRect.width // right
    || boundingRect.left <= 0 // left
  ) {
    return 'horizontal';
  } else if (
    boundingRect.top >= viewportSize.height - boundingRect.height // bottom
    || boundingRect.top <= 0 // top
  ) {
    return 'vertical';
  }  else {
    return null;
  }
}

// Update image position
function updateImgPosition() {
  const oldPosition = {
    left: +(imgEl.style.left.split('px')[0]),
    top: +(imgEl.style.top.split('px')[0]),
  };

  switch (direction) {
    case 'topRight':
      imgEl.style.left = `${oldPosition.left + 1}px`;
      imgEl.style.top = `${oldPosition.top - 1}px`;
      break;

    case 'topLeft':
      imgEl.style.left = `${oldPosition.left - 1}px`;
      imgEl.style.top = `${oldPosition.top - 1}px`;
      break;

    case 'bottomRight':
      imgEl.style.left = `${oldPosition.left + 1}px`;
      imgEl.style.top = `${oldPosition.top + 1}px`;
      break;

    case 'bottomLeft':
      imgEl.style.left = `${oldPosition.left - 1}px`;
      imgEl.style.top = `${oldPosition.top + 1}px`;
      break;

    default:
      break;
  }
}

// Change direction
function changeImgDirection(collision) {
  const directionChange = directionChanges.find((item) => {
    return item.collisionType === collision && item.oldDirection === direction;
  });
  direction = directionChange.newDirection;
}

// Change color
function changeImgColor() {
  imgEl.style.filter = `invert(${Math.random() * 100}%) sepia(${Math.random() * 100}%) saturate(${Math.random() * 100}%) hue-rotate(${Math.random() * 360}deg) brightness(${Math.random() * 1000}%) contrast(${Math.random() * 100}%)`;
}