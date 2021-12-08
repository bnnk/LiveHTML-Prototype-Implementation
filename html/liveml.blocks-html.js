const bparsers = Object.assign(blocks, {
  html: (bval, app) => app.innerHTML += bval,
  ehtml: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    if(elem) elem.innerHTML += bval[1]
  },
  ehtmlw: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    if(elem) elem.innerHTML = bval[1]
  },
  htmlw: (bval, app) => app.innerHTML = bval,
  css: (bval, app) => app.style = bval,
  ecss: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    if(elem) elem.style = bval[1]
  },
  attr: (bval, app) => Object.assign(app, bval),
  eattr: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    Object.assign(elem, bval[1])
  },
  js: (bval, app) => { 
    var elem = document.createElement("script")
    elem.innerText = bval
  },
  text: (bval, app) => app.innerText += bval,
  etext: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    if(elem) elem.innerText += bval[1]
  },
  etextw: (bval, app) => { 
    var elem = app.querySelector(bval[0])
    if(elem) elem.innerText = bval[1]
  },
  textw: (bval, app) => app.innerText = bval,
})