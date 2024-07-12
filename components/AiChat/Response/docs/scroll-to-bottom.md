# React Scroll to Bottom

# Options to consider

1. `initialScrollBehavior`: You might want to set this prop on the `ScrollToBottom` component. It can be either "auto" (discrete scrolling) or "smooth" (default). For example:

   ```jsx
   <ScrollToBottom initialScrollBehavior="smooth" ...>
   ```

2. `followButtonClassName`: If you want to style the default "scroll to bottom" button differently, you can provide a custom class name:

   ```jsx
   <ScrollToBottom followButtonClassName={styles.customFollowButton} ...>
   ```

3. `debounce`: If you want to adjust how often the scroll position is checked, you can set this prop (default is 17ms):

   ```jsx
   <ScrollToBottom debounce={50} ...>
   ```

4. `checkInterval`: This prop sets the interval for checking if the view should stick to the bottom (default is 150ms):

   ```jsx
   <ScrollToBottom checkInterval={100} ...>
   ```

5. Custom scroller: If you need more control over the scrolling behavior, especially with streaming messages, you might want to implement a custom scroller function:

   ```jsx
   const customScroller = ({ scrollHeight, clientHeight }) => {
     // Your custom scrolling logic here
     return scrollHeight - clientHeight;
   };

   <ScrollToBottom scroller={customScroller} ...>
   ```

