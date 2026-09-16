const levels = [
  {
    id: 1,
    title: 'Right Side Docking',
    instruction: 'Move all spaceships to the right side of the station.',
    numberOfShips: 3,
    solution: {
      justifyContent: 'flex-end'
    }
  },
  {
    id: 2,
    title: 'Central Docking',
    instruction: 'Move the fleet to the center of the station, both horizontally and vertically.',
    numberOfShips: 3,
    solution: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  {
    id: 3,
    title: 'Vertical Formation',
    instruction: 'Arrange the spaceships vertically from top to bottom.',
    numberOfShips: 4,
    solution: {
      flexDirection: 'column'
    }
  },
  {
    id: 4,
    title: 'Bottom Supply Line',
    instruction: 'Spread the spaceships evenly across the station and move them to the bottom.',
    numberOfShips: 4,
    solution: {
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  },
  {
    id: 5,
    title: 'Reverse Fleet',
    instruction: 'Reverse the order of the fleet and center the ships vertically.',
    numberOfShips: 4,
    solution: {
      flexDirection: 'row-reverse',
      alignItems: 'center'
    }
  },
  {
    id: 6,
    title: 'Hangar Overflow',
    instruction: 'The hangar is crowded. Allow the spaceships to continue onto additional rows.',
    numberOfShips: 12,
    solution: {
      flexWrap: 'wrap'
    }
  },
  {
    id: 7,
    title: 'Orbital Formation',
    instruction: 'Arrange the ships vertically, center them horizontally, and distribute space around them.',
    numberOfShips: 4,
    solution: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  },
  {
    id: 8,
    title: 'Final Fleet Challenge',
    instruction: 'Reverse the fleet, allow wrapping, distribute the ships evenly, and align them at the bottom.',
    numberOfShips: 12,
    solution: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
      flexWrap: 'wrap'
    }
  }
];

let currentLevel = 0;
let attempts = 0;
let score = 0;
const completedLevels = [];

function saveProgress() {
  localStorage.setItem('currentLevel', currentLevel);
  localStorage.setItem('score', score);
  localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
}

function loadLevel(index) {
  const level = levels[index];
  const board = document.getElementById('board');
  const flexDirectionSelect = document.getElementById('flexDirection');
  const justifyContentSelect = document.getElementById('justifyContent');
  const alignItemsSelect = document.getElementById('alignItems');
  const flexWrapSelect = document.getElementById('flexWrap');
  const nextBtn = document.getElementById('nextBtn');

  document.getElementById('current-level').textContent = level.id;
  document.getElementById('total-levels').textContent = levels.length;
  document.getElementById('mission-title').textContent = level.title;
  document.getElementById('mission-instruction').textContent = level.instruction;

  board.querySelectorAll('.ship').forEach(function(ship) {
    ship.remove();
  });

  for (let i = 0; i < level.numberOfShips; i++) {
    const ship = document.createElement('div');
    ship.className = 'ship';
    ship.textContent = '🚀';
    board.appendChild(ship);
  }

  attempts = 0;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('message').textContent = '';
  nextBtn.hidden = true;

  flexDirectionSelect.value = 'row';
  justifyContentSelect.value = 'flex-start';
  alignItemsSelect.value = 'stretch';
  flexWrapSelect.value = 'nowrap';

  board.style.flexDirection = 'row';
  board.style.justifyContent = 'flex-start';
  board.style.alignItems = 'stretch';
  board.style.flexWrap = 'nowrap';
}

function checkSolution() {
  const level = levels[currentLevel];
  const board = document.getElementById('board');
  const attemptsDisplay = document.getElementById('attempts');
  const scoreDisplay = document.getElementById('score');
  const message = document.getElementById('message');
  const nextBtn = document.getElementById('nextBtn');
  let isCorrect = true;

  attempts = attempts + 1;
  attemptsDisplay.textContent = attempts;

  Object.entries(level.solution).forEach(function(entry) {
    const property = entry[0];
    const correctValue = entry[1];

    if (board.style[property] !== correctValue) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    message.style.color = '#6ee7b7';

    if (!completedLevels.includes(currentLevel)) {
      let points = 50;

      if (attempts === 1) {
        points = 100;
      } else if (attempts === 2) {
        points = 90;
      } else if (attempts === 3) {
        points = 80;
      } else if (attempts === 4) {
        points = 70;
      }

      score = score + points;
      scoreDisplay.textContent = score;
      completedLevels.push(currentLevel);
    }

    saveProgress();

    if (currentLevel === levels.length - 1) {
      message.textContent = 'Academy completed! You finished all missions.';
      nextBtn.hidden = true;
    } else {
      message.textContent = 'Mission completed!';
      nextBtn.hidden = false;
    }
  } else {
    message.textContent = 'Not quite. Adjust the Flexbox controls and try again.';
    message.style.color = '#ffdede';
    nextBtn.hidden = true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const flexDirectionSelect = document.getElementById('flexDirection');
  const justifyContentSelect = document.getElementById('justifyContent');
  const alignItemsSelect = document.getElementById('alignItems');
  const flexWrapSelect = document.getElementById('flexWrap');
  const checkBtn = document.getElementById('checkBtn');
  const resetBtn = document.getElementById('resetBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');

  const savedCurrentLevel = localStorage.getItem('currentLevel');
  const savedScore = localStorage.getItem('score');
  const savedCompletedLevels = localStorage.getItem('completedLevels');

  if (savedCurrentLevel !== null) {
    const levelNumber = Number(savedCurrentLevel);

    if (levelNumber >= 0 && levelNumber < levels.length) {
      currentLevel = levelNumber;
    }
  }

  if (savedScore !== null) {
    score = Number(savedScore);
  }

  if (savedCompletedLevels !== null) {
    const savedLevels = JSON.parse(savedCompletedLevels);

    savedLevels.forEach(function(levelIndex) {
      if (!completedLevels.includes(levelIndex)) {
        completedLevels.push(levelIndex);
      }
    });
  }

  document.getElementById('score').textContent = score;
  loadLevel(currentLevel);

  flexDirectionSelect.addEventListener('change', function() {
    board.style.flexDirection = flexDirectionSelect.value;
  });

  justifyContentSelect.addEventListener('change', function() {
    board.style.justifyContent = justifyContentSelect.value;
  });

  alignItemsSelect.addEventListener('change', function() {
    board.style.alignItems = alignItemsSelect.value;
  });

  flexWrapSelect.addEventListener('change', function() {
    board.style.flexWrap = flexWrapSelect.value;
  });

  checkBtn.addEventListener('click', function(event) {
    event.preventDefault();
    checkSolution();
  });

  resetBtn.addEventListener('click', function(event) {
    event.preventDefault();
    loadLevel(currentLevel);
  });

  nextBtn.addEventListener('click', function() {
    if (currentLevel < levels.length - 1) {
      currentLevel = currentLevel + 1;
      saveProgress();
      loadLevel(currentLevel);
    }
  });

  restartBtn.addEventListener('click', function() {
    localStorage.removeItem('currentLevel');
    localStorage.removeItem('score');
    localStorage.removeItem('completedLevels');

    currentLevel = 0;
    score = 0;
    completedLevels.length = 0;

    document.getElementById('score').textContent = score;
    loadLevel(currentLevel);
  });
});
