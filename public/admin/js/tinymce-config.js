// const { default: tinymce } = require("tinymce");

tinymce.init({
  selector: "textarea.textarea-mce",
  file_picker_callback: (callback, value, meta) => {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept",'image/*');

    input.onchange = function() {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var id="blobid"+(new Date()).getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64=reader.result.split(",")[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        callback(blobInfo.blobUri(),{title:file.name});
      };
      reader.readAsDataURL(file);
    };
    input.click();
  },
  file_picker_types: 'file image media',
  plugins: [
    'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
    'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
    'table', 'emoticons', 'help'
  ],
  toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
    'forecolor backcolor emoticons | help',
  menu: {
    favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
  },
  menubar: 'favs file edit view insert format tools table help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',


});
