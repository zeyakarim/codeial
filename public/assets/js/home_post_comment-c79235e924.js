{let e=function(e){$(e).submit((function(o){o.preventDefault(),$.ajax({type:"POST",url:"/comments/create",data:$(e).serialize(),success:function(e){console.log(e);let o=t(e.data.comment);$(`#post-comments-${e.data.comment.post}`).prepend(o),n($(" .delete-comment-button",o)),new ToggleLike($(".toggle-like-button",o)),new Noty({theme:"relax",text:"Comment Published",type:"success",layout:"topRight",timeout:"1500"}).show()},error:function(e){console.log(e.responseText)}})}))},t=function(e){return $(`<li id="comment-${e._id}">\n\n                    <div style="display: flex;">\n                        ${e.user.avatar?`<p>\n                                <img src="${e.user.avatar}" alt="${e.user.name}" width="30">\n                            </p>`:'<p>\n                                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="codeial-default-logo" width="30"> \n                            </p>'}\n                        <div class="comment-details">\n                            <h4 style="margin: 0;">\n                            ${e.user.name}\n                            </h4>\n                            <p style="margin: 0;">\n                            ${e.content}\n                            </p>\n                        </div>\n\n                        <div>\n                            <small>\n                                <a class="delete-comment-button" href="/comments/destroy/${e._id}">\n                                    <p>X</p>\n                                </a>\n                            </small>\n\n                        </div>\n                    </div>\n                    <div style="margin-left: 56px; font-size: 14px;"> \n                        <a class="toggle-like-button cmt-clr" data-likes="${e.likes.length}" href="/likes/toggle/?id=${e._id}&type=Comment">\n                            <span>Like</span>\n                        </a>\n                        \n                        <span class="comment-like" id="${e._id}">\n                            ${e.likes.length?`<i class="fa-solid fa-thumbs-up color"></i> ${e.likes.length}`:""}\n                        </span>\n                        \n                    </div>\n                </li>`)},n=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_Id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},o=$(".post_comments");for(let t of o)e(t);let s=$(".delete-comment-button");for(let e of s)n(e)}