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
var speed = Math.floor(Math.random() * (50 - 30 + 1)) + 30;

function typeWriter() {
  if (currentWordIndex < words.length) {
      var currentWord = words[currentWordIndex];
      if (currentLetterIndex < currentWord.length) {
          document.getElementById("typing").innerHTML += currentWord.charAt(currentLetterIndex);
          currentLetterIndex++;
          setTimeout(typeWriter, speed);
      } else {
          document.getElementById("typing").innerHTML += ' ';
          currentWordIndex++;
          currentLetterIndex = 0;
          setTimeout(typeWriter, speed);
      }
  }
}

document.addEventListener('DOMContentLoaded', (event) => {

  const observedElement = document.getElementById("typing");

  const observerOptions = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Element is in view!');
              typeWriter()
          } else {
              console.log('Element is out of view!');
          }
      });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  observer.observe(observedElement);
});
