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
  }
})