const background = document.getElementById('background');
const particleCount = 100;
const particleImage = 'your-particle-image.png';

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('img');
  particle.src = particleImage;
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${5 + Math.random() * 5}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  background.appendChild(particle);
}

const keyframes = `
  @keyframes fall {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);
