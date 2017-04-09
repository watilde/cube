(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (!Detector.webgl) Detector.addGetWebGLMessage()

var mouseX = 0
var mouseY = 0
var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2
var camera
var scene
var renderer

init()
animate()

function init () {
  var i = 0
  var container = document.createElement('div')
  var geometry = new THREE.Geometry()
  var points = hilbert3D(
    new THREE.Vector3(0, 0, 0), 200.0, 4, 0, 1, 2, 3, 4, 5, 6, 7
  )
  document.body.appendChild(container)
  camera = new THREE.PerspectiveCamera(
    33, window.innerWidth / window.innerHeight, 1, 10000
  )
  camera.position.z = 700
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  for (i = 0; i < points.length; i++) {
    geometry.vertices.push(points[i])
  }
  var line
  var parameter
  var scale = 0.3
  var color = 0x555555
  var m = new THREE.LineBasicMaterial({
    color: color,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    transparent: true
  })
  var parameters = [
    [m, scale * 0.8, [0, 0, 0], geometry]
  ]
  for (i = 0; i < parameters.length; i++) {
    parameter = parameters[ i ]
    line = new THREE.Line(parameter[3], parameter[0])
    line.scale.x = line.scale.y = line.scale.z = parameter[1]
    line.position.x = parameter[2][0]
    line.position.y = parameter[2][1]
    line.position.z = parameter[2][2]
    scene.add(line)
  }
  addEventListener()
}

function addEventListener () {
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('touchstart', onDocumentTouchStart, false)
  document.addEventListener('touchmove', onDocumentTouchMove, false)
  window.addEventListener('resize', onWindowResize, false)
}
function onWindowResize () {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
function onDocumentMouseMove (event) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}
function onDocumentTouchStart (event) {
  if (event.touches.length > 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}
function onDocumentTouchMove (event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}
function animate () {
  window.requestAnimationFrame(animate)
  render()
}
function render () {
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05
  camera.lookAt(scene.position)
  var time = Date.now() * 0.0015
  for (var i = 0; i < scene.children.length; i++) {
    var object = scene.children[ i ]
    if (object instanceof THREE.Line) object.rotation.y = time * (i % 2 ? 1 : -1)
  }
  renderer.render(scene, camera)
}

},{}]},{},[1]);
