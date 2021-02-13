# Smart-Block-Ad-blocker-Chrome-Extension

An adblocker for Google Chrome, that I've published on Chrome Web Store here:
https://chrome.google.com/webstore/detail/smartblock-adblocker/hjpfndnpahcmoeabhcmnnlglhkppdhcm?hl=en&authuser=1

Adblockers are simple extensions in a browser that can allow an ad free expreience for the user.
Installing these adblockers allow you to automatically block all ads from appearing on here webpage.

![Alt text](img1.jpg?raw=true)

This Google Chrome extension works like any other chrome adblocker, but It was still a very interesting project. 
Making the adblocker more user friendly was a primary goal, and also with a nice modern UI.

The process for making the adblocker was simple in theory but got more interesting the more I went deep into it in practice. 
It was made using JavaScript mainly, but it includes HTML, CSS and Bootstrap for the User Interface since these are web elements.

First, the extension by default has a long list of various Ad servers which are hard-coded into the Javascript part of the extension.

While a webpage loads into any user's browser, the website does "requests" to various Ad servers, which bring in the annoying into the webpage.

Now I found out that we can actually block these webrequests from loading, Chrome has some built-in Javascript scripts which basically allows us to check before any webrequest is made, hence we can monitor if a webrequest is actually an ad that is taken out of one of the Ad servers. And once the extension finds out that the webrequest is indeed that of a Ad server, than it immediately blocks it from loading.

Hence this filters out all adservers, and you are left with a page that is Ad free.

BUT there are tons and tons of adservers out there and including every single one is quite hard, but I will do my best to add them as much as possible.

For any questions, you can contact me here: mohdzish2000@gmail.com
