import React, { useState, useEffect } from 'react';

function CommentList({ postId }) {

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('/api/comment/listByPostId?id=' + postId)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setList(data);
            })
    }, []);

    return (
        <div class="comments-area">
            <h4>{list.length} Comments</h4>

            {
                list.map(comment => (
                    <div class="comment-list">
                        <div class="single-comment justify-content-between d-flex">
                            <div class="user justify-content-between d-flex">
                                <div class="thumb">
                                    <img src="img/comment/comment_1.png" alt="" />
                                </div>
                                <div class="desc">
                                    <p class="comment">
                                        {comment.comment}
                                    </p>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <h5>
                                                <a href="#">{comment.name} [{comment.ip}]</a>
                                            </h5>
                                            <p class="date">{comment.created} </p>
                                        </div>
                                        <div class="reply-btn">
                                            <a href="#" class="btn-reply text-uppercase">reply</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


        </div>

    );
}

export default CommentList;