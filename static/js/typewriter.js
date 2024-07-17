var words = [
  'Balance.', 'Leverage.', 'Technique.', 'Control.', 'Submission.', 'Escape.', 'Pressure.', 'Posture.',
  'Flexibility.', 'Agility.', 'Endurance.', 'Strength.', 'Timing.', 'Precision.', 'Strategy.', 'Adaptation.',
  'Flow.', 'Transition.', 'Mobility.', 'Stability.', 'Focus.', 'Discipline.', 'Patience.', 'Determination.',
  'Resilience.', 'Confidence.', 'Humility.', 'Respect.', 'Honour.', 'Trust.', 'Cooperation.', 'Communication.',
  'Teamwork.', 'Creativity.', 'Problemsolving.', 'Improvisation.', 'Intuition.', 'Awareness.', 'Adaptability.',
  'Efficiency.', 'Effectiveness.', 'Fluidity.', 'Coordination.', 'Relaxation.', 'Breathing.', 'Conditioning.',
  'Recovery.', 'Nutrition.', 'Preparation.', 'Progression.', 'Mastery.', 'Evolution.', 'Tradition.', 'Innovation.',
  'Simplicity.', 'Complexity.', 'Variety.', 'Versatility.', 'Refinement.'
];

var currentWordIndex = 0;
var currentLetterIndex = 0;
var typingSpeed = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
var wordPause = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
var typingTimeout;

function typeWriter() {
  if (currentWordIndex < words.length) {
    var currentWord = words[currentWordIndex];
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
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const observedElement = document.getElementById("typing");

  const observerOptions = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 1.0 // Trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is in view!');
        if (!typingTimeout) {
          typeWriter();
        }
      } else {
        console.log('Element is out of view!');
        clearTimeout(typingTimeout);
        typingTimeout = null;
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(observedElement);
});

