var form = document.getElementById('form');
var title = document.getElementById('title');
var input = document.getElementById('input');
var posts = document.getElementById('posts');
var msg = document.getElementById('msg');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  formValidation();
});

var data = {};

var formValidation = () => {
  if (input.value === "" || title.value === "") {
    msg.innerHTML = "내용을 입력해주세요.";
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

var acceptData = () => {
  data["title"] = title.value;
  data["text"] = input.value;
  
  localStorage.setItem(data.title, JSON.stringify(data));
  window.location.href = "main.html";
};

var DeletePost = (e) => {
  var postContainer = e.parentElement.parentElement;
  var titleText = postContainer.querySelector('h2').innerHTML;
  
  postContainer.remove();
  localStorage.removeItem(titleText);
};

var editPost = (e) => {
  var postContainer = e.parentElement.parentElement;
  var titleText = postContainer.querySelector('h2').innerHTML; // 글의 제목
  var contentText = postContainer.querySelector('p').innerHTML; // 글의 내용
  
  localStorage.setItem("editPostTitle", titleText);
  localStorage.setItem("editPostContent", contentText);
  localStorage.removeItem(titleText); // 수정 전의 데이터를 삭제함
  
  window.location.href = "index.html";
};

var readPost = (e) => {
  var postContainer = e.parentElement.parentElement;
  var titleText = postContainer.querySelector('h2').innerHTML; // 글의 제목
  var contentText = postContainer.querySelector('p').innerHTML; // 글의 내용
  
  // 새 창에서 게시글을 볼 수 있도록
  var postWindow = window.open("", "_blank");
  postWindow.document.write(`
  <h2>${titleText}</h2>
  <p>${contentText}</p>
  `);
};

var createPosts = () => {
  posts.innerHTML = "";
  
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var data = JSON.parse(localStorage.getItem(key));
    posts.innerHTML += `
    <div>
      <h2>${data.title}</h2>
        <p>${data.text}</p>
        <span class="options">
          <i onClick="editPost(this)" class="fas fa-edit"></i>
          <i onClick="DeletePost(this)" class="fas fa-trash-alt"></i>
          <i onClick="readPost(this)" class="fas fa-eye"></i>
        </span>
      </div>
    `;
  }
};

var searchInput = document.getElementById('search-input');

var searchPost = () => {
  var searchTerm = searchInput.value.toLowerCase();
  var allPosts = posts.getElementsByTagName('div');
  
  for (var i = 0; i < allPosts.length; i++) {
    var post = allPosts[i];
    var title = post.querySelector('h2').innerHTML.toLowerCase();
    if (title.includes(searchTerm)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  }
};

window.addEventListener('load', () => {
  createPosts();
});

// index.html에서 수정할 글 내용을 불러옴
var editPostTitle = localStorage.getItem("editPostTitle");
var editPostContent = localStorage.getItem("editPostContent");

if (editPostTitle && editPostContent) {
  title.value = editPostTitle;
  input.value = editPostContent;

  localStorage.removeItem("editPostTitle");
  localStorage.removeItem("editPostContent");
}

searchInput.addEventListener('input', searchPost);
