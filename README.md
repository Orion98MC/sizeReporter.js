# Description

A "Tiny" Javascript to help you tune your adaptive designs by showing the size of your page and the possible targeted device.

# Flavors

There are two scripts:

* sizeReporter.js, which shows the size of your window, the possible targeted device and a picture of the targeted device, it weights about 19ko
* sizeReporter.lt.js, which does the same except it doesn't show the picture, it weights about 4ko

You may also find the minified versions in dist/

# Install

## Bookmarklet

Add a bookmark with the following address:

```js
javascript:(function()%7Bfunction%20callback()%7Balert(document.getElementById('SizeReporter')%3F'You%20may%20drag%20the%20block%20anywhere%20in%20the%20window'%3A'Failed%20to%20load%20SizeReporter')%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22http%3A%2F%2Fgithub.com%2FOrion98MC%2FsizeReporter.js%2Fraw%2Fmaster%2FsizeReporter.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```

## Locally

Include the script at the bottom of the page's body

```html
  <body>
    [...]
    <script src="pathTo/js/sizeReporter.js"></script>
  </body>
```

![Examples](http://i40.tinypic.com/2ik9sud.jpg)

# Browsers compatibility

Works on latest Safari and Chrome on mac. Please report any other working|not-working setups.

# License terms

Copyright (c), 2013 Thierry Passeron

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
