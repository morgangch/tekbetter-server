# How to get your microsoft session cookie ?

You can find your session cookie by following these steps:

### 1. Open your browser 
And ensure you are logged in to your Microsoft account, and you have checked the "Keep me signed in" option.


### 2. Turn off your internet connection
It's required for the next step, else you will automatically be redirected to the Microsoft homepage.

### 3. Go to [https://login.microsoftonline.com](https://login.microsoftonline.com)

### 4. Open the developer tools
And go to "Application" tab, then "Cookies" in the left menu.
Search the `ESTSAUTHPERSISTENT` cookie, and copy its value.

![img.png](getcookies.png)


## Now you have your session cookie
Paste it on the TekBetter dashboard, or in the config file of your personal scraper.