# Snake Game

## Overview

This is a classic Snake game implemented in pure HTML, CSS, and JavaScript. The game runs entirely in the browser, using a grid-based system rendered with Unicode characters and styled with CSS for a retro terminal-like appearance.

## Features

- **Grid-based gameplay:** The snake moves on a 16x16 grid, with visible borders.
- **Keyboard controls:** Use the arrow keys to control the snake's direction.
- **Fruit spawning:** Randomly placed fruit appears on the grid; eating it increases the snake's length and score.
- **Self-collision detection:** The game ends if the snake collides with itself.
- **Screen wrapping:** The snake wraps around the edges of the grid.
- **Animated death screen:** Upon game over, a stylized ASCII art message is displayed, along with the player's score.
- **Responsive UI:** The game grid and death screen are styled for clarity and retro aesthetics.

## How It Works

### Game Initialization

- The game grid is represented as a 2D array (`gameGrid`) of size 18x18 (including borders).
- The snake is initialized as an array of coordinate objects, starting with a length of 3.
- A fruit is spawned at a random location not occupied by the snake.

### Rendering

- The grid is rendered using Unicode characters:
  - `■` for snake and borders
  - `□` for empty cells
- Colors are applied using custom HTML tags (`<green>`, `<lime>`, `<red>`, `<gray>`) and styled via CSS.
- The grid is displayed inside a `<p class="game-grid">` element, updated at regular intervals.

### Controls

- Arrow keys change the snake's direction, with logic to prevent reversing into itself.
- The snake moves automatically at a speed that increases as it grows longer.

### Game Loop

- On each tick:
  - The snake's body advances in the current direction.
  - If the snake eats the fruit, its length increases and a new fruit is spawned.
  - If the snake collides with itself, the game ends.
  - The snake wraps around the grid edges.

### Game Over

- When the snake collides with itself, the grid is hidden and a death screen is shown.
- The player's score (number of fruits eaten) is displayed.
- Pressing `Enter` reloads the page to restart the game.

## File Structure

- `sub-pages/snek/index.html` — Main HTML file for the Snake game.
- `sub-pages/snek/style.css` — CSS for layout, fonts, and color styling.
- `sub-pages/snek/script.js` — JavaScript logic for game state, rendering, and controls.

## How to Play

1. Open [sub-pages/snek/index.html](sub-pages/snek/index.html) in your browser.
2. Use the arrow keys to control the snake.
3. Eat the red fruit (`■`) to grow longer and increase your score.
4. Avoid running into your own tail.
5. When the game ends, press `Enter` to restart.

## Screenshots

![Snake Game Screenshot](../res/snake.png)

---

Feel free to customize the grid size, speed, or visuals by editing the relevant files!
