const words = [
  'Balance.', 'Leverage.', 'Technique.', 'Control.', 'Submission.', 'Escape.', 'Pressure.', 'Posture.',
  'Flexibility.', 'Agility.', 'Endurance.', 'Strength.', 'Timing.', 'Precision.', 'Strategy.', 'Adaptation.',
  'Flow.', 'Transition.', 'Mobility.', 'Stability.', 'Focus.', 'Discipline.', 'Patience.', 'Determination.',
  'Resilience.', 'Confidence.', 'Humility.', 'Respect.', 'Honour.', 'Trust.', 'Cooperation.', 'Communication.',
  'Teamwork.', 'Creativity.', 'Problemsolving.', 'Improvisation.', 'Intuition.', 'Awareness.', 'Adaptability.',
  'Efficiency.', 'Effectiveness.', 'Fluidity.', 'Coordination.', 'Relaxation.', 'Breathing.', 'Conditioning.',
  'Recovery.', 'Nutrition.', 'Preparation.', 'Progression.', 'Mastery.', 'Evolution.', 'Tradition.', 'Innovation.',
  'Simplicity.', 'Complexity.', 'Variety.', 'Versatility.', 'Refinement.'
];

const typingSpeed = 15;
const wordPause = 10;
let currentWordIndex = 0;
let currentLetterIndex = 0;
let typingTimeout;
let hasScrolled = false;
let hasBeenInView = false;

// Function to type out words
function typeWriter() {
  if (currentWordIndex < words.length) {
    const currentWord = words[currentWordIndex];
    if (currentLetterIndex < currentWord.length) {
      document.getElementById("typing").innerHTML += currentWord.charAt(currentLetterIndex);
      currentLetterIndex++;
      typingTimeout = setTimeout(typeWriter, typingSpeed);
    } else {
      document.getElementById("typing").innerHTML += ' ';
      currentWordIndex++;
      currentLetterIndex = 0;
      typingTimeout = setTimeout(typeWriter, wordPause);
    }
  } else {
    additionalEffect();
    scrollToSubscribeSection();
  }
}

function scrollToSubscribeSection() {
  if (!hasScrolled) {
    setTimeout(() => {
      document.getElementById("subscribeSection").scrollIntoView({
        behavior: "smooth"
      });
      hasScrolled = true;
    }, 4000);
  }
}

// Function to show the additional effect
function additionalEffect() {
  const btmLine = document.getElementById('btmLine');
  btmLine.classList.add('line-show');

  setTimeout(() => {
    const noLimits = document.getElementById('no-limits');
    noLimits.classList.add('no-limits-show');
  }, 2000);
}

function beginEffect() {
  const jjTitle = document.getElementById('jjTitle');
  jjTitle.classList.add('jj-title-show');

  setTimeout(() => {
    const topLine = document.getElementById('topLine');
    topLine.classList.add('line-show');
  }, 1000);
}

// Function to show the cursor
function cursorShow() {
  const cursor = document.getElementById('cursor');
  cursor.classList.add('cursor-show');
}

// Intersection observer callback function
const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!typingTimeout) {
        beginEffect();
        if (!hasBeenInView) {
          setTimeout(() => {
            cursorShow();
            typeWriter();
          }, 2000);
          hasBeenInView = true;
        } else {
          typeWriter();
        }
      }
    } else {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  });
};

// Setup the observer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const observedElement = document.getElementById("typing");

  const observerOptions = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 1.0 // Trigger when 100% of the element is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(observedElement);
});