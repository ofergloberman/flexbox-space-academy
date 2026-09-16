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

function updateMissionSelect() {
  const navigation = document.getElementById('mission-navigation');
  const missionSelect = document.getElementById('missionSelect');
  let nextMission = 0;

  navigation.hidden = completedLevels.length === 0;
  missionSelect.replaceChildren();

  while (nextMission < levels.length && completedLevels.includes(nextMission)) {
    nextMission = nextMission + 1;
  }

  levels.forEach(function(level, index) {
    if (completedLevels.includes(index) || index === nextMission) {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = 'Mission ' + level.id + ': ' + level.title;

      if (completedLevels.includes(index)) {
        option.textContent += ' (completed)';
      } else {
        option.textContent += ' (continue)';
      }

      missionSelect.appendChild(option);
    }
  });

  missionSelect.value = currentLevel;
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
  board.classList.remove('feedback-success', 'feedback-error');

  flexDirectionSelect.value = 'row';
  justifyContentSelect.value = 'flex-start';
  alignItemsSelect.value = 'stretch';
  flexWrapSelect.value = 'nowrap';

  board.style.flexDirection = 'row';
  board.style.justifyContent = 'flex-start';
  board.style.alignItems = 'stretch';
  board.style.flexWrap = 'nowrap';
  updateMissionSelect();
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
    board.classList.remove('feedback-error');
    board.classList.add('feedback-success');

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
    updateMissionSelect();

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
    board.classList.remove('feedback-success');
    board.classList.add('feedback-error');
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
  const missionSelect = document.getElementById('missionSelect');

  const savedCurrentLevel = localStorage.getItem('currentLevel');
  const savedScore = localStorage.getItem('score');
  const savedCompletedLevels = localStorage.getItem('completedLevels');

  if (savedCurrentLevel !== null) {
    const levelNumber = Number(savedCurrentLevel);

    if (Number.isInteger(levelNumber) && levelNumber >= 0 && levelNumber < levels.length) {
      currentLevel = levelNumber;
    }
  }

  if (savedScore !== null) {
    const savedPoints = Number(savedScore);

    if (Number.isFinite(savedPoints) && savedPoints >= 0) {
      score = savedPoints;
    }
  }

  if (savedCompletedLevels !== null) {
    try {
      const savedLevels = JSON.parse(savedCompletedLevels);

      if (Array.isArray(savedLevels)) {
        savedLevels.forEach(function(levelIndex) {
          if (Number.isInteger(levelIndex) && levelIndex >= 0 &&
              levelIndex < levels.length && !completedLevels.includes(levelIndex)) {
            completedLevels.push(levelIndex);
          }
        });
      }
    } catch (error) {
      // Ignore damaged saved progress and start with no completed missions.
    }
  }

  if (!completedLevels.includes(currentLevel) && currentLevel > completedLevels.length) {
    currentLevel = completedLevels.length;
  }

  document.getElementById('score').textContent = score;
  loadLevel(currentLevel);

  board.addEventListener('animationend', function() {
    board.classList.remove('feedback-success', 'feedback-error');
  });

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

  missionSelect.addEventListener('change', function() {
    currentLevel = Number(missionSelect.value);
    saveProgress();
    loadLevel(currentLevel);
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
