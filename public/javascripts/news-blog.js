let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;

var data =  document.getElementById('data-content').textContent;
let nodes = getNodes(data);

nodes.forEach(node => document.getElementById('blog-content').appendChild(node.cloneNode(true)));