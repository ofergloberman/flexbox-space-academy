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

function loadLevel(index) {
  const level = levels[index];
  const board = document.getElementById('board');
  const flexDirectionSelect = document.getElementById('flexDirection');
  const justifyContentSelect = document.getElementById('justifyContent');
  const alignItemsSelect = document.getElementById('alignItems');
  const flexWrapSelect = document.getElementById('flexWrap');

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

  flexDirectionSelect.value = 'row';
  justifyContentSelect.value = 'flex-start';
  alignItemsSelect.value = 'stretch';
  flexWrapSelect.value = 'nowrap';

  board.style.flexDirection = 'row';
  board.style.justifyContent = 'flex-start';
  board.style.alignItems = 'stretch';
  board.style.flexWrap = 'nowrap';
}

document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const flexDirectionSelect = document.getElementById('flexDirection');
  const justifyContentSelect = document.getElementById('justifyContent');
  const alignItemsSelect = document.getElementById('alignItems');
  const flexWrapSelect = document.getElementById('flexWrap');

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
});
