import React, { useState, useEffect, useRef } from 'react';
import CommentForm from './CommentForm';
import scrollToComponent from 'react-scroll-to-component';
import moment from 'moment';

function CommentList({ postId }) {

    const inputEl = useRef(null);

    const [list, setList] = useState([]);

    function loadComments() {
        fetch('/api/comment/listByPostId?id=' + postId)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setList(data);
            })
    }

    useEffect(() => {
        loadComments();        
    }, []);

    function handleSave() {
        loadComments();
        scrollToComponent(inputEl.current, {
            offset: 0,
            align: 'top',
            duration: 1500
        });        
    }

    return (
        <>
            <div class="comments-area" ref={inputEl}>
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
                                        <p class="comment" style={{whiteSpace: 'pre-wrap'}}>
                                            {comment.comment}
                                        </p>
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <h5>
                                                    <a href="#">{comment.name} [{comment.ip}]</a>
                                                </h5>
                                                <p class="date" title={moment(comment.created).format("dddd, MMMM Do YYYY, h:mm:ss a")} >{moment(comment.created).fromNow()} </p>
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

            <CommentForm postId={postId} onSave={handleSave} />

        </>

    );
}

export default CommentList;