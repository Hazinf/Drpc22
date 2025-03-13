const RPC = require('discord-rpc');
const client = new RPC.Client({ transport: 'ipc' });

client.on('ready', () => {
  console.log('Rich Presence is ready!');

  // Function to get the activity suggestion based on time
  function getActivityBasedOnTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning! You can ping me!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "At school or chilling";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Doing homework";
    } else {
      return "Sleeping Don't ping me";
    }
  }

  // Function to get the image based on the time of day
  function getImageBasedOnTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'morning_image_key'; // Replace with your own morning image
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'afternoon_image_key'; // Replace with your own afternoon image
    } else if (currentHour >= 18 && currentHour < 22) {
      return 'evening_image_key'; // Replace with your own evening image
    } else {
      return 'night_image_key'; // Replace with your own night image
    }
  }

  // Function to handle button click event
  function onButtonClick(buttonIndex) {
    if (buttonIndex === 0) {
      console.log('GitHub button clicked!');
      // Add feedback or actions here, like opening a new tab for GitHub.
    } else if (buttonIndex === 1) {
      console.log('Rickroll button clicked!');
      // Add feedback or actions here, like logging the interaction or opening a page.
    }
  }

  // Function to dynamically change the text of the Rickroll button
  function getRickrollButtonText() {
    const currentHour = new Date().getHours();
    return currentHour >= 18 ? "Late-night Rickroll" : "Click me for a surprise!";
  }

  // Function to update the rich presence
  function updateRichPresence() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); // Format date as Month Day, Year
    const formattedTime = date.toLocaleTimeString(); // Format time as HH:MM:SS

    try {
      client.setActivity({
        details: getActivityBasedOnTime(),
        state: `Date: ${formattedDate}, Time: ${formattedTime}`,
        startTimestamp: Date.now(),
        largeImageKey: getImageBasedOnTime(),
        largeImageText: 'Rich PresenceV2', // Changed to reflect version update
        buttons: [
          {
            label: 'Get Script on GitHub',
            url: 'https://github.com/YourGitHubRepo', // Replace with your GitHub repository URL
          },
          {
            label: getRickrollButtonText(),
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rickroll link
          },
        ]
      });
    } catch (error) {
      console.error('Error updating rich presence:', error);
    }
  }

  // Update every 5 seconds
  setInterval(updateRichPresence, 5000);
  updateRichPresence(); // Initial update
});

// Login to Discord
client.login({ clientId: '1349694924689248288' }).catch(console.error);
