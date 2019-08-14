import React, { useState, useEffect } from 'react';

function CommentForm({postId, onSave}) {

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    function sendComment(e){
        e.preventDefault();

        const form = {
            postId: postId,
            name: name,
            comment: comment
        }

        fetch('/api/comment/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(function (response) {
            if (response.ok) {
                setName('');
                setComment('');    
                onSave();            
            }
        })
    }

    return (
        <div class="comment-form">
            <h4>Leave a Reply</h4>
            <form class="form-contact comment_form" action="#" id="commentForm">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" value={comment} onChange={(e) => setComment(e.target.value)} cols="30" rows="9" placeholder="Write Comment"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <input class="form-control" value={name} onChange={(e) => setName(e.target.value)}  type="text" placeholder="Name" />
                        </div>
                    </div>

                </div>
                <div class="form-group mt-3">
                    <button type="button" class="btn_3" onClick={sendComment}>Send Message <i class="flaticon-right-arrow"></i> </button>
                </div>
            </form>
        </div>
    );
}

export default CommentForm;