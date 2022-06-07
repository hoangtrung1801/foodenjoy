
var itemContent = document.getElementsByClassName('item-content');
var dataContent = document.getElementsByClassName('data-content');
var length = itemContent.length;
let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;

for (var i = 0; i < length; i++){
	var data =  dataContent[i].textContent;
	var nodes = getNodes(data);
	nodes[0].textContent = nodes[0].textContent.slice(0,80) + ' ...';
	itemContent[i].appendChild(nodes[0]);

	// nodes.forEach(node => itemContent[i].appendChild(node.cloneNode(true)));
}