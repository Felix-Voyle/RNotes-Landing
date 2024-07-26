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

let currentWordIndex = 0;
let currentLetterIndex = 0;
let typingTimeout;
const typingSpeed = 20
const wordPause = 20
let hasBeenInView = false; // Flag to track if the element has been viewed initially

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
  }
}

// Function to show the additional effect
const additionalEffect = () => {
  const btmLine = document.getElementById('btmLine');
  btmLine.classList.add('line-show');

  // First timeout for the 'btmLine' effect
  setTimeout(() => {
    const noLimits = document.getElementById('no-limits');
    noLimits.classList.add('no-limits-show');

    // potential timeout for the 'noLimits' effect, which then triggers the 'roll' effect
    //setTimeout(() => {
    //  const roll = document.getElementById('roll');
    //  roll.classList.add('roll-show');
    //}, 2000); 
  }, 2000); 
};

// Function to show the cursor
const cursorShow = () => {
  const cursor = document.getElementById('cursor');
  cursor.classList.add('cursor-show');
};

// Intersection observer callback function
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is in view!');
      if (!typingTimeout) {
        const topLine = document.getElementById('topLine');
        topLine.classList.add('line-show');
        
        if (!hasBeenInView) {
          // Apply delay only the first time the element is viewed
          setTimeout(cursorShow, 2000);
          setTimeout(typeWriter, 2000);
          hasBeenInView = true; // Set the flag to true after the initial view
        } else {
          typeWriter();
        }
      }
    } else {
      console.log('Element is out of view!');
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