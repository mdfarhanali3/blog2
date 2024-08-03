const commentBtnElement = document.getElementById("commentBTN");
const commentSectionElement = document.getElementById("comments");
const commentFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `<article class="comment-item">
  <h2> ${comment.title} </h2>
<p> ${comment.text} </p>
</article>`;

    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function commentPreview() {
  const postId = commentBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  // console.log(responseData);

  if (responseData && responseData.length > 0) {
      const commentList = createCommentList(responseData);
  commentSectionElement.innerHTML = "";
  commentSectionElement.appendChild(commentList);
  }
  else{
    commentSectionElement.firstElementChild.textContent = "No comments. maybe add one?";
  }
  

}

async function saveComment(event){
  
  event.preventDefault();
  const postId = commentFormElement.dataset.postid;
  
  const enteredText = commentTextElement.value;
  const enteredTitle = commentTitleElement.value;
  
  // console.log(enteredTitle, enteredText);
  
  const comment = { title: enteredTitle, text: enteredText};
  
  const response = await fetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: { 'Content-Type': 'application/json' }
  });

  commentPreview()

}

commentBtnElement.addEventListener("click", commentPreview);

commentFormElement.addEventListener("submit", saveComment);
