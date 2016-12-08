Synth X is an experimental live coding environment for making music created with modern web technologies.

This project is experimental and is not ready to use.

### How to run it

`npm install`

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

You can generate the audioParser.js with `jison audioParser.jison`, to do this you will need to install Jison `npm install -g jison`

### Instructions supported

- **play** [ **note** | **number** ]  
`play 72`  
`play D4`  
`play d3`  

- **sequence**  **time** **start** **instruction**  
`sequence "4n" 0 play c4`  
(repeat every quarter note and start at 0 time, play c4 note)

- **transport**  **start**
`transport start`  
(it's like pressing the play button in any D.A.W.)

### Goals

* Create a live coding environment for making music in the browser that is simple to use.
* Design a new language that is friendly with programming students and musicians.
* Sonic boom… It has to sound amazing.
* Flexible architecture that can be integrated with the [Flow based programming](http://www.jpaulmorrison.com/fbp/) approach to software development.


### Inspiration

This project is inspired by [SonicPi](http://sonic-pi.net/).

### Autor  

Luis Fernando García
[luiscript.com](https://luiscript.com)
