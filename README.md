Working with DOM, classList, events, timers of Javascript

The theme we went with is Nokia Classics, featuring 4 games: Snake, Pairs, Space Shooter, and Sudoku.
Since the theme is Nokia Classics, our design choices reflect those of old Nokia phones, giving off a nostalgic vibe, including a monotone color palette, pixelated font, etc.

Snake, Pairs, and Space Shooter were our original games, and Sudoku was an adaptation of an open-source javascript game with an MIT license. 

However, we encountered a number of obstacles while trying to implement the games, here are our personal experiences.

Tran's experience with the Snake and Pairs games:

There is some difficulty when I work on Snake game since there was a few times the snake hits the border, which is the boundaries but the snake is still alive. I need to work on the size and structure of the border to make sure when the snake hit the boundaries, the user will lose. I have also learned and practicing using spread function to copy the original snake but not modify it, and learn how to use setInterval. Furthermore, I need to understand how the snake moves and how to make it move from the original position because the axis of the border start at 0, and cannot put the snake at the original axis which is x=0, y=0. That could make the user struggle playing the game right at the beginning. Put the orginial position of the snake at x=10, y=10 is better since it is in the middle of the board game as my board game size is 20. 

In the Memory game, it was hard to have the correct size for the container that can contains all the images that can fit the screen. Also have experience working with setTimeout, which is very useful for this Memory game. Futhermore, using classList can be so efficient and powerful in this game since it can keep track the match box to know which ones we get correct already and remove the open box as long as we finish checking two boxes which does not matter if those two boxes are match or not. Continue this process until the user find all of the match box. 
