let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;

var data =  document.getElementById('data-content').textContent;
let nodes = getNodes(data);

nodes.forEach(node => document.getElementById('content').appendChild(node.cloneNode(true)));

function onlike() {
	$('.btn-like')[0].classList.replace("fa-heart-o", "fa-heart");
	$('.count')[0].innerText = parseInt($('.count')[0].innerText) + 1;
}