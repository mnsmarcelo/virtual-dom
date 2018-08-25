"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function h(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    type: type,
    props: props || {},
    children: children
  };
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function isCustomProp(name) {
  return false;
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setProps($target, props) {
  Object.keys(props).forEach(function (name) {
    setProp($target, name, props[name]);
  });
}

function updateProp($target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}

function updateProps($target, newProps) {
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(function (name) {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  var $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return _typeof(node1) !== _typeof(node2) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type;
}

function updateElement($parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateProps($parent.childNodes[index], newNode.props, oldNode.props);
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;

    for (var i = 0; i < newLength || i < oldLength; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
} //JWS


var f = h("ul", {
  style: "list-style: none;"
}, h("li", {
  className: "item"
}, "item 1"), h("li", {
  className: "item"
}, h("input", {
  type: "checkbox",
  checked: true
}), h("input", {
  type: "text",
  disabled: false
})));
var g = h("ul", {
  style: "list-style: none;"
}, h("li", {
  className: "item item2"
}, "item 1"), h("li", {
  style: "background: red;"
}, h("input", {
  type: "checkbox",
  checked: false
}), h("input", {
  type: "text",
  disabled: true
})));

window.onload = function (e) {
  var $root = document.getElementById('root');
  var $reload = document.getElementById('reload');
  updateElement($root, f);
  $reload.addEventListener('click', function () {
    updateElement($root, g, f);
  });
};
//# sourceMappingURL=app.js.map