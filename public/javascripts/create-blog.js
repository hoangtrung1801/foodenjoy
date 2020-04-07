// Content
new FroalaEditor('#edit', {
	// Set the file upload URL.
	imageUploadURL: 'create-blog/image-upload',
	imageUploadParams: {
			id: 'my_editor'
	},
	language: 'vi'
})

var addIngredient = document.getElementsByClassName('add-ingredient')[0];
addIngredient.addEventListener('click', function () {

	var ingredient = document.createElement('li');
	ingredient.className = 'ingredient';

	var input = document.createElement('input');
	input.type = 'text';
	input.className = 'form-control';
	input.name = 'ingredients'

	var remove = document.createElement('h5');
	remove.className = 'removeLi';
	remove.innerText = 'x';
	remove.setAttribute('onclick', 'removeLi(this)');

	ingredient.appendChild(input);
	ingredient.appendChild(remove);

	var ingredients = document.getElementById('ingredients');
	ingredients.appendChild(ingredient);

})

var addStep = document.getElementsByClassName('add-step')[0];
addStep.addEventListener('click', function () {

	var step = document.createElement('li');
	step.className = 'step';

	var input = document.createElement('input');
	input.type = 'text';
	input.className = 'form-control';
	input.name = 'steps'

	var remove = document.createElement('h5');
	remove.className = 'removeLi';
	remove.innerText = 'x';
	remove.setAttribute('onclick', 'removeLi(this)');

	step.appendChild(input);
	step.appendChild(remove);

	var steps = document.getElementById('steps');
	steps.appendChild(step);
})


function removeLi(item) {
	console.log(item);
	item.parentElement.remove();
}

var category = document.getElementById('category');
category.addEventListener('change', function () {
	var createIngredients = document.getElementsByClassName('create-ingredients')[0];
	var createSteps = document.getElementsByClassName('create-step')[0];
	if (category.value === "tip") {
		createIngredients.style.display = 'none';
		createSteps.style.display = 'none';
	} else if (category.value === 'recipe') {
		createIngredients.style.display = 'block';
	}
})

var image = document.getElementById('image');
image.addEventListener('change', function () {
	var value = image.value.split('\\').slice(image.value.split('\\').length - 1).join(); 
	var nameImage = document.getElementById('name-image');
	nameImage.innerText = value;
})

// File upload image title
function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
		$('.image-upload-wrap').addClass('image-dropping');
	});
	$('.image-upload-wrap').bind('dragleave', function () {
		$('.image-upload-wrap').removeClass('image-dropping');
});
